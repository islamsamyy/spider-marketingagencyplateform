'use client';

import React, { useState } from 'react';
import AdminHeader from '../../../components/AdminHeader';
import { useDataStore } from '../../../lib/store';
import { PackageTier } from '../../../types/database';
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  Star,
  CheckCircle2,
  Search,
  Filter,
  DollarSign,
  Package,
  Layers,
  Sparkles,
  MessageCircle,
  X,
  Check,
  LayoutGrid,
  List
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPackagesPage() {
  const { packages, addPackage, updatePackage, deletePackage, togglePackagePopular } = useDataStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);

  // Form State matching PackageTier interface
  const [formData, setFormData] = useState<{
    tier_name: string;
    tier_name_en: string;
    monthly_price: number;
    quarterly_price: number;
    description: string;
    features: string[];
    popular: boolean;
    whatsapp_message: string;
  }>({
    tier_name: '',
    tier_name_en: '',
    monthly_price: 2500,
    quarterly_price: 2125,
    description: '',
    features: [
      'إدارة وتوزيع ميزانية الحملات على Meta و TikTok',
      'بناء معمارية تتبع خادمي CAPI مباشرة',
      'تقرير أداء وتحليلات لحظية أسبوعية'
    ],
    popular: false,
    whatsapp_message: 'مرحباً، أود الاشتراك في هذه الباقة لبدء النمو.'
  });

  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingPackageId(null);
    setFormData({
      tier_name: '',
      tier_name_en: '',
      monthly_price: 2499,
      quarterly_price: 2124,
      description: 'للمتاجر والعلامات التجارية الطامحة للتوسع السريع ومضاعفة العائد.',
      features: [
        'إدارة وتوزيع ميزانية الحملات الإعلانية على Meta و TikTok',
        'تأسيس وتفعيل بنية CAPI لضمان استرجاع 96% من بيانات الشراء',
        'إنتاج 4 زوايا إعلانية مصممة ومختبرة شهرياً',
        'تقرير أداء لحظي ودعم فني مخصص عبر Telegram/Slack'
      ],
      popular: false,
      whatsapp_message: 'مرحباً، أود الاستفسار عن تفاصيل الباقة الجديدة وبدء التجهيز.'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pkg: PackageTier) => {
    setEditingPackageId(pkg.id);
    setFormData({
      tier_name: pkg.tier_name,
      tier_name_en: pkg.tier_name_en || '',
      monthly_price: pkg.monthly_price,
      quarterly_price: pkg.quarterly_price,
      description: pkg.description,
      features: [...pkg.features],
      popular: !!pkg.popular,
      whatsapp_message: pkg.whatsapp_message
    });
    setIsModalOpen(true);
  };

  const handleDuplicate = (pkg: PackageTier) => {
    addPackage({
      tier_name: `${pkg.tier_name} (نسخة معدلة)`,
      tier_name_en: `${pkg.tier_name_en || 'Custom'} Copy`,
      monthly_price: pkg.monthly_price,
      quarterly_price: pkg.quarterly_price,
      description: pkg.description,
      features: [...pkg.features],
      popular: false,
      whatsapp_message: pkg.whatsapp_message
    });
    showToast(`تم استنساخ باقة "${pkg.tier_name}" بنجاح!`);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من رغبتك في حذف باقة "${name}" نهائياً من الموقع العام؟`)) {
      deletePackage(id);
      showToast(`تم حذف باقة "${name}" بنجاح.`);
    }
  };

  const handleAddFeature = () => {
    if (!newFeatureInput.trim()) return;
    setFormData({
      ...formData,
      features: [...formData.features, newFeatureInput.trim()]
    });
    setNewFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const handleCalculateDiscount = () => {
    const discounted = Math.round(formData.monthly_price * 0.85);
    setFormData({ ...formData, quarterly_price: discounted });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tier_name) return;

    if (editingPackageId) {
      updatePackage(editingPackageId, formData);
      showToast(`تم تحديث باقة "${formData.tier_name}" بنجاح!`);
    } else {
      addPackage(formData);
      showToast(`تم إنشاء باقة "${formData.tier_name}" ونشرها فوراً على الموقع العام!`);
    }
    setIsModalOpen(false);
  };

  const filteredPackages = packages.filter((p) => {
    const matchesSearch =
      p.tier_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const avgPrice = Math.round(
    packages.reduce((acc, p) => acc + p.monthly_price, 0) / (packages.length || 1)
  );

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="إدارة وباقات الأسعار (Packages CMS)"
        subtitle="إنشاء، تعديل، حذف وتفعيل باقات النمو وتحديد المزايا والأسعار المعروضة في صفحة /packages"
      />

      <main className="p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-between text-xs font-bold animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <span className="font-mono">LIVE SYNC 100%</span>
          </div>
        )}

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-on-surface-variant font-bold">TOTAL TIERS</span>
            <div className="mt-3">
              <div className="text-2xl font-bold font-mono text-text-primary">
                {packages.length} باقات
              </div>
              <span className="text-xs text-on-surface-variant">جاهزة للطلب المباشر</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-primary font-bold">FEATURED TIERS</span>
            <div className="mt-3">
              <div className="text-2xl font-bold font-mono text-primary">
                {packages.filter((p) => p.popular).length} باقة
              </div>
              <span className="text-xs text-on-surface-variant">تحمل شارة الأكثر طلباً</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-secondary font-bold">AVG MONTHLY PRICE</span>
            <div className="mt-3">
              <div className="text-2xl font-bold font-mono text-secondary" dir="ltr">
                ${avgPrice.toLocaleString()}
              </div>
              <span className="text-xs text-on-surface-variant">متوسط سعر الباقات الشهري</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold">PUBLIC ROUTE</span>
            <div className="mt-3">
              <Link
                href="/packages"
                target="_blank"
                className="text-sm font-bold text-emerald-400 hover:underline flex items-center gap-1.5"
              >
                <span>معاينة صفحة /packages</span>
                <span className="font-mono text-xs">↗</span>
              </Link>
              <span className="text-[11px] text-on-surface-variant">مزامنة لحظية مع الزوار</span>
            </div>
          </div>
        </div>

        {/* Toolbar & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low p-4 rounded-2xl border border-white/5 shadow-lg">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-outline absolute right-3 top-3" />
              <input
                type="text"
                placeholder="بحث باسم الباقة أو الوصف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface-container pr-9 pl-4 py-2.5 rounded-xl text-xs text-on-surface border border-white/5 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-surface-container rounded-xl p-1 border border-white/5">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:text-white'
                }`}
                title="عرض الشبكة (Grid)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:text-white'
                }`}
                title="عرض الجدول (Table)"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleOpenAdd}
              type="button"
              className="px-5 py-2.5 rounded-xl bg-primary-container hover:bg-[#e60036] text-white text-xs font-bold shadow-lg shadow-glow-crimson transition-all flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء باقة جديدة</span>
            </button>
          </div>
        </div>

        {/* View Mode: Cards Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-3xl bg-surface-container-low border p-6 flex flex-col justify-between shadow-xl transition-all relative group ${
                  pkg.popular
                    ? 'border-primary/50 shadow-glow-crimson/15'
                    : 'border-white/5 hover:border-white/20'
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary-container text-white text-[10px] font-bold font-mono flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    <span>الأكثر طلباً</span>
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex flex-col">
                      <h3 className="font-bold text-base text-text-primary">{pkg.tier_name}</h3>
                      <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">
                        {pkg.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePackagePopular(pkg.id)}
                      className={`p-2 rounded-xl border transition-colors shrink-0 ${
                        pkg.popular
                          ? 'bg-primary/20 text-primary border-primary/40'
                          : 'bg-surface-container text-on-surface-variant border-white/5 hover:text-white'
                      }`}
                      title={pkg.popular ? 'إلغاء تمييز الباقة' : 'تمييز كباقة رئيسية'}
                    >
                      <Star className={`w-4 h-4 ${pkg.popular ? 'fill-primary' : ''}`} />
                    </button>
                  </div>

                  {/* Pricing Badges */}
                  <div className="p-4 rounded-2xl bg-surface-container/70 border border-white/5 mb-6 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant font-medium">الاشتراك الشهري:</span>
                      <span className="text-xl font-bold font-mono text-primary" dir="ltr">
                        ${pkg.monthly_price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-on-surface-variant font-medium">الربع سنوي (-15%):</span>
                      <span className="text-sm font-bold font-mono text-secondary" dir="ltr">
                        ${pkg.quarterly_price.toLocaleString()}/mo
                      </span>
                    </div>
                  </div>

                  {/* Features Bullet Points */}
                  <div className="flex flex-col gap-2 mb-6">
                    <span className="text-[11px] font-bold text-text-primary">
                      المزايا المتضمنة ({pkg.features.length}):
                    </span>
                    <ul className="flex flex-col gap-2">
                      {pkg.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-on-surface-variant">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(pkg)}
                      className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-white/5 text-xs text-text-primary font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-primary" />
                      <span>تعديل</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicate(pkg)}
                      className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-white/5 text-on-surface-variant hover:text-white transition-colors"
                      title="استنساخ الباقة"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(pkg.id, pkg.tier_name)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                    title="حذف الباقة"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* View Mode: Data Table */
          <div className="rounded-3xl bg-surface-container-low border border-white/5 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-surface-container border-b border-white/5 text-on-surface-variant font-mono uppercase">
                    <th className="p-4">اسم الباقة</th>
                    <th className="p-4">الوصف</th>
                    <th className="p-4">السعر الشهري</th>
                    <th className="p-4">السعر الربع سنوي</th>
                    <th className="p-4">عدد المزايا</th>
                    <th className="p-4">الشارة</th>
                    <th className="p-4 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredPackages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-surface-container/50 transition-colors">
                      <td className="p-4 font-bold text-text-primary">{pkg.tier_name}</td>
                      <td className="p-4 text-on-surface-variant max-w-xs truncate">{pkg.description}</td>
                      <td className="p-4 font-mono font-bold text-primary" dir="ltr">
                        ${pkg.monthly_price.toLocaleString()}
                      </td>
                      <td className="p-4 font-mono text-secondary" dir="ltr">
                        ${pkg.quarterly_price.toLocaleString()}
                      </td>
                      <td className="p-4 font-mono">{pkg.features.length} مزايا</td>
                      <td className="p-4">
                        {pkg.popular ? (
                          <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary font-bold text-[10px]">
                            الأكثر طلباً
                          </span>
                        ) : (
                          <span className="text-on-surface-variant text-[11px]">قياسي</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(pkg)}
                            className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary"
                            title="تعديل"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicate(pkg)}
                            className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
                            title="استنساخ"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(pkg.id, pkg.tier_name)}
                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                            title="حذف"
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
        )}
      </main>

      {/* ADD / EDIT PACKAGE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-surface-container-low border border-primary/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 left-6 p-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Package className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-lg text-text-primary">
                  {editingPackageId ? 'تعديل بيانات الباقة' : 'إنشاء باقة نمو جديدة'}
                </h3>
                <span className="text-xs text-on-surface-variant">
                  سيتم عكس التعديلات فورياً في صفحة /packages وقاعدة بيانات Supabase
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">اسم الباقة بالعربية *</label>
                  <input
                    type="text"
                    required
                    value={formData.tier_name}
                    onChange={(e) => setFormData({ ...formData, tier_name: e.target.value })}
                    placeholder="مثال: باقة التوسع الفائق (Enterprise Scale)"
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary">اسم الباقة بالإنجليزية</label>
                  <input
                    type="text"
                    value={formData.tier_name_en}
                    onChange={(e) => setFormData({ ...formData, tier_name_en: e.target.value })}
                    placeholder="مثال: Enterprise Scale"
                    className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary font-mono focus:outline-none focus:border-primary text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-primary">وصف الباقة والجمهور المستهدف *</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="مثال: للمتاجر الكبرى والشركات الراغبة في السيطرة الإعلانية"
                  className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-surface-container/60 border border-white/5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-primary flex items-center justify-between">
                    <span>السعر الشهري ($) *</span>
                    <span className="text-[10px] text-primary font-mono">MONTHLY</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.monthly_price}
                    onChange={(e) => setFormData({ ...formData, monthly_price: Number(e.target.value) })}
                    className="px-4 py-2.5 rounded-xl bg-surface-container-high border border-white/5 text-xs text-text-primary font-mono focus:outline-none focus:border-primary text-left"
                    dir="ltr"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-text-primary">السعر الربع سنوي ($/شهر) *</label>
                    <button
                      type="button"
                      onClick={handleCalculateDiscount}
                      className="text-[10px] text-secondary hover:underline font-mono"
                    >
                      [خصم 15% تلقائي]
                    </button>
                  </div>
                  <input
                    type="number"
                    required
                    value={formData.quarterly_price}
                    onChange={(e) => setFormData({ ...formData, quarterly_price: Number(e.target.value) })}
                    className="px-4 py-2.5 rounded-xl bg-surface-container-high border border-white/5 text-xs text-text-primary font-mono focus:outline-none focus:border-primary text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Popular Checkbox */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container border border-white/5">
                <input
                  type="checkbox"
                  id="popular"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="w-4 h-4 rounded text-primary accent-primary-container cursor-pointer"
                />
                <label htmlFor="popular" className="text-xs font-bold text-text-primary cursor-pointer">
                  تمييز كباقة موصى بها مع شارة &quot;الأكثر طلباً&quot; (Featured Tier)
                </label>
              </div>

              {/* Features List Builder */}
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container/60 border border-white/5">
                <label className="text-xs font-bold text-text-primary flex items-center justify-between">
                  <span>مزايا ومخرجات الباقة (Features):</span>
                  <span className="text-[10px] text-on-surface-variant font-mono">
                    {formData.features.length} عناصر
                  </span>
                </label>

                {/* Add new feature input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newFeatureInput}
                    onChange={(e) => setNewFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    placeholder="اكتب ميزة جديدة واضغط إضافة..."
                    className="flex-1 px-4 py-2 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 rounded-xl bg-primary/20 text-primary hover:bg-primary hover:text-white text-xs font-bold transition-colors shrink-0"
                  >
                    إضافة
                  </button>
                </div>

                {/* List */}
                <div className="flex flex-col gap-1.5 mt-2 max-h-40 overflow-y-auto no-scrollbar">
                  {formData.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-surface-container text-xs text-on-surface-variant border border-white/5"
                    >
                      <span className="flex-1 truncate">{feature}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="حذف الميزة"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp Message Template */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-primary">
                  رسالة الواتساب المجهزة مسبقاً عند النقر:
                </label>
                <input
                  type="text"
                  value={formData.whatsapp_message}
                  onChange={(e) => setFormData({ ...formData, whatsapp_message: e.target.value })}
                  placeholder="مرحباً، أود الاشتراك في باقة..."
                  className="px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-xs text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              {/* Form Actions */}
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
                  <span>{editingPackageId ? 'حفظ التعديلات' : 'إنشاء ونشر الباقة'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
