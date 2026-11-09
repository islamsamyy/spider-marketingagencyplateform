'use client';

import React, { useState } from 'react';
import AdminHeader from '../../../components/AdminHeader';
import { useDataStore } from '../../../lib/store';
import { Lead } from '../../../types/database';
import {
  Plus,
  MessageCircle,
  Phone,
  Mail,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Edit2,
  Eye,
  Download,
  X,
  UserCheck,
  Clock,
  Sparkles
} from 'lucide-react';

export default function AdminCrmPage() {
  const { leads, addLead, updateLead, deleteLead, moveLeadStage, packages } = useDataStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    client_name: string;
    company: string;
    email: string;
    phone: string;
    budget: string;
    service: Lead['service'];
    notes: string;
    source: string;
    stage: Lead['stage'];
    package_id: string;
  }>({
    client_name: '',
    company: '',
    email: '',
    phone: '',
    budget: '$25,000 / Mo',
    service: 'media_buying',
    notes: '',
    source: 'Website Lead Funnel',
    stage: 'new',
    package_id: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const columns: { id: Lead['stage']; title: string; color: string; badgeClass: string }[] = [
    { id: 'new', title: 'طلبات جديدة (New)', color: 'border-blue-500/40', badgeClass: 'bg-blue-500/20 text-blue-400' },
    { id: 'contacted', title: 'تم التواصل (Contacted)', color: 'border-amber-500/40', badgeClass: 'bg-amber-500/20 text-amber-400' },
    { id: 'negotiation', title: 'قيد التفاوض (In Negotiation)', color: 'border-primary/40', badgeClass: 'bg-primary-container/20 text-primary' },
    { id: 'closed_won', title: 'تم التعاقد (Closed Won)', color: 'border-emerald-500/40', badgeClass: 'bg-emerald-500/20 text-emerald-400' },
  ];

  const handleOpenAdd = () => {
    setEditingLead(null);
    setFormData({
      client_name: '',
      company: '',
      email: '',
      phone: '',
      budget: '$25,000 / Mo',
      service: 'media_buying',
      notes: '',
      source: 'Direct Admin Input',
      stage: 'new',
      package_id: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (lead: Lead) => {
    setEditingLead(lead);
    setFormData({
      client_name: lead.client_name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      budget: lead.budget,
      service: lead.service,
      notes: lead.notes || '',
      source: lead.source || 'Website Lead Funnel',
      stage: lead.stage,
      package_id: lead.package_id || '',
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client_name) return;

    const payload = {
      ...formData,
      package_id: formData.package_id || null,
    };

    if (editingLead) {
      updateLead(editingLead.id, payload);
      showToast(`تم تحديث بيانات العميل "${formData.client_name}" بنجاح!`);
    } else {
      addLead(payload);
      showToast(`تمت إضافة العميل "${formData.client_name}" إلى قائمة الصفقات!`);
    }
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من رغبتك في حذف صفقة العميل "${name}" نهائياً؟`)) {
      deleteLead(id);
      showToast(`تم حذف صفقة "${name}".`);
      if (viewingLead?.id === id) setViewingLead(null);
    }
  };

  const handleExportCSV = () => {
    const headers = 'ID,Client Name,Company,Email,Phone,Service,Budget,Stage,Source,Created At\n';
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.client_name}","${l.company}","${l.email}","${l.phone}","${l.service}","${l.budget}","${l.stage}","${l.source}","${l.created_at}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `black-spider-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="لوحة إدارة علاقات العملاء والصفقات (CRM Kanban)"
        subtitle="تتبع دورة حياة العميل من أول استفسار وحتى توقيع العقد النهائي"
      />

      <main className="p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Toast */}
        {toastMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-between text-xs font-bold animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <span className="font-mono">CRM LIVE SYNC</span>
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-outline absolute right-3 top-3" />
              <input
                type="text"
                placeholder="بحث باسم العميل، الشركة، الهاتف أو البريد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface-container pr-9 pl-4 py-2 rounded-xl text-xs text-on-surface border border-white/5 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              type="button"
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/5 text-xs text-on-surface-variant hover:text-white font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-primary" />
              <span>تصدير CSV</span>
            </button>

            <button
              onClick={handleOpenAdd}
              type="button"
              className="px-5 py-2.5 rounded-xl bg-primary-container hover:bg-[#e60036] text-white text-xs font-bold shadow-lg shadow-glow-crimson transition-all flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة صفقة / عميل جديد</span>
            </button>
          </div>
        </div>

        {/* Kanban Board Columns (4 Stages) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {columns.map((col) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === col.id);
            return (
              <div
                key={col.id}
                className="flex flex-col rounded-3xl bg-surface-container-lowest/80 border border-white/5 p-4 shadow-xl min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                    <h3 className="font-bold text-xs text-text-primary">{col.title}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${col.badgeClass}`}>
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="flex flex-col gap-3">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-2xl bg-surface-container-low border border-white/5 hover:border-primary/40 shadow-md transition-all flex flex-col gap-3 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="font-bold text-xs text-text-primary group-hover:text-primary transition-colors">
                            {lead.client_name}
                          </span>
                          <span className="text-[11px] text-on-surface-variant">{lead.company}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setViewingLead(lead)}
                            className="p-1 rounded text-on-surface-variant hover:text-white"
                            title="عرض تفاصيل العميل"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(lead)}
                            className="p-1 rounded text-on-surface-variant hover:text-primary"
                            title="تعديل العميل"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(lead.id, lead.client_name)}
                            className="p-1 rounded text-on-surface-variant hover:text-rose-400"
                            title="حذف العميل"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Budget & Service Badge */}
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="px-2 py-0.5 rounded-md bg-surface-container font-mono font-bold text-primary">
                          {lead.budget}
                        </span>
                        <span className="text-[10px] text-on-surface-variant uppercase font-mono">
                          {lead.service}
                        </span>
                      </div>

                      {/* Linked Package Relation Badge */}
                      {lead.package_id && (
                        <div className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary font-semibold">
                          <span>📦</span>
                          <span className="truncate font-bold">
                            {packages.find((p) => p.id === lead.package_id)?.tier_name || lead.package?.tier_name || 'باقة مخصصة'}
                          </span>
                        </div>
                      )}

                      {/* Notes snippet */}
                      {lead.notes && (
                        <p className="text-[11px] text-on-surface-variant line-clamp-2 italic bg-surface-container/40 p-2 rounded-lg">
                          &ldquo;{lead.notes}&rdquo;
                        </p>
                      )}

                      {/* Action Triggers */}
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `مرحباً أستاذ ${lead.client_name}، نتواصل معك من إدارة النمو في وكالة بلاك سبايدر لمتابعة طلبكم الخاص بشركة (${lead.company}).`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                              title="محادثة واتساب مباشرة"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="p-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-white transition-colors"
                              title="اتصال هاتفي"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="p-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-white transition-colors"
                              title="إرسال بريد إلكتروني"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        {/* Move stage controls */}
                        <div className="flex items-center gap-1">
                          {col.id !== 'new' && (
                            <button
                              onClick={() => {
                                const prevStages: { [key: string]: Lead['stage'] } = {
                                  contacted: 'new',
                                  negotiation: 'contacted',
                                  closed_won: 'negotiation'
                                };
                                moveLeadStage(lead.id, prevStages[col.id]);
                              }}
                              className="p-1 rounded bg-surface-container text-on-surface-variant hover:text-white"
                              title="نقل للمرحلة السابقة"
                            >
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                          {col.id !== 'closed_won' && (
                            <button
                              onClick={() => {
                                const nextStages: { [key: string]: Lead['stage'] } = {
                                  new: 'contacted',
                                  contacted: 'negotiation',
                                  negotiation: 'closed_won'
                                };
                                moveLeadStage(lead.id, nextStages[col.id]);
                              }}
                              className="p-1 rounded bg-surface-container text-primary hover:bg-primary-container hover:text-white"
                              title="نقل للمرحلة التالية"
                            >
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ADD / EDIT LEAD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-container-low border border-primary/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 left-6 p-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-bold text-base text-text-primary mb-1">
              {editingLead ? 'تعديل بيانات العميل والصفقة' : 'إضافة عميل محتمل جديد'}
            </h3>
            <p className="text-xs text-on-surface-variant mb-6">
              يتم حفظ السجل في قاعدة البيانات ومزامنته مع مسار الـ CRM
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
                    placeholder="مثال: فيصل العتيبي"
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">اسم الشركة / المتجر *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="مثال: متجر نكست براند"
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">رقم الواتساب</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+966501234567"
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary font-mono focus:outline-none focus:border-primary text-left"
                    dir="ltr"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ceo@brand.com"
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary font-mono focus:outline-none focus:border-primary text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">الميزانية المقترحة</label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="$25,000 / Mo"
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary font-mono focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">المرحلة الحالية</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="new">طلبات جديدة (New)</option>
                    <option value="contacted">تم التواصل (Contacted)</option>
                    <option value="negotiation">قيد التفاوض (Negotiation)</option>
                    <option value="closed_won">تم التعاقد (Closed Won)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-primary">الباقة المرتبطة (Package Relation)</label>
                <select
                  value={formData.package_id}
                  onChange={(e) => setFormData({ ...formData, package_id: e.target.value })}
                  className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                >
                  <option value="">-- بدون باقة محددة (مخصص) --</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.tier_name} (${pkg.monthly_price}/شهر)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-primary">ملاحظات الاجتماع أو التحديات الحالية</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="ملاحظات حول متطلبات العميل، مشاكل تتبع CAPI، العائد المستهدف..."
                  className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs text-on-surface-variant font-bold transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-primary-container hover:bg-[#e60036] text-white text-xs font-bold shadow-lg shadow-glow-crimson transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingLead ? 'حفظ التعديلات' : 'إضافة العميل'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW LEAD DOSSIER MODAL */}
      {viewingLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-container-low border border-primary/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-right flex flex-col gap-5">
            <button
              onClick={() => setViewingLead(null)}
              className="absolute top-6 left-6 p-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-lg">
                {viewingLead.client_name.slice(0, 1)}
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-lg text-text-primary">{viewingLead.client_name}</h3>
                <span className="text-xs text-on-surface-variant">{viewingLead.company}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-surface-container text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-on-surface-variant">الهاتف / واتساب:</span>
                <span className="font-mono font-bold text-text-primary" dir="ltr">{viewingLead.phone || 'غير مسجل'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-on-surface-variant">البريد الإلكتروني:</span>
                <span className="font-mono text-text-primary" dir="ltr">{viewingLead.email || 'غير مسجل'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-on-surface-variant">الميزانية المقترحة:</span>
                <span className="font-mono font-bold text-primary">{viewingLead.budget}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-on-surface-variant">مصدر الطلب:</span>
                <span className="font-bold text-secondary">{viewingLead.source}</span>
              </div>
            </div>

            {viewingLead.notes && (
              <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-surface-container/60 border border-white/5">
                <span className="text-xs font-bold text-text-primary">ملاحظات وتفاصيل الاستفسار:</span>
                <p className="text-xs text-on-surface-variant leading-relaxed italic">
                  {viewingLead.notes}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              {viewingLead.phone && (
                <a
                  href={`https://wa.me/${viewingLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `مرحباً أستاذ ${viewingLead.client_name}، نتواصل معك من إدارة النمو في وكالة بلاك سبايدر.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#25D366] text-black font-bold text-xs flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>فتح محادثة واتساب فورية</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  setViewingLead(null);
                  handleOpenEdit(viewingLead);
                }}
                className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-text-primary"
              >
                تعديل البيانات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
