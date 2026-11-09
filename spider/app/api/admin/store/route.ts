import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aijgzvgnmjjvkxqrgfhm.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpamd6dmdubWpqdmt4cXJnZmhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5NDE3MzU5NCwiZXhwIjoyMTA5NzQ5NTk0fQ.AYl5gpF8X53rFFwFd6f_fAYr9eusm5Ew2r6OzhVQ4yQ';

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { table, action, id, data } = body;

    if (!table) {
      return NextResponse.json({ error: 'table is required' }, { status: 400 });
    }

    // Supported tables for admin mutations
    const allowedTables = ['packages', 'projects', 'blog_posts', 'reviews', 'system_settings', 'invoices', 'leads'];
    if (!allowedTables.includes(table)) {
      return NextResponse.json({ error: 'unsupported table' }, { status: 400 });
    }

    if (action === 'delete') {
      if (!id) return NextResponse.json({ error: 'id required for delete' }, { status: 400 });
      if (!UUID_REGEX.test(id)) {
        // If not UUID, it was only a local record
        return NextResponse.json({ success: true, message: 'Local record deleted' });
      }
      const { error } = await supabaseAdmin.from(table).delete().eq('id', id);
      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    if (action === 'save' || action === 'update' || action === 'create') {
      if (!data) return NextResponse.json({ error: 'data is required' }, { status: 400 });

      // Clean relations if any
      const { package: _pkg, lead: _ld, assigned_user: _usr, project: _prj, ...cleanData } = data;

      if (table === 'system_settings') {
        const { error } = await supabaseAdmin
          .from('system_settings')
          .upsert({ id: 1, ...cleanData, updated_at: new Date().toISOString() });
        if (error) throw error;
        return NextResponse.json({ success: true });
      }

      // Check if id is valid UUID for updating
      const targetId = id || cleanData.id;
      if (targetId && UUID_REGEX.test(targetId)) {
        // Update existing row
        const { data: updated, error } = await supabaseAdmin
          .from(table)
          .update({ ...cleanData, updated_at: new Date().toISOString() })
          .eq('id', targetId)
          .select()
          .maybeSingle();

        if (error) throw error;
        return NextResponse.json({ success: true, data: updated });
      } else {
        // Insert new row (remove mock id if not valid UUID)
        const insertPayload = { ...cleanData };
        if (insertPayload.id && !UUID_REGEX.test(insertPayload.id)) {
          delete insertPayload.id;
        }
        insertPayload.created_at = new Date().toISOString();
        insertPayload.updated_at = new Date().toISOString();

        const { data: created, error } = await supabaseAdmin
          .from(table)
          .insert([insertPayload])
          .select()
          .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data: created });
      }
    }

    return NextResponse.json({ error: 'invalid action' }, { status: 400 });
  } catch (err: any) {
    console.error('Server admin store mutation error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
