'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Counter from '../../components/Counter';
import WhatsAppFAB from '../../components/WhatsAppFAB';
import Link from 'next/link';

export default function AboutPage() {
  const pillars = [
    {
      icon: 'precision_manufacturing',
      title: 'الهندسة المبنية على البيانات',
      subtitle: 'Data-driven Precision',
      desc: 'نلغي التخمين تماماً من معادلة التسويق. كل دولار يتم إنفاقه يمر عبر خوارزميات قياس دقيقة وتتبع CAPI من الطرف الأول.'
    },
    {
      icon: 'terminal',
      title: 'بنية تحتية برمجية فائقة',
      subtitle: 'Modern Web Engineering',
      desc: 'نبني منصات ومتاجر متطورة باستخدام أحدث تقنيات Next.js و React لتصل سرعة الاستجابة إلى أجزاء من الثانية وتتضاعف معدلات التحويل.'
    },
    {
      icon: 'bolt',
      title: 'تنفيذ تكتيكي متسارع',
      subtitle: 'Hyper-growth Execution',
      desc: 'فرق عمل متخصصة تتحرك كخلية نحل موحدة لإطلاق الحملات واختبار المواد الإعلانية وصياغة نصوص التحويل في وقت قياسي.'
    },
    {
      icon: 'shield_locked',
      title: 'أمان سيبراني وسرية بيانات',
      subtitle: 'Enterprise Security',
      desc: 'حماية كاملة لحساباتك الإعلانية، بيانات عملائك، وشيفراتك البرمجية وفق أعلى المعايير المصرفية والسيبرانية في الشرق الأوسط.'
    }
  ];

  const offices = [
    {
      city: 'الرياض',
      country: 'المملكة العربية السعودية',
      address: 'واحة التقنية الرقمية، مبنى الابتكار المتقدم، الطابق 4',
      phone: '+966 50 123 4567',
      email: 'riyadh@blackspider.agency',
      status: 'المقر الإقليمي الرئيسي'
    },
    {
      city: 'دبي',
      country: 'الإمارات العربية المتحدة',
      address: 'مركز دبي للابتكار المالي (DIFC)، برج غيت، الطابق 12',
      phone: '+971 50 882 1928',
      email: 'dubai@blackspider.agency',
      status: 'مركز التوسع الخليجي والدولي'
    },
    {
      city: 'القاهرة',
      country: 'جمهورية مصر العربية',
      address: 'التجمع الخامس، شارع التسعين الشمالي، مجمع الأعمال التقنية',
      phone: '+20 10 9876 5432',
      email: 'cairo@blackspider.agency',
      status: 'مركز البحث والتطوير البرمجي'
    }
  ];

  return (
    <div className="text-on-surface antialiased min-h-screen relative flex flex-col selection:bg-primary-container selection:text-white">
      <Navbar activeTab="about" />

      <main className="relative z-10 w-full pt-28 pb-20 bg-transparent flex-1 flex flex-col gap-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden w-full px-gutter max-w-6xl mx-auto flex flex-col items-center text-center">

          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 border border-primary/30 backdrop-blur-md shadow-sm mb-space-md">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
            <span className="font-label-md text-label-md text-primary tracking-wide">
              عن وكالة بلاك سبايدر | Black Spider Agency
            </span>
          </div>

          <h1 className="font-display-xl text-display-xl text-text-primary tracking-tight leading-tight mb-space-md max-w-4xl">
            نهندس النمو الرقمي ونحول الأفكار إلى <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-container via-primary to-secondary">منظومات إيرادات مستدامة</span>
          </h1>

          <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-space-xl">
            بلاك سبايدر هي وكالة تقنية استراتيجية متقدمة ولدت لكسر النمطية في عالم التسويق الرقمي وهندسة البرمجيات. نجمع بين عقلية المطورين الصارمة، خبرة مديري الإعلانات المحترفين، وفن صانعي المحتوى لنقدم تجربة نمو شاملة لا تقبل التراجع.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md w-full max-w-4xl">
            <div className="p-space-lg rounded-2xl bg-surface-container/70 border border-white/5 backdrop-blur-md flex flex-col items-center shadow-lg hover:border-primary/30 transition-all">
              <Counter end={10} prefix="+" suffix="M$" className="font-metric-display text-metric-display text-primary" />
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">ميزانيات إعلانية مدارة</span>
            </div>
            <div className="p-space-lg rounded-2xl bg-surface-container/70 border border-white/5 backdrop-blur-md flex flex-col items-center shadow-lg hover:border-primary/30 transition-all">
              <Counter end={250} prefix="+" className="font-metric-display text-metric-display text-text-primary" />
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">منصة ومشروع تقني مُطلق</span>
            </div>
            <div className="p-space-lg rounded-2xl bg-surface-container/70 border border-white/5 backdrop-blur-md flex flex-col items-center shadow-lg hover:border-primary/30 transition-all">
              <Counter end={4.8} suffix="x" decimals={1} className="font-metric-display text-metric-display text-secondary" />
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">متوسط مضاعف العائد ROAS</span>
            </div>
            <div className="p-space-lg rounded-2xl bg-surface-container/70 border border-white/5 backdrop-blur-md flex flex-col items-center shadow-lg hover:border-primary/30 transition-all">
              <Counter end={3} className="font-metric-display text-metric-display text-tertiary" />
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">مقرات إقليمية (الرياض • دبي • القاهرة)</span>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="w-full px-gutter max-w-6xl mx-auto">
          <div className="text-center mb-space-xl flex flex-col items-center gap-space-xs">
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase">
              الركائز الهندسية الأربع
            </span>
            <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold">
              كيف نعيد تشكيل مفهوم النجاح التجاري؟
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              لا نعتمد على الحظ. بنينا نموذج عملنا على 4 أعمدة ثابتة تضمن أعلى كفاءة للمنظومة بأكملها.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-space-xl rounded-3xl bg-surface-container/70 border border-white/5 hover:border-primary/30 transition-all flex flex-col gap-space-md shadow-xl group hover:bg-surface-container-high"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-container/15 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">{pillar.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-text-primary font-bold">
                    {pillar.title}
                  </h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Regional Hubs & Offices */}
        <section className="w-full px-gutter max-w-6xl mx-auto">
          <div className="text-center mb-space-xl flex flex-col items-center gap-space-xs">
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase">
              حضورنا الجغرافي
            </span>
            <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold">
              مقراتنا الإقليمية في الشرق الأوسط
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              نعمل عن قرب مع قادة الأعمال في أبرز العواصم الاقتصادية بالمنطقة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {offices.map((office, idx) => (
              <div
                key={idx}
                className="p-space-lg rounded-3xl bg-surface-container-low border border-white/5 hover:border-primary/30 transition-all flex flex-col justify-between shadow-xl"
              >
                <div className="flex flex-col gap-3 mb-space-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-headline-sm text-text-primary font-bold">
                      {office.city}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-primary-container/15 text-primary font-label-sm text-xs font-semibold">
                      {office.status}
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    {office.country}
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant/80 mt-2">
                    {office.address}
                  </p>
                </div>

                <div className="pt-space-md border-t border-white/5 flex flex-col gap-1.5 font-label-code text-xs">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span>الهاتف المباشر:</span>
                    <span className="text-primary font-bold" dir="ltr">{office.phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span>البريد الإلكتروني:</span>
                    <span className="text-on-surface" dir="ltr">{office.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="w-full px-gutter max-w-5xl mx-auto">
          <div className="p-space-xl md:p-12 rounded-3xl bg-gradient-to-l from-primary-container/30 via-surface-container to-surface-container-low border border-primary/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-space-lg text-center md:text-right relative overflow-hidden">
            <div className="flex flex-col gap-2 max-w-xl">
              <h3 className="font-headline-lg text-headline-lg text-text-primary font-bold">
                جاهز لنقل علامتك التجارية إلى مستوى النمو الفائق؟
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                احجز جلسة استراتيجية وتدقيقاً تقنياً مع نخبة مستشارينا خلال أقل من 30 دقيقة.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-space-xl py-3.5 rounded-xl bg-primary-container text-white font-label-lg text-label-lg font-bold shadow-xl shadow-glow-crimson hover:bg-[#e60036] transition-all transform hover:-translate-y-0.5 shrink-0"
            >
              طلب استشارة وتدقيق تقني
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

