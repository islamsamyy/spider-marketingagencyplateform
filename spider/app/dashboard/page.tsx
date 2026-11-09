'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Counter from '../../components/Counter';

interface Deal {
  id: string;
  client: string;
  city: string;
  contactName: string;
  phone: string;
  service: string;
  serviceType: 'media_buying' | 'web_engineering' | 'creative_content' | 'full_suite';
  budget: string;
  tgStatus: string;
  waStatus: string;
  stage: 'pending' | 'contacted' | 'vip' | 'closed';
  stageLabel: string;
  stageClass: string;
  icon: string;
  iconColor: string;
  notes: string;
}

export default function DashboardPage() {
  const [filterStage, setFilterStage] = useState<'all' | 'pending' | 'contacted' | 'vip' | 'closed'>('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [testPingSuccess, setTestPingSuccess] = useState(false);
  const [alertReplayedId, setAlertReplayedId] = useState<string | null>(null);

  const [deals, setDeals] = useState<Deal[]>([
    {
      id: 'BS-8921',
      client: 'مجموعة الزمرد للتجارة الفاخرة',
      city: 'الرياض',
      contactName: 'عبد الله السبيعي',
      phone: '+966 50 123 4567',
      service: 'حملات إعلانية موسعة (Snap/Meta Scale)',
      serviceType: 'media_buying',
      budget: '$45,000 / Mo',
      tgStatus: 'TG ✓ 10:14',
      waStatus: 'WA ✓ 10:14',
      stage: 'vip',
      stageLabel: 'أولوية قصوى (VIP)',
      stageClass: 'bg-primary-container/20 text-primary border border-primary/30',
      icon: 'diamond',
      iconColor: 'text-primary',
      notes: 'عميل مجوهرات وعطور فاخرة يستهدف رفع مبيعات موسم الأعياد بميزانية قابلة للمضاعفة.'
    },
    {
      id: 'BS-8922',
      client: 'متجر نكست فيجن للإلكترونيات',
      city: 'دبي',
      contactName: 'د. عمر كمال',
      phone: '+971 50 882 1928',
      service: 'بناء نظام أتمتة ولاء ونظام دفع وسرعة متجر',
      serviceType: 'web_engineering',
      budget: '$28,000 Setup',
      tgStatus: 'TG ✓ 09:42',
      waStatus: 'WA ✓ 09:42',
      stage: 'contacted',
      stageLabel: 'تم التواصل الأولي',
      stageClass: 'bg-surface-container-high text-on-surface border border-white/10',
      icon: 'shopping_bag',
      iconColor: 'text-tertiary',
      notes: 'توسعة معمارية لمتجر شوبيفاي مع واجهة Next.js مخصصة لتقليل زمن الاستجابة إلى أقل من 50ms.'
    },
    {
      id: 'BS-8923',
      client: 'أركان كابيتال العقارية',
      city: 'الكويت',
      contactName: 'فيصل المطيري',
      phone: '+965 99 341 872',
      service: 'إطلاق حملات Google Search + Funnels للمستثمرين',
      serviceType: 'media_buying',
      budget: '$60,000 / Mo',
      tgStatus: 'TG ✓ 08:15',
      waStatus: 'WA ⌛ جاري التأكيد',
      stage: 'pending',
      stageLabel: 'بانتظار المراجعة الفنية',
      stageClass: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      icon: 'apartment',
      iconColor: 'text-primary-container',
      notes: 'مشروع أبراج سكنية راقية في حولي، بحاجة إلى تصفية دقيقة للمشترين المؤهلين (Qualified Leads).'
    },
    {
      id: 'BS-8924',
      client: 'منصة سيناريو للذكاء الاصطناعي',
      city: 'جدة',
      contactName: 'م. رزان الباشا',
      phone: '+966 55 987 6543',
      service: 'Growth Engine & Microservices Architecture',
      serviceType: 'full_suite',
      budget: '$52,000 Fixed',
      tgStatus: 'TG ✓ أمس',
      waStatus: 'WA ✓ أمس',
      stage: 'closed',
      stageLabel: 'تم التعاقد والبدء',
      stageClass: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold',
      icon: 'terminal',
      iconColor: 'text-secondary-fixed',
      notes: 'تم توقيع العقد السنوي وبدء مرحلة الهندسة العكسية وتدشين واجهات المستخدم التفاعلية.'
    },
    {
      id: 'BS-8925',
      client: 'سلسلة مقاهي إكسير القهوة',
      city: 'الدمام',
      contactName: 'بدر الزهراني',
      phone: '+966 54 221 9901',
      service: 'إنتاج محتوى UGC إبداعي وحملات تيك توك سريعة',
      serviceType: 'creative_content',
      budget: '$18,500 / Mo',
      tgStatus: 'TG ✓ 11:30',
      waStatus: 'WA ✓ 11:30',
      stage: 'contacted',
      stageLabel: 'تم إرسال العرض المالي',
      stageClass: 'bg-surface-container-high text-on-surface border border-white/10',
      icon: 'auto_videocam',
      iconColor: 'text-tertiary',
      notes: 'إنتاج 16 مقطع فيديو قصير شهرياً مع إدارة حملات الاستهداف الجغرافي لفروع المنطقة الشرقية.'
    }
  ]);

  const handleTestPing = () => {
    setTestPingSuccess(true);
    setTimeout(() => setTestPingSuccess(false), 3000);
  };

  const handleReplayAlert = (id: string) => {
    setAlertReplayedId(id);
    setTimeout(() => setAlertReplayedId(null), 2500);
  };

  const filteredDeals = deals.filter((d) => {
    const matchesStage = filterStage === 'all' || d.stage === filterStage;
    const matchesCategory =
      filterCategory === 'all' || d.serviceType === filterCategory;
    const matchesSearch =
      d.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStage && matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen relative flex flex-col selection:bg-primary-container selection:text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(#442226_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <Navbar activeTab="dashboard" />

      <main className="relative z-10 w-full pt-28 pb-16 px-gutter max-w-7xl mx-auto flex-1 flex flex-col gap-space-xl">
        {/* Top Header & Telemetry Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-lg border-b border-white/5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-space-xs font-label-md text-label-md text-primary font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
              <span>مركز العمليات الموحد لوكالة بلاك سبايدر (Black Spider Hub)</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight font-bold">
              لوحة الإدارة المتكاملة والصفقات الفورية
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              مراقبة آنية لمسار الصفقات الجديدة، أداء الميزانيات المدارة، وحالة تنبيهات الـ Webhook المباشرة مع WhatsApp و Telegram.
            </p>
          </div>

          <div className="flex items-center gap-space-sm shrink-0">
            <button
              onClick={handleTestPing}
              className="px-space-md py-2.5 rounded-xl bg-surface-container-high border border-primary/30 text-primary hover:bg-surface-container-highest transition-all flex items-center gap-space-xs font-label-md font-semibold shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">cell_tower</span>
              <span>اختبار نبض الـ Webhook</span>
            </button>
            <div className="flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-surface-container-low border border-white/5 text-label-sm font-label-code">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-on-surface-variant">TELEMETRY:</span>
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Test Ping Alert Banner */}
        {testPingSuccess && (
          <div className="p-4 rounded-xl bg-primary-container/20 border border-primary/40 text-primary flex items-center justify-between shadow-lg shadow-glow-crimson/20 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">verified</span>
              <span className="font-label-lg font-bold">
                تم إرسال إشارة الـ Webhook بنجاح! تلقت خوادم Telegram و WhatsApp التنبيه اللحظي دون أي تأخير.
              </span>
            </div>
            <span className="font-mono text-xs text-on-surface-variant">HTTP 200 OK (28ms)</span>
          </div>
        )}

        {/* 5 KPI Top Cards (Stitch Match) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
          {/* Card 1: NEW PIPELINE */}
          <div className="relative p-5 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-lg overflow-hidden group border border-white/5 hover:border-primary/30 transition-all">
            <div className="absolute top-0 right-0 w-16 h-1 bg-primary-container"></div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-code text-label-code uppercase tracking-wider text-xs font-bold">
                NEW PIPELINE
              </span>
              <span className="p-2 rounded-lg bg-surface-container text-primary material-symbols-outlined text-[20px]">
                filter_alt
              </span>
            </div>
            <div className="mt-4">
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface" dir="ltr">
                <Counter end={148} />
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-primary font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>+28.4%</span>
                <span className="text-on-surface-variant font-body-sm">هذا الشهر</span>
              </div>
            </div>
            <div className="mt-3 w-full bg-surface-container rounded-full h-1">
              <div className="bg-primary-container h-1 rounded-full w-3/4"></div>
            </div>
          </div>

          {/* Card 2: PIPELINE VALUE */}
          <div className="relative p-5 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-lg overflow-hidden group border border-white/5 hover:border-tertiary/30 transition-all">
            <div className="absolute top-0 right-0 w-16 h-1 bg-tertiary"></div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-code text-label-code uppercase tracking-wider text-xs font-bold">
                PIPELINE VALUE
              </span>
              <span className="p-2 rounded-lg bg-surface-container text-tertiary material-symbols-outlined text-[20px]">
                monetization_on
              </span>
            </div>
            <div className="mt-4">
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface" dir="ltr">
                <Counter end={384500} prefix="$" />
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-tertiary font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>صفقات مؤكدة بنسبة 82%</span>
              </div>
            </div>
            <div className="mt-3 w-full bg-surface-container rounded-full h-1">
              <div className="bg-tertiary h-1 rounded-full w-4/5"></div>
            </div>
          </div>

          {/* Card 3: MANAGED AD SPEND */}
          <div className="relative p-5 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-lg overflow-hidden group border border-white/5 hover:border-secondary/30 transition-all">
            <div className="absolute top-0 right-0 w-16 h-1 bg-secondary-container"></div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-code text-label-code uppercase tracking-wider text-xs font-bold">
                MANAGED AD SPEND
              </span>
              <span className="p-2 rounded-lg bg-surface-container text-secondary material-symbols-outlined text-[20px]">
                campaign
              </span>
            </div>
            <div className="mt-4">
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface" dir="ltr">
                <Counter end={1.42} prefix="$" suffix="M" decimals={2} />
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary">ads_click</span>
                <span>Meta • TikTok • Google</span>
              </div>
            </div>
            <div className="mt-3 w-full bg-surface-container rounded-full h-1">
              <div className="bg-secondary-container h-1 rounded-full w-2/3"></div>
            </div>
          </div>

          {/* Card 4: BLENDED ROAS */}
          <div className="relative p-5 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-lg overflow-hidden group border border-white/5 hover:border-primary/30 transition-all">
            <div className="absolute top-0 right-0 w-16 h-1 bg-primary"></div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-code text-label-code uppercase tracking-wider text-xs font-bold">
                BLENDED ROAS
              </span>
              <span className="p-2 rounded-lg bg-surface-container text-primary material-symbols-outlined text-[20px]">
                auto_graph
              </span>
            </div>
            <div className="mt-4">
              <div className="font-headline-lg text-headline-lg font-bold text-primary" dir="ltr">
                <Counter end={4.9} suffix="x" decimals={1} />
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-primary-fixed-dim font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[16px]">stars</span>
                <span>عائد الاستثمار المباشر</span>
              </div>
            </div>
            <div className="mt-3 w-full bg-surface-container rounded-full h-1">
              <div className="bg-primary h-1 rounded-full w-11/12"></div>
            </div>
          </div>

          {/* Card 5: ALERT DISPATCH */}
          <div className="relative p-5 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-lg overflow-hidden group border border-white/5 hover:border-primary-container/40 transition-all">
            <div className="absolute top-0 right-0 w-16 h-1 bg-primary-container"></div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-code text-label-code uppercase tracking-wider text-xs font-bold">
                ALERT DISPATCH
              </span>
              <span className="p-2 rounded-lg bg-surface-container text-primary material-symbols-outlined text-[20px]">
                notifications_active
              </span>
            </div>
            <div className="mt-4">
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface" dir="ltr">
                <Counter end={99.8} suffix="%" decimals={1} />
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-primary font-body-sm text-body-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>
                <span>صفر تأخير في التسليم</span>
              </div>
            </div>
            <div className="mt-3 w-full bg-surface-container rounded-full h-1">
              <div className="bg-primary-container h-1 rounded-full w-full"></div>
            </div>
          </div>
        </div>

        {/* 12-Column Grid: Deals Table (8 Cols) + Operations & Telemetry Panel (4 Cols) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Main Deals Table (8 cols) */}
          <div className="xl:col-span-8 flex flex-col gap-6">
            <div className="p-6 rounded-xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">radar</span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      تدفق الصفقات المباشر (Live Deals Grid)
                    </h2>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    مزامنة فورية لكل طلب استشارة أو نمو يتم إرساله للوكالة مع إشعارات آلية.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-code text-label-code text-on-surface-variant px-3 py-1.5 rounded-md bg-surface-container flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    مُحدث قبل 4 ثوانٍ
                  </span>
                </div>
              </div>

              {/* Filters and Search Bar */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5 bg-surface-container p-1 rounded-lg">
                  <button
                    onClick={() => setFilterStage('all')}
                    className={`px-3 py-1.5 rounded-md font-label-code text-label-code transition-all ${
                      filterStage === 'all'
                        ? 'bg-primary-container text-on-primary font-bold shadow-md shadow-glow-crimson/30'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    الكل (148)
                  </button>
                  <button
                    onClick={() => setFilterStage('pending')}
                    className={`px-3 py-1.5 rounded-md font-label-code text-label-code transition-all ${
                      filterStage === 'pending'
                        ? 'bg-primary-container text-on-primary font-bold shadow-md shadow-glow-crimson/30'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    بانتظار المراجعة (12)
                  </button>
                  <button
                    onClick={() => setFilterStage('contacted')}
                    className={`px-3 py-1.5 rounded-md font-label-code text-label-code transition-all ${
                      filterStage === 'contacted'
                        ? 'bg-primary-container text-on-primary font-bold shadow-md shadow-glow-crimson/30'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    تم التواصل (45)
                  </button>
                  <button
                    onClick={() => setFilterStage('vip')}
                    className={`px-3 py-1.5 rounded-md font-label-code text-label-code transition-all ${
                      filterStage === 'vip'
                        ? 'bg-primary-container text-on-primary font-bold shadow-md shadow-glow-crimson/30'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    أولوية VIP (8)
                  </button>
                  <button
                    onClick={() => setFilterStage('closed')}
                    className={`px-3 py-1.5 rounded-md font-label-code text-label-code transition-all ${
                      filterStage === 'closed'
                        ? 'bg-primary-container text-on-primary font-bold shadow-md shadow-glow-crimson/30'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    تم التعاقد (83)
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative flex-1 md:w-64">
                    <span className="material-symbols-outlined text-outline absolute right-3 top-2.5 text-[18px]">
                      search
                    </span>
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="بحث باسم العميل أو الشركة..."
                      className="w-full bg-surface-container pr-9 pl-4 py-2 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary-container border border-white/5"
                      type="text"
                    />
                  </div>

                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-surface-container text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary-container cursor-pointer"
                  >
                    <option value="all">جميع الخدمات</option>
                    <option value="media_buying">Media Buying & Scaling</option>
                    <option value="web_engineering">Custom SaaS & Web</option>
                    <option value="creative_content">Creative & UGC Ops</option>
                    <option value="full_suite">Full Growth Architecture</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="text-on-surface-variant font-label-code text-label-code border-b border-surface-container-high/40 pb-3 text-xs">
                      <th className="py-3 px-3">العميل والمشروع</th>
                      <th className="py-3 px-3">الخدمة والميزانية</th>
                      <th className="py-3 px-3">تنبيهات المنظومة</th>
                      <th className="py-3 px-3">المرحلة الحالية</th>
                      <th className="py-3 px-3 text-left">الإجراء السريع</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high/30 font-body-md text-body-md">
                    {filteredDeals.map((deal) => (
                      <tr key={deal.id} className="hover:bg-surface-container/60 transition-colors group">
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center font-bold shrink-0">
                              <span className={`material-symbols-outlined text-[20px] ${deal.iconColor}`}>
                                {deal.icon}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-title-md text-body-md font-bold text-on-surface">
                                {deal.client}
                              </span>
                              <span className="font-label-code text-label-code text-on-surface-variant text-xs">
                                {deal.city} • {deal.contactName}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-3">
                          <div className="flex flex-col">
                            <span className="text-on-surface font-medium text-sm">
                              {deal.service}
                            </span>
                            <span className="font-label-code text-label-code text-primary font-bold text-xs" dir="ltr">
                              {deal.budget}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-surface-container font-label-code text-label-code text-primary flex items-center gap-1 shadow-sm text-xs">
                              <span className="material-symbols-outlined text-[13px]">send</span>
                              {deal.tgStatus}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-surface-container font-label-code text-label-code text-secondary flex items-center gap-1 shadow-sm text-xs">
                              <span className="material-symbols-outlined text-[13px]">forum</span>
                              {deal.waStatus}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-3">
                          <span className={`px-2.5 py-1 rounded-full font-label-pill text-label-pill uppercase text-xs inline-block ${deal.stageClass}`}>
                            {deal.stageLabel}
                          </span>
                        </td>

                        <td className="py-4 px-3 text-left">
                          <div className="flex items-center justify-end gap-2">
                            {/* WhatsApp link */}
                            <a
                              href={`https://wa.me/${deal.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              title="محادثة واتساب مباشرة"
                              className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-highest text-secondary transition-colors"
                            >
                              <span className="material-symbols-outlined text-[18px]">chat</span>
                            </a>

                            {/* View details */}
                            <button
                              onClick={() => setSelectedDeal(deal)}
                              className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface transition-colors"
                              title="عرض التفاصيل الكاملة"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">visibility</span>
                            </button>

                            {/* Replay notification */}
                            <button
                              onClick={() => handleReplayAlert(deal.id)}
                              className={`p-2 rounded-lg bg-surface-container hover:bg-surface-container-highest transition-colors ${
                                alertReplayedId === deal.id ? 'text-emerald-400' : 'text-primary'
                              }`}
                              title="إعادة إرسال الإشعار"
                              type="button"
                            >
                              <span className={`material-symbols-outlined text-[18px] ${alertReplayedId === deal.id ? 'animate-spin' : ''}`}>
                                replay
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-surface-container-high/30 text-on-surface-variant font-label-code text-label-code text-xs">
                <span>عرض {filteredDeals.length} من أصل 148 صفقة نشطة</span>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors">
                    السابق
                  </button>
                  <span className="px-2 py-1 text-primary font-bold">1</span>
                  <button className="px-3 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors">
                    التالي
                  </button>
                </div>
              </div>
            </div>

            {/* Platform & Budget Distribution Card */}
            <div className="p-6 rounded-xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">pie_chart</span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">
                    توزيع مصادر الصفقات وميزانيات المنصات
                  </h3>
                </div>
                <span className="font-label-code text-label-code text-on-surface-variant text-xs">
                  الربع المالي الحالي (Q3)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-surface-container border border-white/5">
                  <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-surface-container-high"
                      cx="50"
                      cy="50"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="12"
                    ></circle>
                    <circle
                      className="text-primary-container"
                      cx="50"
                      cy="50"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      strokeDasharray="251.2"
                      strokeDashoffset="95"
                      strokeWidth="12"
                    ></circle>
                    <circle
                      className="text-tertiary"
                      cx="50"
                      cy="50"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      strokeDasharray="251.2"
                      strokeDashoffset="173"
                      strokeWidth="12"
                    ></circle>
                  </svg>
                  <div className="mt-3 text-center">
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">62%</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Media Buying dominance</p>
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                      <span className="font-body-sm text-body-sm text-on-surface">
                        حملات سناب شات وإنستغرام وتيك توك
                      </span>
                    </div>
                    <span className="font-label-code text-label-code text-primary font-bold text-xs" dir="ltr">
                      62% ($238,390)
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                      <span className="font-body-sm text-body-sm text-on-surface">
                        هندسة المنصات والمتاجر البرمجية (Next.js)
                      </span>
                    </div>
                    <span className="font-label-code text-label-code text-tertiary font-bold text-xs" dir="ltr">
                      31% ($119,195)
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-secondary"></span>
                      <span className="font-body-sm text-body-sm text-on-surface">
                        حملات Google Search وأتمتة الـ Funnels
                      </span>
                    </div>
                    <span className="font-label-code text-label-code text-secondary font-bold text-xs" dir="ltr">
                      15% ($57,675)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Real-time Operations & Webhook Telemetry (4 cols) */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            {/* Instant Notification Channels */}
            <div className="p-6 rounded-xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col gap-5 relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-primary-container/10 blur-2xl"></div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">sensors</span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">
                    قنوات التنبيه الفورية المربوطة
                  </h3>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="p-3.5 rounded-lg bg-surface-container flex flex-col gap-2 shadow-sm border border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-surface-container-high text-primary flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                      </div>
                      <span className="font-body-md text-body-md font-semibold text-on-surface">
                        بوت العمليات المركزي
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-pill text-label-pill text-xs">
                      LIVE 24/7
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-label-code text-label-code text-on-surface-variant text-xs">
                    <span>المعرف: @BlackSpiderOpsBot</span>
                    <span className="text-primary font-bold">12 إشعار اليوم</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-surface-container flex flex-col gap-2 shadow-sm border border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-surface-container-high text-tertiary flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-[16px]">groups</span>
                      </div>
                      <span className="font-body-md text-body-md font-semibold text-on-surface">
                        قروب التنفيذيين (VIP Desk)
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-tertiary font-label-pill text-label-pill text-xs">
                      VIP ONLY
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-label-code text-label-code text-on-surface-variant text-xs">
                    <span>القناة: Black Spider Executive Club</span>
                    <span className="text-emerald-400 font-bold">نشطة ✓</span>
                  </div>
                </div>
              </div>

              {/* Verified WhatsApp Account Executives */}
              <div className="pt-2 border-t border-surface-container-high/30">
                <span className="font-label-code text-label-code text-on-surface-variant uppercase tracking-wider block mb-3 text-xs">
                  مسؤولو المبيعات المعتمدون (واتساب)
                </span>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[18px]">support_agent</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-body-md text-body-md text-on-surface font-medium text-sm">
                          سلطان الشمري
                        </span>
                        <span className="font-label-code text-label-code text-on-surface-variant text-xs" dir="ltr">
                          +966 50 123 4567
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-code text-label-code text-xs">
                      كافة الصفقات
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[18px]">code</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-body-md text-body-md text-on-surface font-medium text-sm">
                          م. أحمد كمال الدين
                        </span>
                        <span className="font-label-code text-label-code text-on-surface-variant text-xs" dir="ltr">
                          +966 55 987 6543
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-surface-container-high text-secondary font-label-code text-label-code text-xs">
                      استشارات التقنية
                    </span>
                  </div>
                </div>
              </div>

              {/* Heartbeat Status Box */}
              <div className="p-3.5 rounded-lg bg-surface-container flex flex-col gap-2 border border-white/5">
                <div className="flex items-center justify-between text-xs font-label-code">
                  <span className="text-on-surface-variant">فحص سلامة النبض (Heartbeat)</span>
                  <span className="text-primary font-bold">200 OK</span>
                </div>
                <div className="flex items-center justify-between text-xs font-label-code">
                  <span className="text-on-surface-variant">معدل التأخير عبر CAPI</span>
                  <span className="text-emerald-400 font-bold">14ms (Optimal)</span>
                </div>
              </div>
            </div>

            {/* Quick System Telemetry Log */}
            <div className="p-6 rounded-xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-label-code text-label-code uppercase tracking-wider text-xs text-primary font-bold">
                  سجل الأحداث البرمجية اللحظي
                </span>
                <span className="text-xs font-mono text-outline">STREAMING</span>
              </div>
              <div className="flex flex-col gap-2 font-mono text-xs text-on-surface-variant">
                <div className="p-2 rounded bg-surface-container/60 border border-white/5 flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0">15:19:04</span>
                  <span>[TG_BOT] Payload dispatched for Deal BS-8921 to executive channel.</span>
                </div>
                <div className="p-2 rounded bg-surface-container/60 border border-white/5 flex items-start gap-2">
                  <span className="text-primary shrink-0">15:18:22</span>
                  <span>[CAPI] High-value event fired from Riyadh node (ROAS tracked 5.2x).</span>
                </div>
                <div className="p-2 rounded bg-surface-container/60 border border-white/5 flex items-start gap-2">
                  <span className="text-secondary shrink-0">15:16:48</span>
                  <span>[WEBHOOK] WhatsApp Cloud API message sent to client (+966501234567).</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: View Deal Details */}
        {selectedDeal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-2xl bg-surface-container-low border border-primary/40 p-6 flex flex-col gap-4 shadow-2xl shadow-glow-crimson/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined ${selectedDeal.iconColor}`}>
                    {selectedDeal.icon}
                  </span>
                  <h3 className="font-headline-sm font-bold text-on-surface">
                    تفاصيل الصفقة: {selectedDeal.id}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDeal(null)}
                  className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-white"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-3 font-body-sm text-body-sm">
                <div className="flex justify-between p-2 rounded bg-surface-container">
                  <span className="text-on-surface-variant">اسم العميل:</span>
                  <span className="font-bold text-on-surface">{selectedDeal.client}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-surface-container">
                  <span className="text-on-surface-variant">المدينة / الدولة:</span>
                  <span className="text-on-surface">{selectedDeal.city}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-surface-container">
                  <span className="text-on-surface-variant">جهة الاتصال:</span>
                  <span className="text-on-surface">{selectedDeal.contactName} ({selectedDeal.phone})</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-surface-container">
                  <span className="text-on-surface-variant">الخدمة المطلوبة:</span>
                  <span className="text-primary font-semibold">{selectedDeal.service}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-surface-container">
                  <span className="text-on-surface-variant">الميزانية المقررة:</span>
                  <span className="font-mono text-emerald-400 font-bold" dir="ltr">{selectedDeal.budget}</span>
                </div>
                <div className="p-3 rounded bg-surface-container flex flex-col gap-1">
                  <span className="text-on-surface-variant font-semibold">ملاحظات التحليل الاستراتيجي:</span>
                  <p className="text-on-surface text-xs leading-relaxed">{selectedDeal.notes}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <a
                  href={`https://wa.me/${selectedDeal.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-secondary text-black font-label-md font-bold flex items-center gap-1.5 hover:bg-secondary-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>محادثة واتساب</span>
                </a>
                <button
                  onClick={() => setSelectedDeal(null)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md"
                  type="button"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
