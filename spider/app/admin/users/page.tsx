'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '../../../components/AdminHeader';
import { useDataStore } from '../../../lib/store';
import { UserProfile, AdminRole } from '../../../types/database';
import {
  ShieldAlert,
  UserPlus,
  Shield,
  Key,
  Mail,
  User,
  Trash2,
  CheckCircle2,
  XCircle,
  Edit2,
  X,
  AlertCircle,
  Sparkles,
  Layers,
  Lock
} from 'lucide-react';

const ROLE_CONFIG: Record<AdminRole, { name: string; description: string; color: string; badge: string }> = {
  super_admin: {
    name: 'المدير العام (Super Admin)',
    description: 'صلاحيات مطلقة: إدارة جميع الوحدات، إعدادات النظام، وتعيين أدوار الموظفين',
    color: 'border-primary/50 text-primary bg-primary/10',
    badge: 'صلاحيات كاملة',
  },
  sales_manager: {
    name: 'مدير المبيعات (Sales Manager)',
    description: 'إدارة مسار العملاء المحتملين (CRM)، تعديل مراحل الصفقات، وقراءة الباقات',
    color: 'border-amber-500/50 text-amber-400 bg-amber-500/10',
    badge: 'CRM والصفقات',
  },
  finance_manager: {
    name: 'المدير المالي (Finance Manager)',
    description: 'إنشاء ومتابعة الفواتير والتحصيل، وتعديل أسعار باقات الخدمات',
    color: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10',
    badge: 'المالية والفواتير',
  },
  content_editor: {
    name: 'مسؤول المحتوى (Content Editor)',
    description: 'نشر وتعديل دراسات الحالة والمشاريع، مقالات المدونة، واعتماد التقييمات',
    color: 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10',
    badge: 'المشاريع والمدونة',
  },
};

