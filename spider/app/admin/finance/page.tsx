'use client';

import React, { useState } from 'react';
import AdminHeader from '../../../components/AdminHeader';
import { useDataStore } from '../../../lib/store';
import { Invoice } from '../../../types/database';
import {
  DollarSign,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Printer,
  Download,
  Search,
  Filter,
  X,
  Sparkles,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function AdminFinancePage() {
  const { invoices, addInvoice, updateInvoice, deleteInvoice, markInvoicePaid, packages, leads } = useDataStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    invoice_number: string;
    client_name: string;
    company: string;
    amount: number;
    status: Invoice['status'];
    due_date: string;
    service: string;
    lead_id: string;
    package_id: string;
  }>({
    invoice_number: `INV-2026-00${invoices.length + 1}`,
    client_name: '',
    company: '',
    amount: 2500,
    status: 'pending',
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    service: 'إدارة الحملات الإعلانية فائقة العائد (Media Buying)',
    lead_id: '',
    package_id: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingInvoice(null);
    setFormData({
      invoice_number: `INV-2026-00${invoices.length + 1}`,
      client_name: '',
      company: '',
      amount: 2500,
      status: 'pending',
      due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      service: 'إدارة الحملات الإعلانية فائقة العائد (Media Buying)',
      lead_id: '',
      package_id: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (inv: Invoice) => {
    setEditingInvoice(inv);
    setFormData({
      invoice_number: inv.invoice_number,
      client_name: inv.client_name,
      company: inv.company,
      amount: inv.amount,
      status: inv.status,
      due_date: inv.due_date,
      service: inv.service,
      lead_id: inv.lead_id || '',
      package_id: inv.package_id || '',
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client_name || !formData.amount) return;

    const payload = {
      ...formData,
      lead_id: formData.lead_id || null,
      package_id: formData.package_id || null,
    };

    if (editingInvoice) {
      updateInvoice(editingInvoice.id, payload);
      showToast(`تم تحديث الفاتورة ${formData.invoice_number} بنجاح!`);
    } else {
      addInvoice(payload);
      showToast(`تم إنشاء الفاتورة ${formData.invoice_number} بنجاح!`);
    }
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string, num: string) => {
    if (confirm(`هل أنت متأكد من رغبتك في حذف الفاتورة ${num} نهائياً؟`)) {
      deleteInvoice(id);
      showToast(`تم حذف الفاتورة ${num}.`);
    }
  };

  const totalBilled = invoices.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaid = invoices
    .filter((i) => i.status === 'paid')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalPending = invoices
    .filter((i) => i.status === 'pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const filteredInvoices = invoices.filter((i) => {
    const matchesSearch =
      i.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="الإدارة المالية والفواتير (Finance & Billing Hub)"
        subtitle="إصدار وإدارة الفواتير، متابعة التحصيل، وربط خطط النمو بالدفع الإلكتروني"
      />

      <main className="p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Toast */}
        {toastMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-between text-xs font-bold animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <span className="font-mono">STATUS: 200 SYNCED</span>
          </div>
        )}

        {/* Financial KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-on-surface-variant font-bold">TOTAL BILLED</span>
            <div className="mt-3">
              <div className="text-2xl font-bold font-mono text-text-primary" dir="ltr">
                ${totalBilled.toLocaleString()}
              </div>
              <span className="text-xs text-on-surface-variant">إجمالي المطالبات الصادرة ({invoices.length} فاتورة)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold">COLLECTED (PAID)</span>
            <div className="mt-3">
              <div className="text-2xl font-bold font-mono text-emerald-400" dir="ltr">
                ${totalPaid.toLocaleString()}
              </div>
              <span className="text-xs text-emerald-400/80">المبالغ المحصلة فعلياً في الحساب</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold">PENDING DUES</span>
            <div className="mt-3">
              <div className="text-2xl font-bold font-mono text-amber-400" dir="ltr">
                ${totalPending.toLocaleString()}
              </div>
              <span className="text-xs text-amber-400/80">مطالبات قيد التحصيل والانتظار</span>
            </div>
          </div>
        </div>

        {/* Quick Link Banner to Packages CMS */}
        <div className="p-4 rounded-2xl bg-gradient-to-l from-primary-container/20 to-surface-container border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs text-text-primary">
                هل ترغب في تعديل أسعار الباقات العامة أو إنشاء باقة مخصصة؟
              </span>
              <span className="text-[11px] text-on-surface-variant">
                لديك {packages.length} باقات مفعلة حالياً في صفحة /packages
              </span>
            </div>
          </div>

          <Link
            href="/admin/packages"
            className="px-5 py-2 rounded-xl bg-primary-container hover:bg-[#e60036] text-white text-xs font-bold shadow-lg transition-all flex items-center gap-2 shrink-0"
          >
            <span>إدارة باقات الأسعار (Packages CMS)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter and Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-outline absolute right-3 top-3" />
              <input
                type="text"
                placeholder="بحث برقم الفاتورة، العميل، الشركة أو الخدمة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface-container pr-9 pl-4 py-2 rounded-xl text-xs text-on-surface border border-white/5 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Pills */}
            <div className="flex items-center gap-1 bg-surface-container p-1 rounded-xl border border-white/5 text-xs">
              {(['all', 'paid', 'pending', 'overdue'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    statusFilter === st
                      ? 'bg-primary-container text-white'
                      : 'text-on-surface-variant hover:text-white'
                  }`}
                >
                  {st === 'all' && `الكل (${invoices.length})`}
                  {st === 'paid' && 'مدفوعة'}
                  {st === 'pending' && 'معلقة'}
                  {st === 'overdue' && 'متأخرة'}
                </button>
              ))}
            </div>

            <button
              onClick={handleOpenAdd}
              type="button"
              className="px-5 py-2.5 rounded-xl bg-primary-container hover:bg-[#e60036] text-white text-xs font-bold shadow-lg shadow-glow-crimson transition-all flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>إصدار فاتورة جديدة</span>
            </button>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="rounded-3xl bg-surface-container-low border border-white/5 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-surface-container border-b border-white/5 text-on-surface-variant font-mono uppercase">
                  <th className="p-4">رقم الفاتورة</th>
                  <th className="p-4">العميل / الشركة</th>
                  <th className="p-4">الخدمة</th>
                  <th className="p-4">المبلغ</th>
                  <th className="p-4">تاريخ الاستحقاق</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-text-primary">{inv.invoice_number}</td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-text-primary">{inv.client_name}</span>
                        <span className="text-[11px] text-on-surface-variant">{inv.company}</span>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant max-w-xs">
                      <div className="flex flex-col gap-1">
                        <span className="truncate">{inv.service}</span>
                        {(inv.package_id || inv.lead_id) && (
                          <div className="flex items-center gap-1.5 text-[10px] font-mono">
                            {inv.package_id && (
                              <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                                📦 {packages.find(p => p.id === inv.package_id)?.tier_name_en || 'Package'}
                              </span>
                            )}
                            {inv.lead_id && (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                🎯 CRM Deal
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-base text-primary" dir="ltr">
                      ${inv.amount.toLocaleString()}
                    </td>
                    <td className="p-4 font-mono text-on-surface-variant">{inv.due_date}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono ${
                          inv.status === 'paid'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : inv.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {inv.status === 'paid' && <CheckCircle2 className="w-3 h-3" />}
                        {inv.status === 'pending' && <Clock className="w-3 h-3" />}
                        {inv.status === 'overdue' && <AlertCircle className="w-3 h-3" />}
                        <span>{inv.status.toUpperCase()}</span>
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {inv.status !== 'paid' && (
                          <button
                            type="button"
                            onClick={() => {
                              markInvoicePaid(inv.id);
                              showToast(`تم تسجيل الفاتورة ${inv.invoice_number} كـ مدفوعة!`);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold transition-colors"
                            title="تأكيد التحصيل"
                          >
                            تحصيل ✓
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setPreviewInvoice(inv)}
                          className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-white"
                          title="معاينة وطباعة الفاتورة"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(inv)}
                          className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary"
                          title="تعديل الفاتورة"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(inv.id, inv.invoice_number)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                          title="حذف الفاتورة"
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
      </main>

      {/* CREATE / EDIT INVOICE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-container-low border border-primary/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 left-6 p-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-base text-text-primary">
                  {editingInvoice ? 'تعديل بيانات الفاتورة' : 'إصدار فاتورة جديدة'}
                </h3>
                <span className="text-xs text-on-surface-variant font-mono">
                  {formData.invoice_number}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-surface-container/40 border border-white/5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">ربط بصفقة عميل (CRM Lead)</label>
                  <select
                    value={formData.lead_id}
                    onChange={(e) => {
                      const selectedLeadId = e.target.value;
                      const matchedLead = leads.find((l) => l.id === selectedLeadId);
                      setFormData({
                        ...formData,
                        lead_id: selectedLeadId,
                        client_name: matchedLead ? matchedLead.client_name : formData.client_name,
                        company: matchedLead ? matchedLead.company : formData.company,
                      });
                    }}
                    className="px-3 py-2 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="">-- اختياري: اختر صفقة العميل --</option>
                    {leads.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.client_name} ({l.company})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">ربط بباقة أسعار (Package)</label>
                  <select
                    value={formData.package_id}
                    onChange={(e) => {
                      const selectedPkgId = e.target.value;
                      const matchedPkg = packages.find((p) => p.id === selectedPkgId);
                      setFormData({
                        ...formData,
                        package_id: selectedPkgId,
                        amount: matchedPkg ? matchedPkg.monthly_price : formData.amount,
                        service: matchedPkg ? `اشتراك ${matchedPkg.tier_name}` : formData.service,
                      });
                    }}
                    className="px-3 py-2 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="">-- اختياري: اختر الباقة --</option>
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.tier_name} (${pkg.monthly_price})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">اسم العميل *</label>
                  <input
                    type="text"
                    required
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="مثال: تركي القحطاني"
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">الشركة / المتجر *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="مثال: متجر هيفاء روز"
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-primary">الخدمة المقدمة *</label>
                <input
                  type="text"
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  placeholder="مثال: إدارة حملات Media Buying + CAPI Setup"
                  className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">المبلغ الإجمالي ($) *</label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary font-mono focus:outline-none focus:border-primary text-left"
                    dir="ltr"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">حالة الفاتورة *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="pending">معلقة (Pending)</option>
                    <option value="paid">مدفوعة (Paid)</option>
                    <option value="overdue">متأخرة (Overdue)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-primary">تاريخ الاستحقاق *</label>
                <input
                  type="date"
                  required
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary font-mono focus:outline-none focus:border-primary"
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
                  <span>{editingInvoice ? 'حفظ التعديلات' : 'إصدار الفاتورة'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INVOICE PRINTABLE PREVIEW MODAL */}
      {previewInvoice && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#0f0f13] border border-primary/40 rounded-3xl p-8 shadow-2xl relative text-right flex flex-col gap-6 text-on-surface">
            <button
              onClick={() => setPreviewInvoice(null)}
              className="absolute top-6 left-6 p-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Invoice Top Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="Black Spider" className="w-10 h-10 object-contain" />
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-white">بلاك سبايدر | BLACK SPIDER</span>
                  <span className="text-[10px] text-primary font-mono uppercase font-bold">DIGITAL GROWTH AGENCY</span>
                </div>
              </div>

              <div className="flex flex-col text-left font-mono">
                <span className="text-xs text-on-surface-variant">INVOICE:</span>
                <span className="font-bold text-primary text-sm">{previewInvoice.invoice_number}</span>
              </div>
            </div>

            {/* Bill To & Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-on-surface-variant font-mono">فاتورة موجهة إلى (BILL TO):</span>
                <span className="font-bold text-text-primary text-sm">{previewInvoice.client_name}</span>
                <span className="text-on-surface-variant">{previewInvoice.company}</span>
              </div>

              <div className="flex flex-col gap-1 text-left font-mono">
                <span className="text-[11px] text-on-surface-variant">تاريخ الاستحقاق:</span>
                <span className="font-bold text-text-primary">{previewInvoice.due_date}</span>
                <span className={`text-[10px] uppercase font-bold ${previewInvoice.status === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  STATUS: {previewInvoice.status}
                </span>
              </div>
            </div>

            {/* Line Item Table */}
            <div className="p-4 rounded-2xl bg-surface-container border border-white/5 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant pb-2 border-b border-white/5">
                <span>البيان / الخدمة</span>
                <span>المبلغ</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-text-primary">
                <span>{previewInvoice.service}</span>
                <span className="font-mono text-primary text-sm" dir="ltr">
                  ${previewInvoice.amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Total Due */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-xs text-on-surface-variant font-bold">المجموع المستحق للدفع:</span>
              <span className="text-2xl font-extrabold font-mono text-primary" dir="ltr">
                ${previewInvoice.amount.toLocaleString()}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-xl bg-primary-container text-white text-xs font-bold hover:bg-[#e60036] transition-all flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الفاتورة (Print / PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
