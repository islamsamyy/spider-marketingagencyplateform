'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PackageTier,
  Invoice,
  Lead,
  ProjectCaseStudy,
  BlogPost,
  Review,
  UserProfile,
  AdminRole,
  INITIAL_PACKAGES,
  INITIAL_INVOICES,
  INITIAL_LEADS,
  INITIAL_PROJECTS,
  INITIAL_BLOG_POSTS,
  INITIAL_REVIEWS,
} from '../types/database';
import {
  supabase,
  getPackages,
  createPackage,
  updatePackage as apiUpdatePackage,
  deletePackage as apiDeletePackage,
  getLeads,
  createLead,
  updateLead as apiUpdateLead,
  deleteLead as apiDeleteLead,
  getInvoices,
  createInvoice,
  updateInvoice as apiUpdateInvoice,
  deleteInvoice as apiDeleteInvoice,
  getProjects,
  createProject,
  updateProject as apiUpdateProject,
  deleteProject as apiDeleteProject,
  getBlogPosts,
  createBlogPost,
  updateBlogPost as apiUpdateBlogPost,
  deleteBlogPost as apiDeleteBlogPost,
  getReviews,
  createReview,
  updateReview as apiUpdateReview,
  deleteReview as apiDeleteReview,
  getSystemSettings,
  updateSystemSettings,
  getCurrentUserProfile,
  isSupabaseConfigured
} from './supabase';

export interface SystemSettings {
  agencyName: string;
  agencyPhone: string;
  agencyWhatsApp: string;
  agencyEmail: string;
  currency: string;
  stitchApiKey: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  metaPixelId: string;
  metaCapiToken: string;
  tikTokPixelId: string;
  tikTokAccessToken: string;
}

const DEFAULT_SETTINGS: SystemSettings = {
  agencyName: 'بلاك سبايدر | Black Spider Agency',
  agencyPhone: '+966 50 123 4567',
  agencyWhatsApp: '966501234567',
  agencyEmail: 'contact@blackspider.agency',
  currency: 'USD',
  stitchApiKey: 'st_live_994827103847',
  supabaseUrl: 'https://aijgzvgnmjjvkxqrgfhm.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpamd6dmdubWpqdmt4cXJnZmhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQxNzM1OTQsImV4cCI6MjEwOTc0OTU5NH0.o_9sF00FQEQezEZdVt4TzhnDiDRAMq0hTbklrY3O86s',
  metaPixelId: '8839201948201',
  metaCapiToken: 'EAAGm0PX4ZBqwBO...',
  tikTokPixelId: 'TT-9928103-SPIDER',
  tikTokAccessToken: 'tt_access_token_active',
};

// Storage keys for multi-tab and reload resilience
const STORAGE_KEYS = {
  PACKAGES: 'black_spider_packages',
  INVOICES: 'black_spider_invoices',
  LEADS: 'black_spider_leads',
  PROJECTS: 'black_spider_projects',
  BLOG_POSTS: 'black_spider_blog',
  REVIEWS: 'black_spider_reviews',
  SETTINGS: 'black_spider_settings',
};

function getStoredItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStoredItem<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage write failed:', e);
  }
}

// Server-side mutation helper with service-role permissions
async function syncServerStore(table: string, action: string, data?: any, id?: string) {
  try {
    if (typeof window !== 'undefined' && window.location && window.location.origin) {
      await fetch('/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, action, id, data }),
      });
    }
  } catch (err) {
    // Non-blocking in offline / test environments
  }
}

interface DataStoreContextType {
  // Auth & RBAC State
  userProfile: UserProfile | null;
  userRole: AdminRole | null;
  isAdmin: boolean;
  isLoading: boolean;
  isLiveSupabase: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  hasRole: (allowedRoles: AdminRole[]) => boolean;
  refreshData: () => Promise<void>;

