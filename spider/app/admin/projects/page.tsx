'use client';

import React, { useState } from 'react';
import AdminHeader from '../../../components/AdminHeader';
import { useDataStore } from '../../../lib/store';
import { ProjectCaseStudy } from '../../../types/database';
import {
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  ExternalLink,
  Search,
  CheckCircle2,
  UploadCloud,
  X
} from 'lucide-react';

export default function AdminProjectsPage() {
  const { projects, addProject, updateProject, deleteProject } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectCaseStudy | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    client_name: string;
    category: ProjectCaseStudy['category'];
    category_label: string;
    metric_badge: string;
    metric_label: string;
    thumbnail_url: string;
    description: string;
    timeline: string;
  }>({
    title: '',
    client_name: '',
    category: 'ecommerce',
    category_label: 'تجارة إلكترونية',
    metric_badge: '+300% ROAS',
    metric_label: 'عائد الإنفاق الإعلاني',
    thumbnail_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    description: '',
    timeline: '60 يوماً'
  });

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف دراسة الحالة هذه؟')) {
      deleteProject(id);
    }
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      client_name: '',
      category: 'ecommerce',
      category_label: 'تجارة إلكترونية',
      metric_badge: '+300% ROAS',
      metric_label: 'عائد الإنفاق الإعلاني',
      thumbnail_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
      description: '',
      timeline: '60 يوماً'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: ProjectCaseStudy) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      client_name: p.client_name,
      category: p.category,
      category_label: p.category_label,
      metric_badge: p.metric_badge,
      metric_label: p.metric_label,
      thumbnail_url: p.thumbnail_url,
      description: p.description,
      timeline: p.timeline
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.client_name) return;

    if (editingProject) {
      updateProject(editingProject.id, {
        ...formData,
        tags: ['Meta Ads', 'CRO', 'Growth']
      });
    } else {
      addProject({
        ...formData,
        tags: ['Meta Ads', 'Next.js', 'Scale']
      });
    }
    setIsModalOpen(false);
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="إدارة سابقة الأعمال ودراسات الحالة (Projects CMS)"
        subtitle="إضافة، تعديل، وحذف المشاريع المعروضة في صفحة /projects العامة"
      />

      <main className="p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-outline absolute right-3 top-3" />
            <input
              type="text"
              placeholder="بحث في سابقة الأعمال..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container pr-9 pl-4 py-2 rounded-xl text-xs text-on-surface border border-white/5 focus:outline-none focus:border-primary"
            />
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-primary-container text-white text-xs font-bold shadow-lg shadow-glow-crimson/30 hover:bg-[#e60036] flex items-center gap-1.5 transition-all"
            type="button"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة دراسة حالة جديدة</span>
          </button>
        </div>

        {/* CMS Data Table */}
        <div className="p-6 rounded-2xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col gap-4">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-surface-container-high/40 pb-3 text-on-surface-variant font-mono">
                  <th className="py-3 px-3">صورة المشروع</th>
                  <th className="py-3 px-3">عنوان دراسة الحالة والعميل</th>
                  <th className="py-3 px-3">القسم</th>
                  <th className="py-3 px-3">المؤشر المحقق</th>
                  <th className="py-3 px-3">المدة</th>
                  <th className="py-3 px-3 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/30">
                {filtered.map((proj) => (
                  <tr key={proj.id} className="hover:bg-surface-container/60 transition-colors">
                    <td className="py-3 px-3">
                      <img
                        src={proj.thumbnail_url}
                        alt={proj.title}
                        className="w-14 h-10 object-cover rounded-lg border border-white/10"
                      />
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-text-primary">{proj.title}</span>
                        <span className="text-on-surface-variant">{proj.client_name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-surface-container text-on-surface">
                        {proj.category_label}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col">
                        <span className="font-mono font-bold text-primary text-sm" dir="ltr">{proj.metric_badge}</span>
                        <span className="text-[10px] text-on-surface-variant">{proj.metric_label}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-on-surface-variant">{proj.timeline}</td>
                    <td className="py-3.5 px-3 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(proj)}
                          className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-white transition-colors"
                          title="تعديل دراسة الحالة"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj.id)}
                          className="p-1.5 rounded-lg bg-surface-container hover:bg-error-container text-error transition-colors"
                          title="حذف المشروع"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Add/Edit Project */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-2xl bg-surface-container-low border border-primary/40 p-6 flex flex-col gap-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-text-primary">
                  {editingProject ? 'تعديل دراسة الحالة' : 'إضافة دراسة حالة جديدة'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-on-surface-variant hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
                <div>
                  <label className="text-on-surface-variant block mb-1">عنوان المشروع *</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-surface-container p-2.5 rounded-lg border border-white/5 text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-on-surface-variant block mb-1">اسم العميل أو العلامة *</label>
                    <input
                      required
                      type="text"
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      className="w-full bg-surface-container p-2.5 rounded-lg border border-white/5 text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-on-surface-variant block mb-1">القسم / التصنيف</label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        const val = e.target.value as any;
                        const labels: any = {
                          ecommerce: 'تجارة إلكترونية',
                          saas: 'منصات SaaS',
                          real_estate: 'عقارات واستثمار',
                          lead_gen: 'تطبيقات ومطاعم'
                        };
                        setFormData({ ...formData, category: val, category_label: labels[val] });
                      }}
                      className="w-full bg-surface-container p-2.5 rounded-lg border border-white/5 text-on-surface focus:outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="ecommerce">تجارة إلكترونية</option>
                      <option value="saas">منصات SaaS</option>
                      <option value="real_estate">عقارات واستثمار</option>
                      <option value="lead_gen">تطبيقات ومطاعم</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-on-surface-variant block mb-1">المؤشر الرئيسي (Metric Badge) *</label>
                    <input
                      required
                      type="text"
                      placeholder="مثال: +340% ROAS"
                      value={formData.metric_badge}
                      onChange={(e) => setFormData({ ...formData, metric_badge: e.target.value })}
                      className="w-full bg-surface-container p-2.5 rounded-lg border border-white/5 text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-on-surface-variant block mb-1">وصف المؤشر</label>
                    <input
                      type="text"
                      placeholder="مثال: عائد الإنفاق الإعلاني"
                      value={formData.metric_label}
                      onChange={(e) => setFormData({ ...formData, metric_label: e.target.value })}
                      className="w-full bg-surface-container p-2.5 rounded-lg border border-white/5 text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Image Upload Placeholder */}
                <div>
                  <label className="text-on-surface-variant block mb-1">صورة الغلاف (Image Upload / URL):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={formData.thumbnail_url}
                      onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                      className="flex-1 bg-surface-container p-2 rounded-lg border border-white/5 text-xs text-on-surface text-left"
                    />
                    <button
                      type="button"
                      onClick={() => alert('تم تفعيل مستودع وسائط Supabase Storage! يمكنك استبدال الرابط أو رفع صور جديدة.')}
                      className="px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs flex items-center gap-1 text-on-surface"
                    >
                      <UploadCloud className="w-3.5 h-3.5 text-primary" />
                      <span>رفع</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-on-surface-variant block mb-1">شرح موجز للنتائج واستراتيجية العمل</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-surface-container p-2.5 rounded-lg border border-white/5 text-on-surface focus:outline-none focus:border-primary resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-primary-container text-white font-bold hover:bg-[#e60036]"
                  >
                    حفظ التغييرات
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
