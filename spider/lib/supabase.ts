import { createClient } from '@supabase/supabase-js';
import {
  Lead,
  PackageTier,
  ProjectCaseStudy,
  BlogPost,
  Review,
  Invoice,
  UserProfile,
  LeadActivity,
  AdminRole
} from '../types/database';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aijgzvgnmjjvkxqrgfhm.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpamd6dmdubWpqdmt4cXJnZmhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQxNzM1OTQsImV4cCI6MjEwOTc0OTU5NH0.o_9sF00FQEQezEZdVt4TzhnDiDRAMq0hTbklrY3O86s';

// Singleton browser client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
});

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

// ================= AUTH & USER PROFILES =================

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  try {
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) return null;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !data) {
      // Fallback: construct from auth metadata if profile query fails
      return {
        id: user.id,
        email: user.email || '',
        full_name: (user.user_metadata?.full_name as string) || user.email || 'Admin User',
        role: (user.user_metadata?.role as AdminRole) || 'super_admin',
        is_active: true
      };
    }

    return data as UserProfile;
  } catch (err) {
    console.error('Error getting current user profile:', err);
    return null;
  }
}

export async function fetchTeamProfiles(): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching team profiles:', error);
    return [];
  }
  return data as UserProfile[];
}

// ================= PACKAGES (Live Supabase API) =================

export async function getPackages(): Promise<PackageTier[]> {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Supabase getPackages error:', error);
    return [];
  }
  return data as PackageTier[];
}

export async function createPackage(pkg: Omit<PackageTier, 'id' | 'created_at' | 'updated_at'>): Promise<PackageTier | null> {
  const { data, error } = await supabase
    .from('packages')
    .insert([pkg])
    .select()
    .single();

  if (error) {
    console.error('Supabase createPackage error:', error);
    throw error;
  }
  return data as PackageTier;
}

export async function updatePackage(id: string, updates: Partial<PackageTier>): Promise<PackageTier | null> {
  if (!id || !UUID_REGEX.test(id)) return null;
  const { data, error } = await supabase
    .from('packages')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Supabase updatePackage error:', error);
    throw error;
  }
  return data as PackageTier;
}

export async function deletePackage(id: string): Promise<boolean> {
  if (!id || !UUID_REGEX.test(id)) return true;
  const { error } = await supabase
    .from('packages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase deletePackage error:', error);
    throw error;
  }
  return true;
}

// ================= LEADS & ACTIVITIES (Live Supabase API with Relations) =================

