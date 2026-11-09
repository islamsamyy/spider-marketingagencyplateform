'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppFAB from '../../components/WhatsAppFAB';
import { useDataStore } from '../../lib/store';
import { Check, MessageCircle, Sparkles, Zap, Shield, ArrowUpRight } from 'lucide-react';

export default function PackagesPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
  const { packages } = useDataStore();

  return (
    <div className="text-on-surface antialiased min-h-screen relative flex flex-col selection:bg-primary-container selection:text-white">
      <Navbar activeTab="packages" />

      <main className="relative z-10 w-full pt-28 pb-20 bg-transparent flex-1 flex flex-col gap-16 px-gutter max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-space-xs relative">

          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 border border-primary/30 backdrop-blur-md shadow-sm mb-space-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
            <span className="font-label-md text-label-md text-primary tracking-wide">
              باقات الاستثمار والنمو الرقمي
            </span>
          </div>

          <h1 className="font-display-xl text-display-xl text-text-primary tracking-tight leading-tight mb-2 max-w-3xl">
            استثمار واضح النتائج وباقات مصممة <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-container via-primary to-secondary">لمضاعفة الإيرادات</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            اختر الباقة الأنسب لمرحلة نمو علامتك التجارية، مع إمكانية التواصل الفوري عبر واتساب لبدء التجهيز خلال دقائق.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-6 flex items-center p-1.5 rounded-2xl bg-surface-container-low border border-white/5 backdrop-blur-md">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-primary-container text-white shadow-lg shadow-glow-crimson/30'
                  : 'text-on-surface-variant hover:text-white'
              }`}
              type="button"
            >
              الاشتراك الشهري
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'quarterly'
                  ? 'bg-primary-container text-white shadow-lg shadow-glow-crimson/30'
                  : 'text-on-surface-variant hover:text-white'
              }`}
              type="button"
            >
              <span>الاشتراك الربعي</span>
              <span className="px-2 py-0.5 rounded-md bg-secondary text-black text-[10px] font-bold">
                وفّر 15%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => {
            const price = billingCycle === 'monthly' ? pkg.monthly_price : pkg.quarterly_price;
            const waEncoded = encodeURIComponent(pkg.whatsapp_message);
            const waLink = `https://wa.me/966501234567?text=${waEncoded}`;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl ${
                  pkg.popular
                    ? 'bg-surface-container/90 border-2 border-primary shadow-2xl shadow-glow-crimson/20 lg:-translate-y-3'
                    : 'bg-surface-container/60 border border-white/5 hover:border-primary/40 shadow-xl'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary-container to-secondary text-white text-[11px] font-bold shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>الباقة الأكثر اختياراً للنمو</span>
                  </div>
                )}

                <div>
                  <div className="flex flex-col gap-1 mb-4">
                    <span className="font-bold text-base text-text-primary">{pkg.tier_name}</span>
                    <span className="text-xs font-mono text-primary uppercase tracking-wider">{pkg.tier_name_en}</span>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-surface-container-high/60">
                    <span className="text-4xl font-bold font-mono text-text-primary" dir="ltr">
                      ${price.toLocaleString()}
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">/ شهرياً</span>
                    {billingCycle === 'quarterly' && (
                      <span className="mr-auto text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                        يُسدد ربع سنوياً
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="flex flex-col gap-3 mb-8">
                    <span className="text-xs font-bold text-text-primary">ما تتضمنه هذه الباقة:</span>
                    <ul className="flex flex-col gap-2.5 text-xs text-on-surface">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-primary-container/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* WhatsApp Pre-filled Action Button */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                    pkg.popular
                      ? 'bg-primary-container hover:bg-[#e60036] text-white shadow-glow-crimson'
                      : 'bg-surface-container-high hover:bg-surface-container-highest border border-primary/30 text-primary hover:text-white'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تواصل عبر واتساب لحجز الباقة</span>
                </a>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

