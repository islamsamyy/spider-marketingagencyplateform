'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Counter from '../../components/Counter';
import WhatsAppFAB from '../../components/WhatsAppFAB';
import Link from 'next/link';
import { useDataStore } from '../../lib/store';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { projects } = useDataStore();

  const filterTabs = [
    { id: 'all', label: 'الكل (All Cases)' },
    { id: 'ecommerce', label: 'حملات التجارة الإلكترونية (E-Commerce ROAS)' },
    { id: 'saas', label: 'الشركات التقنية B2B (Tech & SaaS)' },
    { id: 'real_estate', label: 'العقارات والاستثمار (Real Estate)' },
    { id: 'lead_gen', label: 'تطبيقات ومطاعم (Apps & Growth)' },
  ];

  // Map store projects dynamically into portfolio cases
  const cases = projects.map((p) => ({
    id: p.id,
    category: [p.category],
    title: p.title,
    tag: p.category_label || (p.category === 'ecommerce' ? 'تجارة إلكترونية' : p.category === 'saas' ? 'منصات SaaS' : 'نمو رقمي'),
    image: p.thumbnail_url || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    roas: p.metric_badge || '+300% ROAS',
    revenue: p.metric_label || 'نمو مبيعات',
    cpa: p.timeline || (p.tags && p.tags[0]) || 'معتمد',
    description: p.description,
    progressPercent: 92,
    progressLabel: `${p.metric_badge} تحسن موثق بالأرقام`,
    location: p.client_name || 'المملكة العربية السعودية',
    icon: 'verified',
    tags: p.tags || [],
  }));

  const filteredCases = activeFilter === 'all'
    ? cases
    : cases.filter(c => c.category.includes(activeFilter as any));

  return (
    <div className="bg-surface-deep text-on-surface antialiased selection:bg-primary-container selection:text-white min-h-screen relative flex flex-col">
      {/* Cyber Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(#5f3e3e_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary-container/15 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed top-1/3 right-10 w-80 h-80 bg-[#e60039]/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-10 left-10 w-96 h-96 bg-[#ff1744]/10 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <Navbar activeTab="portfolio" />

      <main className="relative z-10 w-full pt-20 bg-transparent min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full">

          {/* HERO SECTION */}
          <section className="relative w-full px-gutter py-space-xl overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-space-lg relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
                <div className="flex flex-col gap-space-sm max-w-3xl">
                  <div className="inline-flex items-center gap-space-xs self-start px-space-md py-1.5 rounded-full bg-surface-container-high text-primary border border-primary-container/30 shadow-[0_0_12px_rgba(255,0,60,0.2)]">
                    <span className="w-2 h-2 rounded-full bg-[#ff003c] animate-pulse"></span>
                    <span className="font-label-md text-label-md tracking-wider uppercase font-semibold">
                      سجل الإنجازات والتحول الرقمي 2026
                    </span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">
                    دراسات حالة مدفوعة بالأرقام وقصص نمو حقيقية
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    اكتشف كيف ساعدنا كبرى المتاجر والشركات التقنية والخدمية في المملكة والخليج على مضاعفة مبيعاتهم وخفض تكلفة الاستحواذ عبر استراتيجيات هندسية دقيقة وتصميم تفاعلي متقدم.
                  </p>
                </div>

                {/* Key Metric Highlights Card */}
                <div className="flex flex-wrap items-center gap-space-md bg-surface-container-low border border-white/5 p-space-md rounded-xl shadow-xl shrink-0 backdrop-blur-md">
                  <div className="flex flex-col">
                    <span className="font-metric-display text-metric-display text-[#ff003c] drop-shadow-[0_0_12px_rgba(255,0,60,0.4)]">
                      <Counter end={42} suffix="M+" />
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">ريال سعودي إجمالي إيرادات العملاء</span>
                  </div>
                  <div className="w-px h-10 bg-surface-container-highest"></div>
                  <div className="flex flex-col">
                    <span className="font-metric-display text-metric-display text-[#ff1744] drop-shadow-[0_0_12px_rgba(255,23,68,0.4)]">
                      <Counter end={5.8} decimals={1} suffix="x" />
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">متوسط العائد الإعلاني الكلي (ROAS)</span>
                  </div>
                </div>
              </div>

              {/* Filter Pills Bar */}
              <div className="flex items-center gap-space-sm overflow-x-auto pb-space-xs pt-space-md">
                {filterTabs.map((tab) => {
                  const isActive = activeFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveFilter(tab.id)}
                      className={`px-space-lg py-2.5 rounded-full font-label-md text-label-md transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-[#ff003c] text-white shadow-[0_0_20px_rgba(255,0,60,0.45)] border border-[#ff003c] font-bold'
                          : 'bg-surface-container text-on-surface-variant border border-white/5 hover:text-white hover:border-[#ff003c]/40 hover:bg-surface-container-high'
                      }`}
                      type="button"
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Cases Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-xl pt-space-md">
                {filteredCases.map((c) => (
                  <article
                    key={c.id}
                    className="group flex flex-col rounded-xl bg-surface-container-low border border-white/5 shadow-xl overflow-hidden hover:border-[#ff003c]/40 hover:shadow-[0_8px_30px_rgba(255,0,60,0.15)] transition-all duration-300"
                  >
                    <div className="relative h-64 w-full overflow-hidden bg-surface-container">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={c.image}
                        alt={c.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                      <div className="absolute top-space-md right-space-md flex gap-space-xs">
                        <span className="px-space-sm py-1 rounded-full bg-surface-deep/90 backdrop-blur-md border border-[#ff003c]/30 text-primary font-label-sm text-label-sm">
                          {c.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-space-md right-space-md left-space-md flex items-center justify-between">
                        <span className="font-headline-sm text-headline-sm text-text-primary">
                          {c.title}
                        </span>
                        <span className="material-symbols-outlined text-[#ff003c] group-hover:-translate-x-1 transition-transform">
                          arrow_back
                        </span>
                      </div>
                    </div>

                    <div className="p-space-lg flex flex-col flex-1 justify-between gap-space-lg">
                      <div className="flex flex-col gap-space-md">
                        <div className="grid grid-cols-3 gap-space-xs bg-surface-container border border-white/5 p-space-sm rounded-lg">
                          <div className="flex flex-col text-center">
                            <span className="font-headline-sm text-headline-sm text-[#ff003c] font-bold">
                              {c.roas}
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">عائد الإنفاق ROAS</span>
                          </div>
                          <div className="flex flex-col text-center bg-surface-container-high/60 rounded">
                            <span className="font-headline-sm text-headline-sm text-[#ff1744] font-bold">
                              {c.revenue}
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">مبيعات / سرعة</span>
                          </div>
                          <div className="flex flex-col text-center">
                            <span className="font-headline-sm text-headline-sm text-primary font-bold">
                              {c.cpa}
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">تكلفة الطلب / تقييم</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-space-xs">
                          <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold">
                            نطاق التنفيذ والتسليم:
                          </span>
                          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                            {c.description}
                          </p>
                        </div>

                        <div className="flex flex-col gap-1.5 pt-space-xs">
                          <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
                            <span>مستوى تحسن الأداء الربحي</span>
                            <span className="text-[#ff1744] font-bold">{c.progressLabel}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-l from-[#ff003c] to-[#e60039] rounded-full shadow-[0_0_8px_rgba(255,0,60,0.6)]"
                              style={{ width: `${c.progressPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-space-md bg-surface-container-low border-t border-white/5">
                        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-[16px] text-[#ff003c]">{c.icon}</span>
                          <span>{c.location}</span>
                        </div>
                        <Link
                          href="/#growth-funnel"
                          className="inline-flex items-center gap-space-xs font-label-md text-label-md text-primary hover:text-white transition-colors"
                        >
                          <span>طلب دراسة مماثلة</span>
                          <span className="material-symbols-outlined text-[18px]">north_west</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: STATS SUMMARY STRIP */}
          <section className="w-full px-gutter py-space-xl bg-surface-container-lowest/80 border-y border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-space-md">
              <div className="flex flex-col items-center justify-center p-space-md rounded-xl bg-surface-container-low border border-white/5 text-center">
                <span className="font-metric-display text-metric-display text-[#ff003c] font-mono">
                  <Counter end={120} suffix="+" />
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">مشروع ومتجر مكتمل بنجاح</span>
              </div>
              <div className="flex flex-col items-center justify-center p-space-md rounded-xl bg-surface-container-low border border-white/5 text-center">
                <span className="font-metric-display text-metric-display text-white font-mono">
                  <Counter end={98} suffix="%" />
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">نسبة التزام الجودة والرضا</span>
              </div>
              <div className="flex flex-col items-center justify-center p-space-md rounded-xl bg-surface-container-low border border-white/5 text-center">
                <span className="font-metric-display text-metric-display text-[#ff1744] font-mono">
                  <Counter end={3.8} decimals={1} suffix="M" prefix="$" />
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">ميزانيات إعلانية مدارة شهرياً</span>
              </div>
              <div className="flex flex-col items-center justify-center p-space-md rounded-xl bg-surface-container-low border border-white/5 text-center">
                <span className="font-metric-display text-metric-display text-primary font-mono">
                  <Counter end={24} suffix="/7" />
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">مراقبة خوادم وتحسين لحظي</span>
              </div>
            </div>
          </section>

          {/* CTA BOTTOM BANNER */}
          <section className="relative w-full px-gutter py-space-xl overflow-hidden">
            <div className="max-w-5xl mx-auto p-space-xl rounded-2xl bg-gradient-to-r from-surface-raised via-surface-container-high to-surface-raised border border-[#ff003c]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-space-lg text-center md:text-right relative">
              <div className="flex flex-col gap-space-xs max-w-xl">
                <h3 className="font-headline-md text-headline-md text-text-primary">
                  هل ترغب في أن تصبح قصة النجاح القادمة؟
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  احجز الآن جلسة تحليل تقني وتدقيق لمسارات حملاتك الحالية لتعرف كيف يمكنك زيادة أرباحك بأكثر من 200%.
                </p>
              </div>
              <Link
                href="/contact"
                className="px-space-xl py-3.5 rounded-xl bg-[#ff003c] hover:bg-[#e60039] text-white font-label-lg text-label-lg font-bold shadow-[0_0_25px_rgba(255,0,60,0.5)] hover:shadow-[0_0_35px_rgba(255,0,60,0.7)] transition-all shrink-0"
              >
                طلب دراسة نمو مجانية
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