export default function AdminUsersPage() {
  const { userProfile, userRole } = useDataStore();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('BlackSpider@2026!');
  const [formRole, setFormRole] = useState<AdminRole>('sales_manager');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (res.ok && data.users) {
        setUsers(data.users);
      } else {
        setError(data.error || 'تعذر تحميل قائمة المستخدمين');
      }
    } catch (err: any) {
      setError(err.message || 'خطأ في الاتصال');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formEmail,
          password: formPassword,
          full_name: formName,
          role: formRole,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('تمت إضافة العضو الجديد بنجاح');
        setIsAddModalOpen(false);
        setFormName('');
        setFormEmail('');
        fetchUsers();
      } else {
        setError(data.error || 'فشلت إضافة العضو');
      }
    } catch (err: any) {
      setError(err.message || 'خطأ أثناء الإرسال');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedUser.id,
          role: formRole,
          full_name: formName,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('تم تحديث دور وبيانات العضو بنجاح');
        setIsEditModalOpen(false);
        fetchUsers();
      } else {
        setError(data.error || 'فشل التحديث');
      }
    } catch (err: any) {
      setError(err.message || 'خطأ أثناء التحديث');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId: string, email: string) => {
    if (userId === userProfile?.id) {
      alert('لا يمكنك حذف حسابك الحالي!');
      return;
    }

    if (!confirm(`هل أنت متأكد من رغبتك في حذف العضو (${email}) نهائياً؟`)) return;

    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('تم حذف العضو بنجاح');
        setUsers(prev => prev.filter(u => u.id !== userId));
      } else {
        setError(data.error || 'فشل الحذف');
      }
    } catch (err: any) {
      setError(err.message || 'خطأ في عملية الحذف');
    }
  };

  const openEditModal = (u: UserProfile) => {
    setSelectedUser(u);
    setFormName(u.full_name);
    setFormEmail(u.email);
    setFormRole(u.role);
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="إدارة الفريق والأدوار (RBAC & Team Members)"
        subtitle="التحكم بصلاحيات الوصول لقاعدة بيانات Supabase، تعيين الأدوار، وإدارة مفاتيح الأمان"
      />

      <div className="p-6 md:p-8 space-y-6">
        {/* Alerts */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg(null)}><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-text-primary tracking-tight">أعضاء الفريق ومستويات الصلاحيات</h2>
            <p className="text-xs text-on-surface-variant mt-1">
              يتم تطبيق الصلاحيات مباشرة على مستوى PostgreSQL Row-Level Security (RLS)
            </p>
          </div>

          <button
            onClick={() => {
              setFormName('');
              setFormEmail('');
              setFormRole('sales_manager');
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold text-xs shadow-lg shadow-glow-crimson/30 hover:shadow-glow-crimson/50 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            type="button"
          >
            <UserPlus className="w-4 h-4" />
            <span>إضافة عضو جديد</span>
          </button>
        </div>

        {/* Roles Quick Legend Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.entries(ROLE_CONFIG) as [AdminRole, typeof ROLE_CONFIG[AdminRole]][]).map(([key, config]) => {
            const count = users.filter(u => u.role === key).length;
            return (
              <div key={key} className="p-4 rounded-2xl bg-surface-glass backdrop-blur-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-bold ${config.color}`}>
                    {config.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-text-primary">
                    {count} أعضاء
                  </span>
                </div>
                <h3 className="text-sm font-bold text-text-primary">{config.name}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{config.description}</p>
              </div>
            );
          })}
        </div>

        {/* Users Table */}
        <div className="rounded-2xl bg-surface-glass backdrop-blur-xl border border-white/5 overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <span className="text-sm font-bold text-text-primary">قائمة الحسابات النشطة ({users.length})</span>
            <span className="text-xs text-emerald-400 font-mono">SUPABASE AUTH ENCRYPTED</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-on-surface-variant">
              جاري مزامنة بيانات المستخدمين من Supabase...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-white/5 bg-surface-container-low text-on-surface-variant">
                    <th className="p-4">العضو / البريد</th>
                    <th className="p-4">الدور الوظيفي (Role)</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4">تاريخ الانضمام</th>
                    <th className="p-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((u) => {
                    const config = ROLE_CONFIG[u.role] || ROLE_CONFIG.sales_manager;
                    const isSelf = u.id === userProfile?.id;

                    return (
                      <tr key={u.id} className="hover:bg-surface-container/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-surface-container border border-white/10 flex items-center justify-center font-bold text-primary shrink-0">
                              {u.full_name?.substring(0, 2) || 'BS'}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-text-primary text-sm">{u.full_name}</span>
                                {isSelf && (
                                  <span className="text-[10px] px-2 py-0.2 rounded bg-primary/20 text-primary border border-primary/30">
                                    أنت (الحساب الحالي)
                                  </span>
                                )}
                              </div>
                              <span className="text-on-surface-variant font-mono text-xs">{u.email}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${config.color}`}>
                            <Shield className="w-3.5 h-3.5" />
                            <span>{config.name}</span>
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>نشط</span>
                          </span>
                        </td>

                        <td className="p-4 font-mono text-on-surface-variant">
                          {u.created_at ? new Date(u.created_at).toLocaleDateString('ar-EG') : 'منذ التأسيس'}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openEditModal(u)}
                              className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-white transition-colors"
                              title="تعديل الدور"
                              type="button"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            {!isSelf && (
                              <button
                                onClick={() => handleDeleteUser(u.id, u.email)}
                                className="p-2 rounded-lg bg-surface-container hover:bg-red-500/20 text-on-surface-variant hover:text-red-400 transition-colors"
                                title="حذف الحساب"
                                type="button"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Permissions Breakdown Matrix */}
        <div className="p-6 rounded-2xl bg-surface-glass backdrop-blur-xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
            <Lock className="w-4 h-4 text-primary" />
            <span>مصفوفة الصلاحيات المطبقة على النظام (Permission Matrix):</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-white/5 text-on-surface-variant">
                  <th className="p-3">الوحدة البرمجية</th>
                  <th className="p-3 text-center">المدير العام (Super Admin)</th>
                  <th className="p-3 text-center">مدير المبيعات (Sales)</th>
                  <th className="p-3 text-center">المدير المالي (Finance)</th>
                  <th className="p-3 text-center">مسؤول المحتوى (Content)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-on-surface-variant">
                <tr>
                  <td className="p-3 font-semibold text-text-primary">إدارة الصفقات (CRM Leads)</td>
                  <td className="p-3 text-center text-emerald-400 font-bold">قراءة + كتابة + حذف</td>
                  <td className="p-3 text-center text-emerald-400 font-bold">قراءة + كتابة + نقل مراحل</td>
                  <td className="p-3 text-center text-outline">قراءة فقط</td>
                  <td className="p-3 text-center text-outline">محجوب</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary">باقات الأسعار (Packages)</td>
                  <td className="p-3 text-center text-emerald-400 font-bold">تحكم شامل</td>
                  <td className="p-3 text-center text-emerald-400 font-bold">إضافة وتعديل</td>
                  <td className="p-3 text-center text-emerald-400 font-bold">تعديل الأسعار</td>
                  <td className="p-3 text-center text-outline">قراءة فقط</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary">المالية والفواتير (Invoices)</td>
                  <td className="p-3 text-center text-emerald-400 font-bold">تحكم شامل</td>
                  <td className="p-3 text-center text-outline">قراءة فقط</td>
                  <td className="p-3 text-center text-emerald-400 font-bold">إنشاء + تحصيل + حذف</td>
                  <td className="p-3 text-center text-outline">محجوب</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary">المشاريع وسابقة الأعمال (Projects)</td>
                  <td className="p-3 text-center text-emerald-400 font-bold">تحكم شامل</td>
                  <td className="p-3 text-center text-outline">قراءة فقط</td>
                  <td className="p-3 text-center text-outline">قراءة فقط</td>
                  <td className="p-3 text-center text-emerald-400 font-bold">إضافة + تعديل + حذف</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary">المدونة والتقييمات (Blog & Reviews)</td>
                  <td className="p-3 text-center text-emerald-400 font-bold">تحكم شامل</td>
                  <td className="p-3 text-center text-outline">قراءة فقط</td>
                  <td className="p-3 text-center text-outline">قراءة فقط</td>
                  <td className="p-3 text-center text-emerald-400 font-bold">نشر واعتماد كامل</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary">إعدادات المنظومة والمفاتيح (Settings)</td>
                  <td className="p-3 text-center text-emerald-400 font-bold">حصرية للمدير العام</td>
                  <td className="p-3 text-center text-outline">محجوب</td>
                  <td className="p-3 text-center text-outline">محجوب</td>
                  <td className="p-3 text-center text-outline">محجوب</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-surface-container-low border border-white/10 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="font-bold text-sm text-text-primary flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-primary" />
                <span>إضافة عضو جديد للفريق</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-on-surface-variant hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-on-surface-variant mb-1 font-semibold">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="مثال: أحمد عبدالسلام"
                  className="w-full bg-surface-container p-2.5 rounded-xl border border-white/5 text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant mb-1 font-semibold">البريد الإلكتروني المهني</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="member@blackspider.agency"
                  className="w-full bg-surface-container p-2.5 rounded-xl border border-white/5 text-text-primary font-mono focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant mb-1 font-semibold">كلمة المرور المؤقتة</label>
                <input
                  type="password"
                  required
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  className="w-full bg-surface-container p-2.5 rounded-xl border border-white/5 text-text-primary font-mono focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant mb-1 font-semibold">الدور والصلاحية (Role)</label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as AdminRole)}
                  className="w-full bg-surface-container p-2.5 rounded-xl border border-white/5 text-text-primary focus:outline-none focus:border-primary"
                >
                  <option value="super_admin">المدير العام (Super Admin) - صلاحيات مطلقة</option>
                  <option value="sales_manager">مدير المبيعات (Sales Manager) - CRM والصفقات</option>
                  <option value="finance_manager">المدير المالي (Finance Manager) - الفواتير والأسعار</option>
                  <option value="content_editor">مسؤول المحتوى (Content Editor) - المشاريع والمدونة</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'جاري الإنشاء في Supabase...' : 'حفظ وتفعيل الحساب'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface-variant hover:text-white"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-surface-container-low border border-white/10 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="font-bold text-sm text-text-primary flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-primary" />
                <span>تعديل دور العضو</span>
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-on-surface-variant hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateRole} className="space-y-3 text-xs">
              <div>
                <label className="block text-on-surface-variant mb-1 font-semibold">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-surface-container p-2.5 rounded-xl border border-white/5 text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant mb-1 font-semibold">البريد الإلكتروني</label>
                <input
                  type="text"
                  disabled
                  value={formEmail}
                  className="w-full bg-surface-container/50 p-2.5 rounded-xl border border-white/5 text-outline font-mono cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant mb-1 font-semibold">الدور والصلاحية (Role)</label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as AdminRole)}
                  className="w-full bg-surface-container p-2.5 rounded-xl border border-white/5 text-text-primary focus:outline-none focus:border-primary"
                >
                  <option value="super_admin">المدير العام (Super Admin) - صلاحيات مطلقة</option>
                  <option value="sales_manager">مدير المبيعات (Sales Manager) - CRM والصفقات</option>
                  <option value="finance_manager">المدير المالي (Finance Manager) - الفواتير والأسعار</option>
                  <option value="content_editor">مسؤول المحتوى (Content Editor) - المشاريع والمدونة</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'جاري الحفظ...' : 'تحديث الدور والصلاحيات'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface-variant hover:text-white"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
