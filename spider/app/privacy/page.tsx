'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="bg-surface-deep text-on-surface antialiased min-h-screen relative flex flex-col selection:bg-primary-container selection:text-white">
      <Navbar />

      <main className="relative z-10 w-full pt-28 pb-20 px-gutter max-w-4xl mx-auto flex-1 flex flex-col gap-8">
        <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-primary font-label-md font-bold text-xs uppercase tracking-wider">
            <span>السياسات النظامية</span>
            <span>•</span>
            <span>تحديث يناير 2026</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-text-primary font-bold">
            سياسة الخصوصية وحماية البيانات المؤسسية
          </h1>
          <p className="font-body-md text-on-surface-variant">
            تلتزم وكالة بلاك سبايدر (Black Spider Agency) بأعلى معايير حماية البيانات وسرية المعلومات وفق الأنظمة السعودية (NDMO) والمعايير العالمية (GDPR).
          </p>
        </div>

        <div className="space-y-6 font-body-md text-on-surface-variant leading-relaxed">
          <section className="p-6 rounded-2xl bg-surface-container-low border border-white/5 flex flex-col gap-3">
            <h2 className="font-headline-sm text-text-primary font-bold">1. البيانات التي نجمعها</h2>
            <p>
              نقوم بجمع البيانات المهنية الضرورية فقط لتنفيذ الخدمات التسويقية والهندسية، وتتضمن: الاسم، رقم الجوال/الواتساب، البريد الإلكتروني المهني، ومؤشرات أداء الحملات أو المتجر الإلكتروني المقدمة برضا العميل.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-container-low border border-white/5 flex flex-col gap-3">
            <h2 className="font-headline-sm text-text-primary font-bold">2. الغرض من معالجة البيانات</h2>
            <p>
              تُستخدم البيانات لتقديم خدمات الـ Media Buying، هندسة واجهات المتاجر والمنصات، تحليل مسارات التحويل CRO، وإرسال تنبيهات الأداء التشغيلية الآلية عبر القنوات المعتمدة.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-container-low border border-white/5 flex flex-col gap-3">
            <h2 className="font-headline-sm text-text-primary font-bold">3. عدم مشاركة البيانات مع أي طرف ثالث</h2>
            <p>
              لا نقوم تحت أي ظرف ببيع أو تأجير أو مشاركة بيانات عملائنا أو بيانات زوارهم مع أي أطراف ثالثة تجارية. تظل كافة الأصول والبيانات ملكية حصرية وخاصة للعميل.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-container-low border border-white/5 flex flex-col gap-3">
            <h2 className="font-headline-sm text-text-primary font-bold">4. التواصل وحذف البيانات</h2>
            <p>
              يحق لأي شريك طلب نسخة من بياناته أو طلب الإتلاف النهائي لكافة السجلات التشغيلية فور انتهاء فترة العقد، عبر مراسلة مسؤول حماية البيانات على: <span className="text-primary font-mono" dir="ltr">security@blackspider.agency</span>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

