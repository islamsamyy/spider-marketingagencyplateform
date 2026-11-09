'use client';

import React, { useState } from 'react';
import AdminHeader from '../../../components/AdminHeader';
import { useDataStore } from '../../../lib/store';
import { Review } from '../../../types/database';
import {
  Star,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function AdminReviewsPage() {
  const { reviews, addReview, updateReview, deleteReview, setReviewStatus } = useDataStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    client_name: string;
    client_role: string;
    company: string;
    avatar_url: string;
    rating: number;
    review_text: string;
    roas_boost: string;
    status: Review['status'];
  }>({
    client_name: '',
    client_role: 'مؤسس ومدير تنفيذي',
    company: '',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    review_text: '',
    roas_boost: '+420% ROAS',
    status: 'approved'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingReview(null);
    setFormData({
      client_name: '',
      client_role: 'مؤسس ومدير تنفيذي',
      company: '',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      review_text: '',
      roas_boost: '+480% ROAS',
      status: 'approved'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rev: Review) => {
    setEditingReview(rev);
    setFormData({
      client_name: rev.client_name,
      client_role: rev.client_role,
      company: rev.company,
      avatar_url: rev.avatar_url,
      rating: rev.rating,
      review_text: rev.review_text,
      roas_boost: rev.roas_boost,
      status: rev.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client_name || !formData.review_text) return;

    if (editingReview) {
      updateReview(editingReview.id, formData);
      showToast(`تم تحديث تقييم "${formData.client_name}" بنجاح!`);
    } else {
      addReview(formData);
      showToast(`تمت إضافة تقييم جديد بنجاح ونشره في الصفحة الرئيسية!`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من رغبتك في حذف تقييم العميل "${name}"؟`)) {
      deleteReview(id);
      showToast(`تم حذف تقييم "${name}".`);
    }
  };

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      r.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.review_text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="إدارة تقييمات وآراء العملاء (Reviews Moderation CMS)"
        subtitle="مراجعة التقييمات الواردة، اعتماد نشرها في الصفحة الرئيسية، وإضافة آراء العملاء الموثقة"
      />

      <main className="p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Toast */}
        {toastMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-between text-xs font-bold animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <span className="font-mono">LIVE ON /#reviews</span>
          </div>
        )}

        {/* Filter Pills & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-outline absolute right-3 top-3" />
              <input
                type="text"
                placeholder="بحث باسم العميل أو الشركة أو نص التقييم..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface-container pr-9 pl-4 py-2 rounded-xl text-xs text-on-surface border border-white/5 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-surface-container p-1 rounded-xl border border-white/5 text-xs">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterStatus === 'all' ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:text-white'
                }`}
              >
                الكل ({reviews.length})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterStatus === 'pending'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                قيد المراجعة ({reviews.filter((r) => r.status === 'pending').length})
              </button>
              <button
                onClick={() => setFilterStatus('approved')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterStatus === 'approved'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                منشورة ({reviews.filter((r) => r.status === 'approved').length})
              </button>
            </div>

            <button
              onClick={handleOpenAdd}
              type="button"
              className="px-5 py-2.5 rounded-xl bg-primary-container hover:bg-[#e60036] text-white text-xs font-bold shadow-lg shadow-glow-crimson transition-all flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة تقييم جديد</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-surface-container-low border border-white/5 hover:border-primary/30 shadow-xl flex flex-col justify-between gap-4 transition-all relative group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar_url}
                      alt={rev.client_name}
                      className="w-12 h-12 rounded-full object-cover border border-primary/30 shrink-0"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-text-primary">{rev.client_name}</span>
                      <span className="text-xs text-on-surface-variant">
                        {rev.client_role} • {rev.company}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-primary text-primary' : 'text-surface-container-highest'}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-on-surface leading-relaxed italic bg-surface-container/40 p-4 rounded-2xl border border-white/5 mb-4">
                  &ldquo;{rev.review_text}&rdquo;
                </p>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-bold">
                      {rev.roas_boost}
                    </span>
                    <span className="text-[11px] text-on-surface-variant font-mono">{rev.created_at}</span>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                      rev.status === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : rev.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {rev.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {rev.status !== 'approved' && (
                    <button
                      onClick={() => {
                        setReviewStatus(rev.id, 'approved');
                        showToast(`تم اعتماد تقييم "${rev.client_name}" ونشره!`);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>اعتماد ونشر</span>
                    </button>
                  )}
                  {rev.status !== 'rejected' && (
                    <button
                      onClick={() => {
                        setReviewStatus(rev.id, 'rejected');
                        showToast(`تم رفض تقييم "${rev.client_name}".`);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>رفض</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(rev)}
                    className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-white transition-colors"
                    title="تعديل"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(rev.id, rev.client_name)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ADD / EDIT REVIEW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-container-low border border-primary/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 left-6 p-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-bold text-base text-text-primary mb-1">
              {editingReview ? 'تعديل التقييم' : 'إضافة تقييم عميل جديد'}
            </h3>
            <p className="text-xs text-on-surface-variant mb-6">
              يظهر التقييم مباشرة في شبكة الآراء في الصفحة الرئيسية بمجرد اعتماده
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">اسم العميل *</label>
                  <input
                    type="text"
                    required
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="مثال: م. سلطان الدوسري"
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">المنصب / الصفة</label>
                  <input
                    type="text"
                    value={formData.client_role}
                    onChange={(e) => setFormData({ ...formData, client_role: e.target.value })}
                    placeholder="مثال: المؤسس والمدير التنفيذي"
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">اسم الشركة / المتجر *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="مثال: دار العود الفاخر"
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">شارة العائد (ROAS Metric)</label>
                  <input
                    type="text"
                    value={formData.roas_boost}
                    onChange={(e) => setFormData({ ...formData, roas_boost: e.target.value })}
                    placeholder="+540% ROAS"
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary font-mono focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">التقييم بالنجوم (1-5)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 نجوم - ممتاز)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 نجوم - جيد جداً)</option>
                    <option value={3}>⭐⭐⭐ (3 نجوم - متوسط)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">حالة النشر</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="approved">معتمد ومنشور (Approved)</option>
                    <option value="pending">قيد المراجعة (Pending)</option>
                    <option value="rejected">مرفوض (Rejected)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-primary">نص التقييم والتجربة *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.review_text}
                  onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
                  placeholder="تجربة التعامل مع وكالة بلاك سبايدر والنتائج المحققة بالأرقام..."
                  className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs text-on-surface-variant font-bold transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-primary-container hover:bg-[#e60036] text-white text-xs font-bold shadow-lg shadow-glow-crimson transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingReview ? 'حفظ التعديلات' : 'نشر التقييم'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