export async function getLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select(`
      *,
      package:packages(*),
      assigned_user:user_profiles(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase getLeads error:', error);
    return [];
  }
  return data as Lead[];
}

export async function createLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'package' | 'assigned_user'>): Promise<Lead | null> {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select(`
      *,
      package:packages(*),
      assigned_user:user_profiles(*)
    `)
    .single();

  if (error) {
    console.error('Supabase createLead error:', error);
    throw error;
  }
  return data as Lead;
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  if (!id || !UUID_REGEX.test(id)) return null;
  // Strip joined relations before sending update to Supabase
  const { package: _pkg, assigned_user: _usr, ...cleanUpdates } = updates;

  const { data, error } = await supabase
    .from('leads')
    .update({ ...cleanUpdates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select(`
      *,
      package:packages(*),
      assigned_user:user_profiles(*)
    `)
    .maybeSingle();

  if (error) {
    console.error('Supabase updateLead error:', error);
    throw error;
  }
  return data as Lead;
}

export async function deleteLead(id: string): Promise<boolean> {
  if (!id || !UUID_REGEX.test(id)) return true;
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase deleteLead error:', error);
    throw error;
  }
  return true;
}

export async function getLeadActivities(leadId: string): Promise<LeadActivity[]> {
  const { data, error } = await supabase
    .from('lead_activities')
    .select(`*, user_profile:user_profiles(*)`)
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase getLeadActivities error:', error);
    return [];
  }
  return data as LeadActivity[];
}

export async function addLeadActivity(leadId: string, activityType: string, description: string): Promise<LeadActivity | null> {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('lead_activities')
    .insert([{
      lead_id: leadId,
      user_id: user?.id || null,
      activity_type: activityType,
      description: description
    }])
    .select(`*, user_profile:user_profiles(*)`)
    .single();

  if (error) {
    console.error('Supabase addLeadActivity error:', error);
    throw error;
  }
  return data as LeadActivity;
}

// ================= INVOICES (Live Supabase API with Relations) =================

export async function getInvoices(): Promise<Invoice[]> {
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      lead:leads(*),
      package:packages(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase getInvoices error:', error);
    return [];
  }
  return data as Invoice[];
}

export async function createInvoice(inv: Omit<Invoice, 'id' | 'created_at' | 'updated_at' | 'lead' | 'package'>): Promise<Invoice | null> {
  const { data, error } = await supabase
    .from('invoices')
    .insert([inv])
    .select(`
      *,
      lead:leads(*),
      package:packages(*)
    `)
    .single();

  if (error) {
    console.error('Supabase createInvoice error:', error);
    throw error;
  }
  return data as Invoice;
}

export async function updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice | null> {
  if (!id || !UUID_REGEX.test(id)) return null;
  const { lead: _l, package: _p, ...cleanUpdates } = updates;

  const { data, error } = await supabase
    .from('invoices')
    .update({ ...cleanUpdates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select(`
      *,
      lead:leads(*),
      package:packages(*)
    `)
    .maybeSingle();

  if (error) {
    console.error('Supabase updateInvoice error:', error);
    throw error;
  }
  return data as Invoice;
}

export async function deleteInvoice(id: string): Promise<boolean> {
  if (!id || !UUID_REGEX.test(id)) return true;
  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase deleteInvoice error:', error);
    throw error;
  }
  return true;
}

// ================= PROJECTS / CASE STUDIES (Live Supabase API with Relations) =================

export async function getProjects(): Promise<ProjectCaseStudy[]> {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      lead:leads(*),
      package:packages(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase getProjects error:', error);
    return [];
  }
  return data as ProjectCaseStudy[];
}

export async function createProject(proj: Omit<ProjectCaseStudy, 'id' | 'created_at' | 'updated_at' | 'lead' | 'package'>): Promise<ProjectCaseStudy | null> {
  const { data, error } = await supabase
    .from('projects')
    .insert([proj])
    .select(`
      *,
      lead:leads(*),
      package:packages(*)
    `)
    .single();

  if (error) {
    console.error('Supabase createProject error:', error);
    throw error;
  }
  return data as ProjectCaseStudy;
}

export async function updateProject(id: string, updates: Partial<ProjectCaseStudy>): Promise<ProjectCaseStudy | null> {
  if (!id || !UUID_REGEX.test(id)) return null;
  const { lead: _l, package: _p, ...cleanUpdates } = updates;

  const { data, error } = await supabase
    .from('projects')
    .update({ ...cleanUpdates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select(`
      *,
      lead:leads(*),
      package:packages(*)
    `)
    .maybeSingle();

  if (error) {
    console.error('Supabase updateProject error:', error);
    throw error;
  }
  return data as ProjectCaseStudy;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (!id || !UUID_REGEX.test(id)) return true;
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase deleteProject error:', error);
    throw error;
  }
  return true;
}

// ================= BLOG POSTS (Live Supabase API) =================

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase getBlogPosts error:', error);
    return [];
  }
  return data as BlogPost[];
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error('Supabase createBlogPost error:', error);
    throw error;
  }
  return data as BlogPost;
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  if (!id || !UUID_REGEX.test(id)) return null;
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Supabase updateBlogPost error:', error);
    throw error;
  }
  return data as BlogPost;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  if (!id || !UUID_REGEX.test(id)) return true;
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase deleteBlogPost error:', error);
    throw error;
  }
  return true;
}

// ================= REVIEWS (Live Supabase API with Relations) =================

export async function getReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      project:projects(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase getReviews error:', error);
    return [];
  }
  return data as Review[];
}

export async function createReview(review: Omit<Review, 'id' | 'created_at' | 'updated_at' | 'project'>): Promise<Review | null> {
  const { data, error } = await supabase
    .from('reviews')
    .insert([review])
    .select(`
      *,
      project:projects(*)
    `)
    .single();

  if (error) {
    console.error('Supabase createReview error:', error);
    throw error;
  }
  return data as Review;
}

export async function updateReview(id: string, updates: Partial<Review>): Promise<Review | null> {
  if (!id || !UUID_REGEX.test(id)) return null;
  const { project: _pr, ...cleanUpdates } = updates;

  const { data, error } = await supabase
    .from('reviews')
    .update({ ...cleanUpdates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select(`
      *,
      project:projects(*)
    `)
    .maybeSingle();

  if (error) {
    console.error('Supabase updateReview error:', error);
    throw error;
  }
  return data as Review;
}

export async function deleteReview(id: string): Promise<boolean> {
  if (!id || !UUID_REGEX.test(id)) return true;
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase deleteReview error:', error);
    throw error;
  }
  return true;
}

// ================= SYSTEM SETTINGS =================

export async function getSystemSettings() {
  const { data, error } = await supabase
    .from('system_settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Supabase getSystemSettings error:', error);
    return null;
  }
  return data;
}

export async function updateSystemSettings(settings: Record<string, any>) {
  const { data, error } = await supabase
    .from('system_settings')
    .update({ ...settings, updated_at: new Date().toISOString() })
    .eq('id', 1)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Supabase updateSystemSettings error:', error);
    throw error;
  }
  return data;
}
