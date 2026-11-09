'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function SecurityPage() {
  const standards = [
    {
      icon: 'lock',
      title: 'تتبع CAPI مشفر بالكامل',
      desc: 'إرسال بيانات الأحداث (Conversion API) عبر قنوات TLS 1.3 مع تجزئة البيانات الحساسة (SHA-256 Hashing) قبل التمرير للمنصات الإعلانية.'
    },
    {
      icon: 'admin_panel_settings',
      title: 'إدارة وصول بدون مشاركة كلمات مرور',
      desc: 'نعتمد فقط على تفويض الحسابات الرسمي عبر Meta Business Manager و Google Partners دون طلب أي بيانات دخول حساسة.'
    },
    {
      icon: 'code',
      title: 'عزل تام للشيفرات البرمجية',
      desc: 'مستودعات برمجية خاصة ومعزولة على GitHub Enterprise مع فحوصات أمان تلقائية للثغرات قبل نشر أي تحديث للمتاجر أو المنصات.'
    },
    {
      icon: 'shield_moon',
      title: 'استجابة فورية للحوادث السيبرانية',
      desc: 'نظام مراقبة على مدار الساعة (24/7 SIEM) لاكتشاف أي اختراق أو هجمات DDoS مع آلية تجميد فوري للحملات في حال الشك بأي نشاط مريب.'
    }
  ];

  return (
    <div className="bg-surface-deep text-on-surface antialiased min-h-screen relative flex flex-col selection:bg-primary-container selection:text-white">
      <Navbar />

      <main className="relative z-10 w-full pt-28 pb-20 px-gutter max-w-4xl mx-auto flex-1 flex flex-col gap-8">
        <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-primary font-label-md font-bold text-xs uppercase tracking-wider">
            <span>الأمن السيبراني</span>
            <span>•</span>
            <span>معايير الحماية المؤسسية</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-text-primary font-bold">
            معايير الأمان السيبراني وحماية البنية التحتية
          </h1>
          <p className="font-body-md text-on-surface-variant">
            نضع أمن بيانات الشركاء واستقرار منصاتهم الرقمية على رأس أولوياتنا التشغيلية في كافة مشاريعنا الإعلانية والبرمجية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {standards.map((s, i) => (
            <div key={i} className="p-6 rounded-2xl bg-surface-container-low border border-white/5 flex flex-col gap-3 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-primary-container/20 border border-primary/30 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{s.icon}</span>
              </div>
              <h3 className="font-headline-sm text-text-primary font-bold">{s.title}</h3>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-surface-container border border-primary/30 flex items-center justify-between gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <span className="font-label-md text-primary font-bold">فريق الأمان والامتثال</span>
            <span className="text-body-sm text-on-surface-variant">للإبلاغ عن أي ثغرة أمنية أو استفسار سيبراني:</span>
          </div>
          <a
            href="mailto:security@blackspider.agency"
            className="px-5 py-2.5 rounded-xl bg-primary-container text-white font-label-md font-bold shadow-md hover:bg-[#e60036] transition-all font-mono text-sm"
          >
            security@blackspider.agency
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

