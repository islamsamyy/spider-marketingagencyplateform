'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Counter from '../../components/Counter';
import WhatsAppFAB from '../../components/WhatsAppFAB';
import Link from 'next/link';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'media' | 'dev' | 'creative' | 'suite'>('all');
  const [monthlyBudget, setMonthlyBudget] = useState(25000);

  // Projected metrics based on monthly budget slider
  const estimatedClicks = Math.round(monthlyBudget * 1.85);
  const estimatedOrders = Math.round(monthlyBudget * 0.082);
  const estimatedRevenue = Math.round(monthlyBudget * 4.6);

  const services = [
    {
      id: 'media',
      category: 'media',
      icon: 'query_stats',
      tag: 'Media Buying & Performance',
      title: 'إدارة الحملات الإعلانية وتوسيع النطاق (Scaling)',
      desc: 'استراتيجيات اقتناء عملاء فائقة الدقة مدعومة بالبيانات الضخمة والتحليل المتقدم عبر Meta, TikTok, Google, و Snapchat لتحقيق أعلى عائد على الإنفاق الإعلاني (ROAS).',
      deliverables: [
        'إعداد تتبع الطرف الأول (First-party CAPI Tracking) وتجاوز قيود iOS',
        'هندسة جماهير مخصصة (Custom Audiences & Lookalikes) عالية التحويل',
        'اختبارات A/B مستمرة للنصوص الإعلانية والزوايا البيعية (Angles)',
        'لوحة تحليلات لحظية للميزانيات والعائد اليومي عبر CAPI'
      ],
      techBadge: 'Meta CAPI • TikTok Ads API • Google GA4 • TripleWhale'
    },
    {
      id: 'dev',
      category: 'dev',
      icon: 'developer_mode',
      tag: 'Custom Web & Software Engineering',
      title: 'تطوير المنصات والمتاجر البرمجية فائقة السرعة',
      desc: 'بنية تحتية هندسية عصرية تعتمد على Next.js و React لتوفير سرعة تحميل تقل عن 50ms وتجربة مستخدم سلسة تضاعف معدل التحويل (CRO) وتخفض معدل الارتداد.',
      deliverables: [
        'متاجر إلكترونية برمجية مخصصة ومحسنة للشراء الفوري (Headless Shopify/Next.js)',
        'منصات SaaS ولوحات تحكم تفاعلية معقدة مع أمان عالي',
        'هندسة متقدمة لمحركات البحث (Technical SEO) وربط بوابات الدفع الخليجية',
        'أتمتة العمليات الداخلية والربط مع أنظمة ERP والـ CRM'
      ],
      techBadge: 'Next.js 16 • React 19 • Tailwind CSS • Vercel Edge'
    },
    {
      id: 'creative',
      category: 'creative',
      icon: 'auto_videocam',
      tag: 'Creative & Content Ops',
      title: 'الإنتاج الإبداعي وصناعة المحتوى المرئي الفيروسي',
      desc: 'محتوى بصري وسردي استراتيجي مصمم لإيقاف التمرير (Thumb-stopping)، غرس الثقة الفورية، وتحويل المشاهدين إلى عملاء دائمين لعلامتك التجارية.',
      deliverables: [
        'إنتاج فيديوهات UGC حقيقية مع صناع محتوى محترفين بالخليج',
        'تصميم إعلانات موشن جرافيك ورسوم ثلاثية الأبعاد (3D Motion)',
        'كتابة نصوص إعلانية بيعية مقنعة ومختبرة نفسياً (High-Converting Copy)',
        'هويات بصرية رقمية متكاملة وأنظمة تصميم للواجهات (Design Systems)'
      ],
      techBadge: 'Cinema 4D • After Effects • UGC Creator Network • Figma'
    },
    {
      id: 'suite',
      category: 'suite',
      icon: 'rocket_launch',
      tag: 'Full Growth Architecture',
      title: 'الشراكة الشاملة للنمو الفائق (Full Growth Suite)',
      desc: 'الاندماج الكامل مع منظومة أعمالك: نتولى الميديا بايينغ، التطوير البرمجي المستمر، وإنتاج المواد الإبداعية معاً في نموذج عمل موحد يركز على صافي الأرباح.',
      deliverables: [
        'فريق عمل مخصص كامل (Media Buyer + Fullstack Dev + Creative Director)',
        'اجتماعات استراتيجية أسبوعية لتحليل مؤشرات الأداء والـ Unit Economics',
        'أولوية قصوى في قناة Telegram المباشرة مع الإدارة العليا للوكالة',
        'ضمان تحقيق الأهداف البيعية ومواءمة الميزانيات مع التدفقات النقدية'
      ],
      techBadge: 'Dedicated Squad • 24/7 Slack/TG Sync • C-Level Strategy'
    }
  ];

  const filteredServices = services.filter((s) => activeTab === 'all' || s.category === activeTab);

  return (
    <div className="text-on-surface antialiased min-h-screen relative flex flex-col selection:bg-primary-container selection:text-white">
      <Navbar activeTab="services" />

      <main className="relative z-10 w-full pt-28 pb-20 bg-transparent flex-1 flex flex-col gap-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden w-full px-gutter max-w-6xl mx-auto flex flex-col items-center text-center">

          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 border border-primary/30 backdrop-blur-md shadow-sm mb-space-md">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
            <span className="font-label-md text-label-md text-primary tracking-wide">
              منظومة خدمات بلاك سبايدر المتكاملة
            </span>
          </div>

          <h1 className="font-display-xl text-display-xl text-text-primary tracking-tight leading-tight mb-space-md max-w-4xl">
            خدمات مصممة لرفع <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-container via-primary to-secondary">كفاءة المنظومة التسويقية</span> والبرمجية
          </h1>

          <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-space-xl">
            ندمج بين هندسة البيانات الصارمة، البنية البرمجية المتطورة، والإنتاج الإبداعي الموجه للمبيعات لبناء محركات نمو استثنائية قابلة للتوسع الفوري.
          </p>

          {/* Service Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-surface-container-low border border-white/5 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-xl font-label-md text-label-md transition-all ${
                activeTab === 'all'
                  ? 'bg-primary-container text-white font-bold shadow-lg shadow-glow-crimson/30'
                  : 'text-on-surface-variant hover:text-white'
              }`}
            >
              كافة الخدمات (4)
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`px-5 py-2.5 rounded-xl font-label-md text-label-md transition-all ${
                activeTab === 'media'
                  ? 'bg-primary-container text-white font-bold shadow-lg shadow-glow-crimson/30'
                  : 'text-on-surface-variant hover:text-white'
              }`}
            >
              Media Buying & Ads
            </button>
            <button
              onClick={() => setActiveTab('dev')}
              className={`px-5 py-2.5 rounded-xl font-label-md text-label-md transition-all ${
                activeTab === 'dev'
                  ? 'bg-primary-container text-white font-bold shadow-lg shadow-glow-crimson/30'
                  : 'text-on-surface-variant hover:text-white'
              }`}
            >
              Web & App Engineering
            </button>
            <button
              onClick={() => setActiveTab('creative')}
              className={`px-5 py-2.5 rounded-xl font-label-md text-label-md transition-all ${
                activeTab === 'creative'
                  ? 'bg-primary-container text-white font-bold shadow-lg shadow-glow-crimson/30'
                  : 'text-on-surface-variant hover:text-white'
              }`}
            >
              Creative & Content
            </button>
            <button
              onClick={() => setActiveTab('suite')}
              className={`px-5 py-2.5 rounded-xl font-label-md text-label-md transition-all ${
                activeTab === 'suite'
                  ? 'bg-primary-container text-white font-bold shadow-lg shadow-glow-crimson/30'
                  : 'text-on-surface-variant hover:text-white'
              }`}
            >
              Full Growth Suite
            </button>
          </div>
        </section>

        {/* Services Bento Grid */}
        <section className="w-full px-gutter max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group p-space-xl rounded-3xl bg-surface-container/70 border border-white/5 hover:border-primary/40 p-space-xl shadow-xl hover:shadow-2xl hover:shadow-glow-crimson/15 hover:bg-surface-container-high transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-primary-container/15 border border-primary/20 flex items-center justify-center text-primary mb-space-lg group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                  </div>

                  <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase mb-1 block">
                    {service.tag}
                  </span>

                  <h3 className="font-headline-sm text-headline-sm text-text-primary mb-space-md font-bold">
                    {service.title}
                  </h3>

                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="flex flex-col gap-space-sm bg-surface-container-lowest/60 border border-white/5 p-space-md rounded-2xl mb-space-lg">
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      المخرجات والقنوات التنفيذية:
                    </span>
                    <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface">
                      {service.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-space-md border-t border-white/5 text-xs font-mono text-on-surface-variant">
                  <span className="text-secondary">{service.techBadge}</span>
                  <Link
                    href="/contact"
                    className="text-primary font-bold hover:underline flex items-center gap-1 font-sans text-sm"
                  >
                    <span>طلب الخدمة</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Growth & ROI Simulator */}
        <section className="w-full px-gutter max-w-5xl mx-auto">
          <div className="p-space-xl md:p-12 rounded-3xl bg-surface-container-low border border-primary/30 shadow-2xl flex flex-col gap-space-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-space-lg border-b border-white/5">
              <div className="flex flex-col gap-1">
                <span className="font-label-md text-label-md text-primary uppercase tracking-widest">
                  محاكي العائد الاستثماري التقديري
                </span>
                <h3 className="font-headline-lg text-headline-lg text-text-primary font-bold">
                  احسب القيمة المتوقعة لنمو مبيعاتك مع بلاك سبايدر
                </h3>
              </div>
              <span className="text-xs font-label-code text-on-surface-variant">
                مبني على متوسط بيانات 2026 لشركاء الوكالة
              </span>
            </div>

            {/* Slider */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between font-headline-sm font-bold">
                <span className="text-on-surface">ميزانيتك الإعلانية الشهرية المقترحة:</span>
                <span className="text-primary font-mono text-2xl" dir="ltr">
                  ${monthlyBudget.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={150000}
                step={5000}
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(parseInt(e.target.value))}
                className="w-full h-3 rounded-lg bg-surface-container-highest accent-primary-container cursor-pointer"
              />
              <div className="flex justify-between text-xs font-mono text-on-surface-variant" dir="ltr">
                <span>$5,000</span>
                <span>$75,000</span>
                <span>$150,000+</span>
              </div>
            </div>

            {/* Projected KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
              <div className="p-5 rounded-2xl bg-surface-container border border-white/5 flex flex-col items-center text-center">
                <span className="font-metric-display text-metric-display text-text-primary font-bold" dir="ltr">
                  {estimatedClicks.toLocaleString()}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                  زيارات مؤهلة شهرياً (Clicks)
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-surface-container border border-white/5 flex flex-col items-center text-center">
                <span className="font-metric-display text-metric-display text-secondary font-bold" dir="ltr">
                  +{estimatedOrders.toLocaleString()}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                  طلبات شراء مباشرة (Conversions)
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-surface-container border border-primary/30 flex flex-col items-center text-center bg-primary-container/10">
                <span className="font-metric-display text-metric-display text-primary font-bold" dir="ltr">
                  ${estimatedRevenue.toLocaleString()}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                  إيرادات تقديرية متوقعة (ROAS ~4.6x)
                </span>
              </div>
            </div>

            {/* Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-space-md border-t border-white/5">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                * الأرقام تقديرية وتخضع لطبيعة المنتج ومعدل التحويل الأساسي للمتجر قبل التحسين الهندسي.
              </p>
              <Link
                href="/contact"
                className="px-space-xl py-3 rounded-xl bg-primary-container text-white font-label-lg text-label-lg font-bold shadow-lg shadow-glow-crimson hover:bg-[#e60036] transition-all shrink-0"
              >
                تثبيت هذا الهدف والبدء
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

