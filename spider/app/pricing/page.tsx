'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Counter from '../../components/Counter';
import WhatsAppFAB from '../../components/WhatsAppFAB';
import Link from 'next/link';
import { useDataStore } from '../../lib/store';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
  const [activeCategory, setActiveCategory] = useState<'media-buying' | 'web-engineering' | 'creative-content' | 'all-in-one'>('media-buying');
  const { packages, settings } = useDataStore();

  // Configurator state
  const [channels, setChannels] = useState(2);
  const [creatives, setCreatives] = useState(8);
  const [addons, setAddons] = useState({
    cro: false,
    capi: true,
    dev: false,
    dedicated: false,
  });

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Price calculations
  const calculateConfiguratorPrice = () => {
    const channelBase = 800 + channels * 350;
    const creativeBase = creatives * 65;
    let addonsTotal = 0;
    if (addons.cro) addonsTotal += 450;
    if (addons.capi) addonsTotal += 300;
    if (addons.dev) addonsTotal += 750;
    if (addons.dedicated) addonsTotal += 600;

    let total = channelBase + creativeBase + addonsTotal;
    if (billingCycle === 'quarterly') {
      total = Math.round(total * 0.85);
    }
    return total;
  };

  const calculateMonthlyUnrounded = () => {
    const channelBase = 800 + channels * 350;
    const creativeBase = creatives * 65;
    let addonsTotal = 0;
    if (addons.cro) addonsTotal += 450;
    if (addons.capi) addonsTotal += 300;
    if (addons.dev) addonsTotal += 750;
    if (addons.dedicated) addonsTotal += 600;
    return channelBase + creativeBase + addonsTotal;
  };

  const savingsAmount = Math.round(calculateMonthlyUnrounded() * 0.15);

  const getActiveAddonsCount = () => {
    return Object.values(addons).filter(Boolean).length;
  };

  const faqs = [
    {
      q: "كم من الوقت يستغرق تجهيز وإطلاق الحملات الأولى (Onboarding)؟",
      a: "يستغرق الإعداد الأولي من 3 إلى 5 أيام عمل فقط. يتضمن ذلك ربط ومراجعة التتبع التقني (Pixel & Conversions API)، إعداد مسارات التحويل، تدقيق الحسابات التاريخية، وإنتاج الدفعة الأولى من المواد الإبداعية لإطلاقها فوراً وبدء الاختبارات."
    },
    {
      q: "كيف يتم التعامل مع ميزانية الإعلانات المباشرة (Ad Spend)؟",
      a: "تُدفع ميزانيات الإعلانات المباشرة للمنصات (مثل Meta أو Google) عبر بطاقتكم الائتمانية الخاصة المسجلة في مديري الأعمال لحسابكم. أسعار باقاتنا المذكورة تغطي حصراً رسوم الإدارة والتخطيط الاستراتيجي، الإنتاج الإبداعي، والهندسة التقنية، مما يمنحكم شفافية 100% وتحكم كامل بأموالكم."
    },
    {
      q: "ما هي سياسة الضمان أو استرداد الأموال لديكم؟",
      a: "نقدم ضمان جودة تنفيذي محكم؛ فإذا لم نلتزم بالجدول الزمني لتسليم المواد الإبداعية أو التدقيق التقني خلال أول 14 يوماً من التعاقد، يُسترد مبلغ رسوم الإدارة بالكامل دون أي شروط جزائية. كما لا نفرض أي عقود احتكارية طويلة الأمد للباقات الشهرية، ويمكنكم الإيقاف في أي وقت."
    },
    {
      q: "ما هو جدول التقارير ومستوى التواصل المعتمد؟",
      a: "يحصل كل شريك على لوحة بيانات حية مخصصة (Custom Live Dashboard) ومحدثة لحظياً على مدار الساعة. بالإضافة إلى ذلك، نقوم بإرسال ملخص تنفيذي أسبوعي للأداء وعقد اجتماع تحليلي شهري (أو أسبوعي لباقات Enterprise) لمراجعة العائد الاستثماري وخطة التوسع القادمة."
    }
  ];

  return (
    <div className="bg-surface text-on-surface antialiased selection:bg-primary-container selection:text-white min-h-screen relative flex flex-col">
      <Navbar activeTab="pricing" />

      <main className="relative z-10 w-full pt-20 bg-transparent min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full">

          {/* SECTION 1: HEADER & BILLING TOGGLE */}
          <section className="relative w-full px-gutter pt-space-xl pb-space-lg text-center overflow-hidden">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-space-md relative z-10">
              <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high border border-primary/30 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                <span className="font-label-md text-label-md text-primary tracking-wide">
                  شفافية استثمارية مطلقة • لا رسوم خفية
                </span>
              </div>

              <h1 className="font-display-xl text-display-xl text-text-primary tracking-tight leading-tight">
                استثمر في النمو المحسوب <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-container via-primary to-secondary">
                  وفق معايير هندسية متقدمة
                </span>
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                خطط وباقات مرنة مصممة خصيصاً لمواءمة مرحلة عملك؛ بدءاً من تأسيس البنية الإعلانية الأولى وحتى إدارة التوسع الإقليمي والهيمنة السوقية الكاملة.
              </p>

              {/* Billing Cycle Segmented Control */}
              <div className="mt-space-md p-1.5 rounded-2xl bg-surface-container-low border border-border-glass backdrop-blur-xl flex items-center shadow-lg">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-space-xl py-2.5 rounded-xl font-label-md text-label-md transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-primary-container text-white shadow-glow-crimson font-bold'
                      : 'text-on-surface-variant hover:text-white'
                  }`}
                  type="button"
                >
                  الدفع الشهري المرن
                </button>
                <button
                  onClick={() => setBillingCycle('quarterly')}
                  className={`px-space-xl py-2.5 rounded-xl font-label-md text-label-md transition-all flex items-center gap-space-xs ${
                    billingCycle === 'quarterly'
                      ? 'bg-primary-container text-white shadow-glow-crimson font-bold'
                      : 'text-on-surface-variant hover:text-white'
                  }`}
                  type="button"
                >
                  <span>الدفع الربع سنوي</span>
                  <span className="px-2 py-0.5 rounded-md bg-secondary text-on-secondary font-label-sm text-label-sm font-bold">
                    وفر 15%
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 2: CATEGORY FILTER TABS */}
          <section className="relative z-10 w-full px-gutter py-space-xs">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-space-xs overflow-x-auto pb-space-xs">
              {[
                { id: 'media-buying', label: 'إدارة الإعلانات وتكبير العائد (Media Buying)', icon: 'trending_up' },
                { id: 'web-engineering', label: 'هندسة المتاجر والمنصات (Next.js & CAPI)', icon: 'terminal' },
                { id: 'creative-content', label: 'الإنتاج الإبداعي و UGC المخصص', icon: 'movie_edit' },
                { id: 'all-in-one', label: 'الباقة الشاملة (Full Growth Suite)', icon: 'auto_awesome' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`flex items-center gap-space-xs px-space-md py-2 rounded-xl font-label-md text-label-md transition-all whitespace-nowrap ${
                    activeCategory === tab.id
                      ? 'bg-surface-container-high text-primary border border-primary/40 shadow-sm font-semibold'
                      : 'text-on-surface-variant hover:text-white hover:bg-surface-container-low'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* SECTION 3: DYNAMIC CORE TIER CARDS (Connected to DataStore) */}
          <section className="relative z-10 w-full px-gutter py-space-md">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-space-xl items-stretch">
              {packages.map((pkg, idx) => {
                const price = billingCycle === 'quarterly' ? pkg.quarterly_price : pkg.monthly_price;
                const isHighlighted = pkg.popular || idx === 1;
                const waNumber = settings?.agencyWhatsApp || '966501234567';
                const waLink = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(pkg.whatsapp_message || `مرحباً، أود الاشتراك في باقة ${pkg.tier_name}`)}`;

                return (
                  <div
                    key={pkg.id}
                    className={`relative rounded-2xl p-space-xl flex flex-col justify-between transition-all duration-300 backdrop-blur-2xl ${
                      isHighlighted
                        ? 'bg-gradient-to-b from-surface-raised via-surface-glass to-surface-container-low border-2 border-primary-container shadow-[0_0_40px_-6px_rgba(255,0,60,0.45)] -mt-0 lg:-mt-4'
                        : 'bg-surface-glass border border-border-glass hover:bg-surface-container-high/60 shadow-xl'
                    }`}
                  >
                    {isHighlighted && (
                      <div className="absolute -top-3.5 right-1/2 translate-x-1/2 px-space-md py-1 rounded-full bg-primary-container text-white font-label-sm text-label-sm font-bold shadow-[0_0_18px_rgba(255,0,60,0.6)] flex items-center gap-1 whitespace-nowrap">
                        <span className="material-symbols-outlined text-[16px]">stars</span>
                        <span>الخيار الأكثر طلباً وتوصية لرواد الأعمال</span>
                      </div>
                    )}

                    <div className="flex flex-col gap-space-md">
                      <div className="flex items-center justify-between">
                        <span className={`px-space-sm py-1 rounded-md font-label-sm text-label-sm ${
                          isHighlighted ? 'bg-primary-container/20 text-primary-container border border-primary-container/30 font-bold' : 'bg-surface-container-highest text-on-surface-variant'
                        }`}>
                          {idx === 0 ? 'المرحلة الأولى' : idx === 1 ? 'التوسع المتسارع' : 'هيمنة وحجم سوقي'}
                        </span>
                        <span className={`material-symbols-outlined ${isHighlighted ? 'text-primary-container animate-pulse' : 'text-outline-variant'}`}>
                          {idx === 0 ? 'rocket_launch' : idx === 1 ? 'trending_up' : 'workspace_premium'}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-headline-md text-headline-md text-text-primary">{pkg.tier_name}</h3>
                        {pkg.tier_name_en && (
                          <p className="font-label-sm text-label-sm text-primary tracking-wider uppercase mt-1">{pkg.tier_name_en}</p>
                        )}
                      </div>

                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className={`my-space-sm p-space-md rounded-xl ${
                        isHighlighted ? 'bg-surface-container-lowest border border-primary-container/25 shadow-inner' : 'bg-surface-container-lowest/80 border border-border-glass'
                      }`}>
                        <div className="flex items-baseline gap-space-xs">
                          <span className={`font-metric-display text-metric-display ${
                            isHighlighted ? 'text-primary-container drop-shadow-[0_0_12px_rgba(255,0,60,0.4)]' : 'text-text-primary'
                          }`}>
                            ${price.toLocaleString()}
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">/ شهرياً</span>
                        </div>
                        <div className={`font-label-sm text-label-sm mt-1 ${isHighlighted ? 'text-primary-fixed-dim font-bold' : 'text-outline'}`}>
                          {billingCycle === 'quarterly' ? 'وفر 15% مع الفاتورة الربع سنوية' : 'تجديد شهري مرن بدون التزام سنوي'}
                        </div>
                      </div>

                      <div className="flex flex-col gap-space-sm mt-space-xs">
                        <span className={`font-label-md text-label-md uppercase tracking-wider ${isHighlighted ? 'text-primary-container' : 'text-text-primary'}`}>
                          ما تشمله هذه الباقة:
                        </span>
                        {pkg.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-space-xs text-on-surface font-body-sm text-body-sm">
                            <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0 mt-0.5">
                              {isHighlighted ? 'verified' : 'check_circle'}
                            </span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-space-lg pt-space-md">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-3.5 px-space-md rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs transition-all shadow-sm ${
                          isHighlighted
                            ? 'bg-primary-container hover:bg-[#ff1744] text-white shadow-[0_0_24px_rgba(255,0,60,0.5)] hover:shadow-[0_0_32px_rgba(255,0,60,0.7)] transform hover:-translate-y-0.5'
                            : 'bg-surface-container-high hover:bg-surface-container-highest border border-border-glass hover:border-primary-container/40 text-text-primary'
                        }`}
                      >
                        <span>اختيار {pkg.tier_name} عبر واتساب</span>
                        <span className="material-symbols-outlined text-[18px] -scale-x-100">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 4: INTERACTIVE CUSTOM PACKAGE CONFIGURATOR */}
          <section className="w-full px-gutter py-space-xl" id="configurator-section">
            <div className="max-w-6xl mx-auto rounded-3xl bg-surface-glass backdrop-blur-2xl border border-border-glass p-space-lg lg:p-space-xl shadow-2xl relative overflow-hidden">
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-container/15 rounded-full blur-[120px] pointer-events-none"></div>

              <div className="flex flex-col lg:flex-row items-start justify-between gap-space-xl relative z-10">
                <div className="flex-1 flex flex-col gap-space-lg w-full">
                  <div>
                    <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-md bg-secondary/10 text-secondary border border-secondary/20 font-label-sm text-label-sm mb-space-xs">
                      <span className="material-symbols-outlined text-[16px]">tune</span>
                      <span>تخصيص حر ومخصص</span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-text-primary">
                      صمّم باقتك ونطاق خدماتك بنفسك
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      حدّد بدقة القنوات الإعلانية، عدد المواد الإبداعية، والترقيات الهندسية التي تناسب احتياجات علامتك التجارية واحصل على تسعير فوري.
                    </p>
                  </div>

                  {/* Channel Slider */}
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-label-lg text-text-primary">عدد المنصات الإعلانية المدارة:</span>
                      <span className="font-metric-display text-metric-display text-primary font-bold">
                        {channels} منصات
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={channels}
                      onChange={(e) => setChannels(Number(e.target.value))}
                      className="w-full accent-primary-container cursor-pointer"
                    />
                    <div className="flex justify-between text-outline font-label-sm text-label-sm">
                      <span>منصة واحدة (Meta أو Google)</span>
                      <span>3 منصات</span>
                      <span>5 منصات متكاملة</span>
                    </div>
                  </div>

                  {/* Creative Production Slider */}
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-label-lg text-text-primary">عدد الفيديوهات والمواد الإبداعية شهرياً:</span>
                      <span className="font-metric-display text-metric-display text-primary font-bold">
                        {creatives} أصل إبداعي
                      </span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={24}
                      step={2}
                      value={creatives}
                      onChange={(e) => setCreatives(Number(e.target.value))}
                      className="w-full accent-primary-container cursor-pointer"
                    />
                    <div className="flex justify-between text-outline font-label-sm text-label-sm">
                      <span>4 فيديوهات أساسية</span>
                      <span>12 فيديو (توصية التوسع)</span>
                      <span>24 فيديو مكثف</span>
                    </div>
                  </div>

                  {/* Addon Checkboxes */}
                  <div className="flex flex-col gap-space-sm pt-space-xs">
                    <span className="font-label-lg text-label-lg text-text-primary">ترقيات معمارية وهندسية إضافية:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                      <label className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low border border-border-glass cursor-pointer hover:bg-surface-container-high/60 transition-all">
                        <input
                          type="checkbox"
                          checked={addons.capi}
                          onChange={(e) => setAddons({ ...addons, capi: e.target.checked })}
                          className="accent-primary-container w-4 h-4"
                        />
                        <div className="flex flex-col text-right">
                          <span className="font-label-md text-label-md font-semibold text-text-primary">إعداد خادم CAPI متقدم</span>
                          <span className="text-outline font-label-sm text-label-sm">+$300/شهرياً</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low border border-border-glass cursor-pointer hover:bg-surface-container-high/60 transition-all">
                        <input
                          type="checkbox"
                          checked={addons.cro}
                          onChange={(e) => setAddons({ ...addons, cro: e.target.checked })}
                          className="accent-primary-container w-4 h-4"
                        />
                        <div className="flex flex-col text-right">
                          <span className="font-label-md text-label-md font-semibold text-text-primary">تحسين معدل التحويل (CRO)</span>
                          <span className="text-outline font-label-sm text-label-sm">+$450/شهرياً</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low border border-border-glass cursor-pointer hover:bg-surface-container-high/60 transition-all">
                        <input
                          type="checkbox"
                          checked={addons.dev}
                          onChange={(e) => setAddons({ ...addons, dev: e.target.checked })}
                          className="accent-primary-container w-4 h-4"
                        />
                        <div className="flex flex-col text-right">
                          <span className="font-label-md text-label-md font-semibold text-text-primary">دعم برمجي وهندسي مخصص</span>
                          <span className="text-outline font-label-sm text-label-sm">+$750/شهرياً</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low border border-border-glass cursor-pointer hover:bg-surface-container-high/60 transition-all">
                        <input
                          type="checkbox"
                          checked={addons.dedicated}
                          onChange={(e) => setAddons({ ...addons, dedicated: e.target.checked })}
                          className="accent-primary-container w-4 h-4"
                        />
                        <div className="flex flex-col text-right">
                          <span className="font-label-md text-label-md font-semibold text-text-primary">مدير حسابات وتواصل 24/7</span>
                          <span className="text-outline font-label-sm text-label-sm">+$600/شهرياً</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Live Estimator Result Box */}
                <div className="w-full lg:w-96 p-space-lg rounded-2xl bg-surface-container-lowest border border-primary-container/30 shadow-glow-crimson/20 flex flex-col justify-between shrink-0">
                  <div className="flex flex-col gap-space-md">
                    <span className="font-label-lg text-label-lg text-primary uppercase tracking-wider font-semibold">
                      تقدير الاستثمار الشهري
                    </span>

                    <div className="flex items-baseline gap-space-xs">
                      <span className="font-display-lg text-display-lg font-bold text-primary-container drop-shadow-[0_0_12px_rgba(255,0,60,0.5)]">
                        ${calculateConfiguratorPrice().toLocaleString()}
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant">/ شهرياً</span>
                    </div>

                    {billingCycle === 'quarterly' && (
                      <div className="p-space-xs rounded-lg bg-secondary/10 border border-secondary/20 text-secondary font-label-sm text-label-sm">
                        تم تطبيق خصم 15% للدفع الربع سنوي (وفّرت ${savingsAmount.toLocaleString()}/شهرياً)
                      </div>
                    )}

                    <div className="flex flex-col gap-space-xs text-on-surface-variant font-body-sm text-body-sm pt-space-sm border-t border-white/5">
                      <div className="flex justify-between">
                        <span>المنصات الإعلانية:</span>
                        <span className="text-text-primary font-bold">{channels} منصات</span>
                      </div>
                      <div className="flex justify-between">
                        <span>المحتوى الإبداعي:</span>
                        <span className="text-text-primary font-bold">{creatives} أصل/شهر</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ترقيات معمارية مفعلة:</span>
                        <span className="text-text-primary font-bold">{getActiveAddonsCount()} ترقيات</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-space-lg">
                    <Link
                      href="/contact"
                      className="w-full py-3.5 px-space-md rounded-xl bg-primary-container hover:bg-[#ff1744] text-white font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs shadow-glow-crimson transition-all"
                    >
                      <span>تأكيد هذا التخصيص والبدء</span>
                      <span className="material-symbols-outlined text-[18px] -scale-x-100">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
          <section className="w-full px-gutter py-space-xl bg-surface-container-lowest/60 border-t border-white/5" id="pricing-faq">
            <div className="max-w-4xl mx-auto flex flex-col gap-space-lg">
              <div className="text-center flex flex-col items-center gap-space-xs">
                <span className="font-label-md text-label-md text-primary uppercase tracking-wider font-semibold">
                  الأسئلة الشائعة
                </span>
                <h2 className="font-headline-lg text-headline-lg text-text-primary">
                  إجابات واضحة ومباشرة لكل ما يهمك
                </h2>
              </div>

              <div className="flex flex-col gap-space-sm">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-surface-container-low border border-white/5 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full p-space-md flex items-center justify-between text-right text-text-primary font-title-md text-title-md font-semibold hover:bg-surface-container-high/40 transition-colors"
                      type="button"
                    >
                      <span>{faq.q}</span>
                      <span className="material-symbols-outlined text-outline-variant transition-transform">
                        {openFaq === i ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-space-md pb-space-md text-on-surface-variant font-body-md text-body-md leading-relaxed border-t border-white/5 pt-space-xs">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