  // Packages CRUD
  packages: PackageTier[];
  addPackage: (pkg: Omit<PackageTier, 'id'>) => Promise<void>;
  updatePackage: (id: string, pkg: Partial<PackageTier>) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
  togglePackagePopular: (id: string) => Promise<void>;

  // Invoices CRUD
  invoices: Invoice[];
  addInvoice: (inv: Omit<Invoice, 'id' | 'created_at'>) => Promise<void>;
  updateInvoice: (id: string, inv: Partial<Invoice>) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  markInvoicePaid: (id: string) => Promise<void>;

  // Leads CRUD
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'created_at'>) => Promise<void>;
  updateLead: (id: string, lead: Partial<Lead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  moveLeadStage: (id: string, stage: Lead['stage']) => Promise<void>;

  // Projects CRUD
  projects: ProjectCaseStudy[];
  addProject: (proj: Omit<ProjectCaseStudy, 'id' | 'created_at'>) => Promise<void>;
  updateProject: (id: string, proj: Partial<ProjectCaseStudy>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // Blog Posts CRUD
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id' | 'created_at'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  togglePostPublish: (id: string) => Promise<void>;

  // Reviews CRUD
  reviews: Review[];
  addReview: (rev: Omit<Review, 'id' | 'created_at'>) => Promise<void>;
  updateReview: (id: string, rev: Partial<Review>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  setReviewStatus: (id: string, status: Review['status']) => Promise<void>;

  // Settings CRUD
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const DataStoreContext = createContext<DataStoreContextType | null>(null);

export function DataStoreProvider({ children }: { children: React.ReactNode }) {
  const [packages, setPackages] = useState<PackageTier[]>(() =>
    getStoredItem(STORAGE_KEYS.PACKAGES, INITIAL_PACKAGES)
  );
  const [invoices, setInvoices] = useState<Invoice[]>(() =>
    getStoredItem(STORAGE_KEYS.INVOICES, INITIAL_INVOICES)
  );
  const [leads, setLeads] = useState<Lead[]>(() =>
    getStoredItem(STORAGE_KEYS.LEADS, INITIAL_LEADS)
  );
  const [projects, setProjects] = useState<ProjectCaseStudy[]>(() =>
    getStoredItem(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS)
  );
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() =>
    getStoredItem(STORAGE_KEYS.BLOG_POSTS, INITIAL_BLOG_POSTS)
  );
  const [reviews, setReviews] = useState<Review[]>(() =>
    getStoredItem(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS)
  );
  const [settings, setSettings] = useState<SystemSettings>(() =>
    getStoredItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  );

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveSupabase, setIsLiveSupabase] = useState(false);

  // Broadcast helper
  const broadcastSync = useCallback((type: string, payload: any) => {
    if (typeof window !== 'undefined' && typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel('black_spider_sync');
        channel.postMessage({ type, payload });
        channel.close();
      } catch (e) {}
    }
  }, []);

  // Load live data from Supabase
  const loadAllData = useCallback(async () => {
    try {
      if (!isSupabaseConfigured()) {
        setIsLoading(false);
        return;
      }

      // Check current user profile
      const profile = await getCurrentUserProfile();
      setUserProfile(profile);

      // Concurrent fetch of all live database tables
      const [pkgs, lds, invs, projs, posts, revs, sttngs] = await Promise.all([
        getPackages(),
        getLeads(),
        getInvoices(),
        getProjects(),
        getBlogPosts(),
        getReviews(),
        getSystemSettings(),
      ]);

      // If live Supabase tables return data, merge gracefully
      if (pkgs && pkgs.length > 0) {
        setPackages(prev => {
          const stored = getStoredItem<PackageTier[] | null>(STORAGE_KEYS.PACKAGES, null);
          if (stored && stored.length > 0) return stored;
          setStoredItem(STORAGE_KEYS.PACKAGES, pkgs);
          return pkgs;
        });
      }
      if (projs && projs.length > 0) {
        setProjects(prev => {
          const stored = getStoredItem<ProjectCaseStudy[] | null>(STORAGE_KEYS.PROJECTS, null);
          if (stored && stored.length > 0) return stored;
          setStoredItem(STORAGE_KEYS.PROJECTS, projs);
          return projs;
        });
      }
      if (posts && posts.length > 0) {
        setBlogPosts(prev => {
          const stored = getStoredItem<BlogPost[] | null>(STORAGE_KEYS.BLOG_POSTS, null);
          if (stored && stored.length > 0) return stored;
          setStoredItem(STORAGE_KEYS.BLOG_POSTS, posts);
          return posts;
        });
      }
      if (revs && revs.length > 0) {
        setReviews(prev => {
          const stored = getStoredItem<Review[] | null>(STORAGE_KEYS.REVIEWS, null);
          if (stored && stored.length > 0) return stored;
          setStoredItem(STORAGE_KEYS.REVIEWS, revs);
          return revs;
        });
      }
      if (invs && invs.length > 0) {
        setInvoices(prev => {
          const stored = getStoredItem<Invoice[] | null>(STORAGE_KEYS.INVOICES, null);
          if (stored && stored.length > 0) return stored;
          setStoredItem(STORAGE_KEYS.INVOICES, invs);
          return invs;
        });
      }
      if (lds && lds.length > 0) {
        setLeads(prev => {
          const stored = getStoredItem<Lead[] | null>(STORAGE_KEYS.LEADS, null);
          if (stored && stored.length > 0) return stored;
          setStoredItem(STORAGE_KEYS.LEADS, lds);
          return lds;
        });
      }
      if (sttngs) {
        setSettings(prev => {
          const stored = getStoredItem<SystemSettings | null>(STORAGE_KEYS.SETTINGS, null);
          if (stored) return stored;
          const merged: SystemSettings = {
            agencyName: sttngs.agency_name || DEFAULT_SETTINGS.agencyName,
            agencyPhone: sttngs.agency_phone || DEFAULT_SETTINGS.agencyPhone,
            agencyWhatsApp: sttngs.agency_whatsapp || DEFAULT_SETTINGS.agencyWhatsApp,
            agencyEmail: sttngs.agency_email || DEFAULT_SETTINGS.agencyEmail,
            currency: sttngs.currency || DEFAULT_SETTINGS.currency,
            stitchApiKey: sttngs.stitch_api_key || DEFAULT_SETTINGS.stitchApiKey,
            metaPixelId: sttngs.meta_pixel_id || DEFAULT_SETTINGS.metaPixelId,
            metaCapiToken: sttngs.meta_capi_token || DEFAULT_SETTINGS.metaCapiToken,
            tikTokPixelId: sttngs.tiktok_pixel_id || DEFAULT_SETTINGS.tikTokPixelId,
            tikTokAccessToken: sttngs.tiktok_access_token || DEFAULT_SETTINGS.tikTokAccessToken,
          };
          setStoredItem(STORAGE_KEYS.SETTINGS, merged);
          return merged;
        });
      }

      setIsLiveSupabase(true);
    } catch (err) {
      console.error('Error fetching live data from Supabase:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize on mount and subscribe to realtime changes & cross-tab sync
  useEffect(() => {
    loadAllData();

    // Cross-tab broadcast listener
    let crossTabChannel: BroadcastChannel | null = null;
    if (typeof window !== 'undefined' && typeof BroadcastChannel !== 'undefined') {
      try {
        crossTabChannel = new BroadcastChannel('black_spider_sync');
        crossTabChannel.onmessage = (event) => {
          const { type, payload } = event.data || {};
          if (type === 'SYNC_PACKAGES') setPackages(payload);
          if (type === 'SYNC_INVOICES') setInvoices(payload);
          if (type === 'SYNC_LEADS') setLeads(payload);
          if (type === 'SYNC_PROJECTS') setProjects(payload);
          if (type === 'SYNC_BLOG') setBlogPosts(payload);
          if (type === 'SYNC_REVIEWS') setReviews(payload);
          if (type === 'SYNC_SETTINGS') setSettings(payload);
        };
      } catch (e) {}
    }

    // Storage event listener fallback
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.newValue) return;
      try {
        const parsed = JSON.parse(e.newValue);
        if (e.key === STORAGE_KEYS.PACKAGES) setPackages(parsed);
        if (e.key === STORAGE_KEYS.INVOICES) setInvoices(parsed);
        if (e.key === STORAGE_KEYS.LEADS) setLeads(parsed);
        if (e.key === STORAGE_KEYS.PROJECTS) setProjects(parsed);
        if (e.key === STORAGE_KEYS.BLOG_POSTS) setBlogPosts(parsed);
        if (e.key === STORAGE_KEYS.REVIEWS) setReviews(parsed);
        if (e.key === STORAGE_KEYS.SETTINGS) setSettings(parsed);
      } catch (err) {}
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
    }

    // Listen to Supabase auth state changes
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await getCurrentUserProfile();
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    });

    // Real-time synchronization channel via unique Supabase channel per instance
    const channelName = `sync_${Math.random().toString(36).substring(2, 9)}`;
    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'packages' }, () => {
        getPackages().then(data => {
          if (data.length) {
            setPackages(data);
            setStoredItem(STORAGE_KEYS.PACKAGES, data);
          }
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        getLeads().then(data => {
          if (data.length) {
            setLeads(data);
            setStoredItem(STORAGE_KEYS.LEADS, data);
          }
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'invoices' }, () => {
        getInvoices().then(data => {
          if (data.length) {
            setInvoices(data);
            setStoredItem(STORAGE_KEYS.INVOICES, data);
          }
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        getProjects().then(data => {
          if (data.length) {
            setProjects(data);
            setStoredItem(STORAGE_KEYS.PROJECTS, data);
          }
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, () => {
        getBlogPosts().then(data => {
          if (data.length) {
            setBlogPosts(data);
            setStoredItem(STORAGE_KEYS.BLOG_POSTS, data);
          }
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, () => {
        getReviews().then(data => {
          if (data.length) {
            setReviews(data);
            setStoredItem(STORAGE_KEYS.REVIEWS, data);
          }
        });
      })
      .subscribe();

    return () => {
      authSub.unsubscribe();
      supabase.removeChannel(channel);
      if (crossTabChannel) crossTabChannel.close();
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange);
      }
    };
  }, [loadAllData]);

  // Auth Methods
  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      const profile = await getCurrentUserProfile();
      setUserProfile(profile);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
  };

  const hasRole = (allowedRoles: AdminRole[]): boolean => {
    if (!userProfile) return false;
    if (userProfile.role === 'super_admin') return true;
    return allowedRoles.includes(userProfile.role);
  };

  // ================= PACKAGES CRUD =================
  const addPackageHandler = async (pkg: Omit<PackageTier, 'id'>) => {
    const newId = `pkg-${Date.now()}`;
    const newPackage: PackageTier = {
      ...pkg,
      id: newId,
      sort_order: packages.length + 1,
      created_by: userProfile?.id,
    };
    const nextPackages = [...packages, newPackage];
    setPackages(nextPackages);
    setStoredItem(STORAGE_KEYS.PACKAGES, nextPackages);
    broadcastSync('SYNC_PACKAGES', nextPackages);

    syncServerStore('packages', 'create', newPackage);
    createPackage({
      ...pkg,
      sort_order: packages.length + 1,
      created_by: userProfile?.id,
    }).then(created => {
      if (created && created.id) {
        setPackages(prev => {
          const updated = prev.map(p => p.id === newId ? created : p);
          setStoredItem(STORAGE_KEYS.PACKAGES, updated);
          return updated;
        });
      }
    }).catch(() => {});
  };

  const updatePackageHandler = async (id: string, updatedFields: Partial<PackageTier>) => {
    const nextPackages = packages.map(p => (p.id === id ? { ...p, ...updatedFields } : p));
    setPackages(nextPackages);
    setStoredItem(STORAGE_KEYS.PACKAGES, nextPackages);
    broadcastSync('SYNC_PACKAGES', nextPackages);

    syncServerStore('packages', 'update', updatedFields, id);
    apiUpdatePackage(id, updatedFields).catch(() => {});
  };

  const deletePackageHandler = async (id: string) => {
    const nextPackages = packages.filter(p => p.id !== id);
    setPackages(nextPackages);
    setStoredItem(STORAGE_KEYS.PACKAGES, nextPackages);
    broadcastSync('SYNC_PACKAGES', nextPackages);

    syncServerStore('packages', 'delete', null, id);
    apiDeletePackage(id).catch(() => {});
  };

  const togglePackagePopularHandler = async (id: string) => {
    const target = packages.find(p => p.id === id);
    if (!target) return;
    const newPopular = !target.popular;
    await updatePackageHandler(id, { popular: newPopular });
  };

  // ================= INVOICES CRUD =================
  const addInvoiceHandler = async (inv: Omit<Invoice, 'id' | 'created_at'>) => {
    const newInvoice: Invoice = {
      ...inv,
      id: `inv-${Date.now()}`,
      created_at: new Date().toISOString().split('T')[0],
      created_by: userProfile?.id,
    };
    const nextInvoices = [newInvoice, ...invoices];
    setInvoices(nextInvoices);
    setStoredItem(STORAGE_KEYS.INVOICES, nextInvoices);
    broadcastSync('SYNC_INVOICES', nextInvoices);

    syncServerStore('invoices', 'create', newInvoice);
    createInvoice({
      ...inv,
      created_by: userProfile?.id,
    }).then(created => {
      if (created && created.id) {
        setInvoices(prev => {
          const updated = prev.map(i => i.id === newInvoice.id ? created : i);
          setStoredItem(STORAGE_KEYS.INVOICES, updated);
          return updated;
        });
      }
    }).catch(() => {});
  };

  const updateInvoiceHandler = async (id: string, updatedFields: Partial<Invoice>) => {
    const nextInvoices = invoices.map(i => (i.id === id ? { ...i, ...updatedFields } : i));
    setInvoices(nextInvoices);
    setStoredItem(STORAGE_KEYS.INVOICES, nextInvoices);
    broadcastSync('SYNC_INVOICES', nextInvoices);

    syncServerStore('invoices', 'update', updatedFields, id);
    apiUpdateInvoice(id, updatedFields).catch(() => {});
  };

  const deleteInvoiceHandler = async (id: string) => {
    const nextInvoices = invoices.filter(i => i.id !== id);
    setInvoices(nextInvoices);
    setStoredItem(STORAGE_KEYS.INVOICES, nextInvoices);
    broadcastSync('SYNC_INVOICES', nextInvoices);

    syncServerStore('invoices', 'delete', null, id);
    apiDeleteInvoice(id).catch(() => {});
  };

  const markInvoicePaidHandler = async (id: string) => {
    await updateInvoiceHandler(id, { status: 'paid' });
  };

  // ================= LEADS CRUD =================
  const addLeadHandler = async (lead: Omit<Lead, 'id' | 'created_at'>) => {
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      created_at: new Date().toISOString(),
      assigned_to: lead.assigned_to || userProfile?.id || null,
    };
    const nextLeads = [newLead, ...leads];
    setLeads(nextLeads);
    setStoredItem(STORAGE_KEYS.LEADS, nextLeads);
    broadcastSync('SYNC_LEADS', nextLeads);

    syncServerStore('leads', 'create', newLead);
    createLead({
      ...lead,
      assigned_to: lead.assigned_to || userProfile?.id || null,
    }).then(created => {
      if (created && created.id) {
        setLeads(prev => {
          const updated = prev.map(l => l.id === newLead.id ? created : l);
          setStoredItem(STORAGE_KEYS.LEADS, updated);
          return updated;
        });
      }
    }).catch(() => {});
  };

  const updateLeadHandler = async (id: string, updatedFields: Partial<Lead>) => {
    const nextLeads = leads.map(l => (l.id === id ? { ...l, ...updatedFields } : l));
    setLeads(nextLeads);
    setStoredItem(STORAGE_KEYS.LEADS, nextLeads);
    broadcastSync('SYNC_LEADS', nextLeads);

    syncServerStore('leads', 'update', updatedFields, id);
    apiUpdateLead(id, updatedFields).catch(() => {});
  };

  const deleteLeadHandler = async (id: string) => {
    const nextLeads = leads.filter(l => l.id !== id);
    setLeads(nextLeads);
    setStoredItem(STORAGE_KEYS.LEADS, nextLeads);
    broadcastSync('SYNC_LEADS', nextLeads);

    syncServerStore('leads', 'delete', null, id);
    apiDeleteLead(id).catch(() => {});
  };

  const moveLeadStageHandler = async (id: string, stage: Lead['stage']) => {
    await updateLeadHandler(id, { stage });
  };

  // ================= PROJECTS CRUD =================
  const addProjectHandler = async (proj: Omit<ProjectCaseStudy, 'id' | 'created_at'>) => {
    const newProject: ProjectCaseStudy = {
      ...proj,
      id: `proj-${Date.now()}`,
      created_at: new Date().toISOString().split('T')[0],
      author_id: userProfile?.id,
    };
    const nextProjects = [newProject, ...projects];
    setProjects(nextProjects);
    setStoredItem(STORAGE_KEYS.PROJECTS, nextProjects);
    broadcastSync('SYNC_PROJECTS', nextProjects);

    syncServerStore('projects', 'create', newProject);
    createProject({
      ...proj,
      author_id: userProfile?.id,
    }).then(created => {
      if (created && created.id) {
        setProjects(prev => {
          const updated = prev.map(p => p.id === newProject.id ? created : p);
          setStoredItem(STORAGE_KEYS.PROJECTS, updated);
          return updated;
        });
      }
    }).catch(() => {});
  };

  const updateProjectHandler = async (id: string, updatedFields: Partial<ProjectCaseStudy>) => {
    const nextProjects = projects.map(p => (p.id === id ? { ...p, ...updatedFields } : p));
    setProjects(nextProjects);
    setStoredItem(STORAGE_KEYS.PROJECTS, nextProjects);
    broadcastSync('SYNC_PROJECTS', nextProjects);

    syncServerStore('projects', 'update', updatedFields, id);
    apiUpdateProject(id, updatedFields).catch(() => {});
  };

  const deleteProjectHandler = async (id: string) => {
    const nextProjects = projects.filter(p => p.id !== id);
    setProjects(nextProjects);
    setStoredItem(STORAGE_KEYS.PROJECTS, nextProjects);
    broadcastSync('SYNC_PROJECTS', nextProjects);

    syncServerStore('projects', 'delete', null, id);
    apiDeleteProject(id).catch(() => {});
  };

  // ================= BLOG POSTS CRUD =================
  const addBlogPostHandler = async (post: Omit<BlogPost, 'id' | 'created_at'>) => {
    const newPost: BlogPost = {
      ...post,
      id: `post-${Date.now()}`,
      created_at: new Date().toISOString().split('T')[0],
      author_id: userProfile?.id,
    };
    const nextPosts = [newPost, ...blogPosts];
    setBlogPosts(nextPosts);
    setStoredItem(STORAGE_KEYS.BLOG_POSTS, nextPosts);
    broadcastSync('SYNC_BLOG', nextPosts);

    syncServerStore('blog_posts', 'create', newPost);
    createBlogPost({
      ...post,
      author_id: userProfile?.id,
    }).then(created => {
      if (created && created.id) {
        setBlogPosts(prev => {
          const updated = prev.map(p => p.id === newPost.id ? created : p);
          setStoredItem(STORAGE_KEYS.BLOG_POSTS, updated);
          return updated;
        });
      }
    }).catch(() => {});
  };

  const updateBlogPostHandler = async (id: string, updatedFields: Partial<BlogPost>) => {
    const nextPosts = blogPosts.map(p => (p.id === id ? { ...p, ...updatedFields } : p));
    setBlogPosts(nextPosts);
    setStoredItem(STORAGE_KEYS.BLOG_POSTS, nextPosts);
    broadcastSync('SYNC_BLOG', nextPosts);

    syncServerStore('blog_posts', 'update', updatedFields, id);
    apiUpdateBlogPost(id, updatedFields).catch(() => {});
  };

  const deleteBlogPostHandler = async (id: string) => {
    const nextPosts = blogPosts.filter(p => p.id !== id);
    setBlogPosts(nextPosts);
    setStoredItem(STORAGE_KEYS.BLOG_POSTS, nextPosts);
    broadcastSync('SYNC_BLOG', nextPosts);

    syncServerStore('blog_posts', 'delete', null, id);
    apiDeleteBlogPost(id).catch(() => {});
  };

  const togglePostPublishHandler = async (id: string) => {
    const target = blogPosts.find(p => p.id === id);
    if (!target) return;
    const newPub = !target.published;
    await updateBlogPostHandler(id, { published: newPub });
  };

  // ================= REVIEWS CRUD =================
  const addReviewHandler = async (rev: Omit<Review, 'id' | 'created_at'>) => {
    const newReview: Review = {
      ...rev,
      id: `rev-${Date.now()}`,
      created_at: new Date().toISOString().split('T')[0],
      approved_by: userProfile?.id,
    };
    const nextReviews = [newReview, ...reviews];
    setReviews(nextReviews);
    setStoredItem(STORAGE_KEYS.REVIEWS, nextReviews);
    broadcastSync('SYNC_REVIEWS', nextReviews);

    syncServerStore('reviews', 'create', newReview);
    createReview({
      ...rev,
      approved_by: userProfile?.id,
    }).then(created => {
      if (created && created.id) {
        setReviews(prev => {
          const updated = prev.map(r => r.id === newReview.id ? created : r);
          setStoredItem(STORAGE_KEYS.REVIEWS, updated);
          return updated;
        });
      }
    }).catch(() => {});
  };

  const updateReviewHandler = async (id: string, updatedFields: Partial<Review>) => {
    const nextReviews = reviews.map(r => (r.id === id ? { ...r, ...updatedFields } : r));
    setReviews(nextReviews);
    setStoredItem(STORAGE_KEYS.REVIEWS, nextReviews);
    broadcastSync('SYNC_REVIEWS', nextReviews);

    syncServerStore('reviews', 'update', updatedFields, id);
    apiUpdateReview(id, updatedFields).catch(() => {});
  };

  const deleteReviewHandler = async (id: string) => {
    const nextReviews = reviews.filter(r => r.id !== id);
    setReviews(nextReviews);
    setStoredItem(STORAGE_KEYS.REVIEWS, nextReviews);
    broadcastSync('SYNC_REVIEWS', nextReviews);

    syncServerStore('reviews', 'delete', null, id);
    apiDeleteReview(id).catch(() => {});
  };

  const setReviewStatusHandler = async (id: string, status: Review['status']) => {
    await updateReviewHandler(id, { status, approved_by: userProfile?.id });
  };

  // ================= SETTINGS CRUD =================
  const updateSettingsHandler = async (newSettings: Partial<SystemSettings>) => {
    const nextSettings = { ...settings, ...newSettings };
    setSettings(nextSettings);
    setStoredItem(STORAGE_KEYS.SETTINGS, nextSettings);
    broadcastSync('SYNC_SETTINGS', nextSettings);

    syncServerStore('system_settings', 'update', {
      agency_name: nextSettings.agencyName,
      agency_phone: nextSettings.agencyPhone,
      agency_whatsapp: nextSettings.agencyWhatsApp,
      agency_email: nextSettings.agencyEmail,
      currency: nextSettings.currency,
      stitch_api_key: nextSettings.stitchApiKey,
      meta_pixel_id: nextSettings.metaPixelId,
      meta_capi_token: nextSettings.metaCapiToken,
      tiktok_pixel_id: nextSettings.tikTokPixelId,
      tiktok_access_token: nextSettings.tikTokAccessToken,
      updated_by: userProfile?.id,
    });

    updateSystemSettings({
      agency_name: nextSettings.agencyName,
      agency_phone: nextSettings.agencyPhone,
      agency_whatsapp: nextSettings.agencyWhatsApp,
      agency_email: nextSettings.agencyEmail,
      currency: nextSettings.currency,
      stitch_api_key: nextSettings.stitchApiKey,
      meta_pixel_id: nextSettings.metaPixelId,
      meta_capi_token: nextSettings.metaCapiToken,
      tiktok_pixel_id: nextSettings.tikTokPixelId,
      tiktok_access_token: nextSettings.tikTokAccessToken,
      updated_by: userProfile?.id,
    }).catch(() => {});
  };

  const resetToDefaults = async () => {
    setSettings(DEFAULT_SETTINGS);
    setStoredItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    broadcastSync('SYNC_SETTINGS', DEFAULT_SETTINGS);

    syncServerStore('system_settings', 'update', {
      agency_name: DEFAULT_SETTINGS.agencyName,
      agency_phone: DEFAULT_SETTINGS.agencyPhone,
      agency_whatsapp: DEFAULT_SETTINGS.agencyWhatsApp,
      agency_email: DEFAULT_SETTINGS.agencyEmail,
      currency: DEFAULT_SETTINGS.currency,
      stitch_api_key: DEFAULT_SETTINGS.stitchApiKey,
      meta_pixel_id: DEFAULT_SETTINGS.metaPixelId,
      meta_capi_token: DEFAULT_SETTINGS.metaCapiToken,
      tiktok_pixel_id: DEFAULT_SETTINGS.tikTokPixelId,
      tiktok_access_token: DEFAULT_SETTINGS.tikTokAccessToken,
    });
  };

  return (
    <DataStoreContext.Provider
      value={{
        userProfile,
        userRole: userProfile?.role || null,
        isAdmin: Boolean(userProfile),
        isLoading,
        isLiveSupabase,
        login,
        logout,
        hasRole,
        refreshData: loadAllData,

        packages,
        addPackage: addPackageHandler,
        updatePackage: updatePackageHandler,
        deletePackage: deletePackageHandler,
        togglePackagePopular: togglePackagePopularHandler,

        invoices,
        addInvoice: addInvoiceHandler,
        updateInvoice: updateInvoiceHandler,
        deleteInvoice: deleteInvoiceHandler,
        markInvoicePaid: markInvoicePaidHandler,

        leads,
        addLead: addLeadHandler,
        updateLead: updateLeadHandler,
        deleteLead: deleteLeadHandler,
        moveLeadStage: moveLeadStageHandler,

        projects,
        addProject: addProjectHandler,
        updateProject: updateProjectHandler,
        deleteProject: deleteProjectHandler,

        blogPosts,
        addBlogPost: addBlogPostHandler,
        updateBlogPost: updateBlogPostHandler,
        deleteBlogPost: deleteBlogPostHandler,
        togglePostPublish: togglePostPublishHandler,

        reviews,
        addReview: addReviewHandler,
        updateReview: updateReviewHandler,
        deleteReview: deleteReviewHandler,
        setReviewStatus: setReviewStatusHandler,

        settings,
        updateSettings: updateSettingsHandler,
        resetToDefaults,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  );
}

export function useDataStore() {
  const context = useContext(DataStoreContext);
  if (!context) {
    throw new Error('useDataStore must be used within a DataStoreProvider');
  }
  return context;
}
