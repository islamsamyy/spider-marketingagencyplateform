'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDataStore } from '../lib/store';

export default function Footer() {
  const { settings } = useDataStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const agencyName = settings?.agencyName || 'بلاك سبايدر | Black Spider';
  const agencyPhone = settings?.agencyPhone || '+966 50 123 4567';
  const agencyEmail = settings?.agencyEmail || 'contact@blackspider.agency';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative z-10 w-full bg-surface-container-lowest/95 border-t border-white/5 backdrop-blur-2xl mt-margin">
      <div className="w-full px-gutter py-space-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-xl">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <Link href="/" className="flex items-center gap-space-md group">
              <img
                alt="Black Spider Agency Logo"
                className="h-10 w-10 object-contain drop-shadow-[0_0_12px_rgba(255,0,60,0.5)] group-hover:scale-105 transition-transform"
                src="/logo.svg"
              />
              <span className="font-headline-sm text-headline-sm text-text-primary font-bold">
                {agencyName}
              </span>
            </Link>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md leading-relaxed">
              وكالة تقنية استراتيجية متقدمة تصمم حلول النمو الفائق، المنصات المؤسسية، والأنظمة الرقمية الذكية لنخبة الشركات ورواد الأعمال في الشرق الأوسط والعالم.
            </p>
            <div className="flex items-center gap-space-sm mt-space-sm">
              <div className="flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-low border border-primary/20 text-primary font-label-sm text-label-sm">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                <span>أنظمة التشغيل نشطة</span>
              </div>
              <span className="text-outline font-label-sm text-label-sm">
                الرياض • دبي • القاهرة
              </span>
            </div>
          </div>

          {/* Col 2: Main Links */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-text-primary uppercase tracking-wider mb-space-xs font-semibold">
              روابط رئيسية
            </span>
            <Link
              href="/services"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              هندسة البرمجيات والتطبيقات
            </Link>
            <Link
              href="/portfolio"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              معرض الأعمال المتميزة
            </Link>
            <Link
              href="/pricing"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              باقات النمو الاستثماري
            </Link>
            <Link
              href="/about"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              فريق العمل والخبرات
            </Link>
            <Link
              href="/threejs"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              معاينة Three.js التفاعلية
            </Link>
            <Link
              href="/dashboard"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              لوحة الإدارة المتكاملة
            </Link>
            <Link
              href="/contact"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              طلب تدقيق تقني واستشارة
            </Link>
          </div>

          {/* Col 3: Offices & Contact */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-text-primary uppercase tracking-wider mb-space-xs font-semibold">
              المقرات والتواصل
            </span>
            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <span className="text-text-primary font-semibold">المملكة العربية السعودية:</span>
              <span>الرياض، واحة التقنية الرقمية</span>
              <span className="text-text-primary font-semibold mt-space-xs">الإمارات العربية المتحدة:</span>
              <span>دبي، مركز الابتكار المالي</span>
              <span className="text-text-primary font-semibold mt-space-xs">مصر:</span>
              <span>القاهرة، التجمع الخامس</span>
              <div className="mt-space-sm pt-space-xs border-t border-white/5 flex flex-col gap-1">
                <span className="text-primary font-mono text-xs" dir="ltr">{agencyPhone}</span>
                <span className="text-on-surface-variant text-xs" dir="ltr">{agencyEmail}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="flex flex-col gap-space-md">
            <span className="font-label-lg text-label-lg text-text-primary uppercase tracking-wider font-semibold">
              النشرة التقنية المتخصصة
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              اشترك لتلقي أحدث تحليلات الذكاء الاصطناعي وتقنيات النمو المؤسسي أسبوعياً.
            </p>
            {subscribed ? (
              <div className="p-space-sm rounded-lg bg-primary-container/20 border border-primary/30 text-primary text-body-sm">
                تم الاشتراك بنجاح! ستصلك نشرتنا القادمة.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-space-xs">
                <div className="flex items-center rounded-lg bg-surface-container-low border border-white/5 p-1">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="بريدك الإلكتروني المهني..."
                    className="w-full bg-transparent px-space-sm py-2 font-body-sm text-body-sm text-text-primary placeholder:text-outline focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-space-md py-2 rounded bg-primary-container text-white font-label-md text-label-md font-bold hover:shadow-[0_0_15px_rgba(255,0,60,0.5)] hover:bg-[#e60036] transition-all shrink-0"
                  >
                    اشتراك
                  </button>
                </div>
                <span className="font-label-sm text-label-sm text-outline">
                  نحترم خصوصيتك وسرية بياناتك المؤسسية.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-space-lg border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-body-sm text-body-sm">
          <p>
            جميع الحقوق محفوظة © بلاك سبايدر Black Spider Agency. مسجلة رسمياً كوكالة تحول رقمي متقدم.
          </p>
          <div className="flex items-center gap-space-md">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              سياسة الخصوصية
            </Link>
            <span className="text-outline-variant">•</span>
            <Link href="/terms" className="hover:text-primary transition-colors">
              الشروط والأحكام
            </Link>
            <span className="text-outline-variant">•</span>
            <Link href="/security" className="hover:text-primary transition-colors">
              معايير الأمان السيبراني
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
