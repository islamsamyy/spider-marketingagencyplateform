import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aijgzvgnmjjvkxqrgfhm.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpamd6dmdubWpqdmt4cXJnZmhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5NDE3MzU5NCwiZXhwIjoyMTA5NzQ5NTk0fQ.AYl5gpF8X53rFFwFd6f_fAYr9eusm5Ew2r6OzhVQ4yQ';

// Admin client with full system privileges
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// GET /api/admin/users - List team members and their roles
export async function GET() {
  try {
    const { data: profiles, error: profileErr } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: true });

    if (profileErr) {
      return NextResponse.json({ error: profileErr.message }, { status: 400 });
    }

    return NextResponse.json({ users: profiles });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/users - Create new team user with specified role
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, full_name, role } = body;

    if (!email || !password || !full_name || !role) {
      return NextResponse.json({ error: 'جميع الحقول مطلوبة' }, { status: 400 });
    }

    // 1. Create user in auth.users
    const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name, role },
      app_metadata: { role },
    });

    if (authErr) {
      return NextResponse.json({ error: authErr.message }, { status: 400 });
    }

    // 2. Insert into user_profiles
    const { data: profile, error: profileErr } = await supabaseAdmin
      .from('user_profiles')
      .upsert({
        id: authData.user.id,
        email,
        full_name,
        role,
        is_active: true,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (profileErr) {
      return NextResponse.json({ error: profileErr.message }, { status: 400 });
    }

    return NextResponse.json({ user: profile, message: 'تم إنشاء المستخدم بنجاح' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/admin/users - Update team member role or active status
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, role, is_active, full_name } = body;

    if (!id) {
      return NextResponse.json({ error: 'معرف المستخدم مطلوب' }, { status: 400 });
    }

    const updates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (role !== undefined) updates.role = role;
    if (is_active !== undefined) updates.is_active = is_active;
    if (full_name !== undefined) updates.full_name = full_name;

    // Update in user_profiles
    const { data: profile, error: profileErr } = await supabaseAdmin
      .from('user_profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (profileErr) {
      return NextResponse.json({ error: profileErr.message }, { status: 400 });
    }

    // Sync role to auth.users app_metadata if updated
    if (role !== undefined) {
      await supabaseAdmin.auth.admin.updateUserById(id, {
        app_metadata: { role },
      });
    }

    return NextResponse.json({ user: profile, message: 'تم تحديث البيانات بنجاح' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/users - Delete a team member
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'معرف المستخدم مطلوب' }, { status: 400 });
    }

    // Delete in auth.users (cascades to user_profiles via foreign key)
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'تم حذف العضو بنجاح' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
