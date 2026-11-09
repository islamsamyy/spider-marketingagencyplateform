'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function TermsPage() {
  return (
    <div className="bg-surface-deep text-on-surface antialiased min-h-screen relative flex flex-col selection:bg-primary-container selection:text-white">
      <Navbar />

      <main className="relative z-10 w-full pt-28 pb-20 px-gutter max-w-4xl mx-auto flex-1 flex flex-col gap-8">
        <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-primary font-label-md font-bold text-xs uppercase tracking-wider">
            <span>الوثائق التعاقدية</span>
            <span>•</span>
            <span>سارية لعام 2026</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-text-primary font-bold">
            الشروط والأحكام واتفاقية مستوى الخدمة (SLA)
          </h1>
          <p className="font-body-md text-on-surface-variant">
            تحكم هذه الشروط تقديم الخدمات الاستشارية، الحملات الإعلانية، وتطوير البرمجيات بين وكالة بلاك سبايدر (Black Spider) وعملائها الشركاء.
          </p>
        </div>

        <div className="space-y-6 font-body-md text-on-surface-variant leading-relaxed">
          <section className="p-6 rounded-2xl bg-surface-container-low border border-white/5 flex flex-col gap-3">
            <h2 className="font-headline-sm text-text-primary font-bold">1. نطاق الشراكة والخدمات</h2>
            <p>
              يتم تقديم الخدمات وفق الباقة أو العقد المتفق عليه (Starter Scale, Growth Engine, Market Leader, أو Full Growth Suite) مع تفصيل واضح للمخرجات الإعلانية والبرمجية.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-container-low border border-white/5 flex flex-col gap-3">
            <h2 className="font-headline-sm text-text-primary font-bold">2. ملكية الحسابات الإعلانية والأصول</h2>
            <p>
              يحتفظ العميل بملكية كاملة ومطلقة لكافة حساباته الإعلانية (Meta, TikTok, Google, Snap) وبيكسلات التتبع (CAPI) ومستودعات الشيفرة المصدرية (Source Code).
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-container-low border border-white/5 flex flex-col gap-3">
            <h2 className="font-headline-sm text-text-primary font-bold">3. الشفافية المالية وإدارة الميزانيات</h2>
            <p>
              يتم سداد تكاليف الإعلانات مباشرة من بطاقات العميل البنكية إلى منصات الإعلانات دون أي وساطة، بينما تغطي أتعاب الوكالة الإدارة الاستراتيجية، المراقبة، التطوير، والإنتاج الإبداعي.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-container-low border border-white/5 flex flex-col gap-3">
            <h2 className="font-headline-sm text-text-primary font-bold">4. سرعة الاستجابة والدعم الفني</h2>
            <p>
              نلتزم بوقت استجابة لا يتجاوز 30 دقيقة خلال ساعات العمل الرسمية عبر قنوات Telegram المباشرة المخصصة للمدراء التنفيذيين.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

