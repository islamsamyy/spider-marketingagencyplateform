'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function ThreeJsPage() {
  const [opacity, setOpacity] = useState(0.85);

  return (
    <div className="bg-black text-on-surface antialiased min-h-screen relative flex flex-col selection:bg-primary-container selection:text-white overflow-hidden">
      <Navbar activeTab="threejs" />

      <main className="relative z-10 w-full pt-28 pb-16 px-gutter max-w-6xl mx-auto flex-1 flex flex-col items-center justify-center text-center">
        
        {/* Floating Cyber Badge */}
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 border border-primary/40 backdrop-blur-md shadow-lg shadow-glow-crimson/20 mb-space-md">
          <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
          <span className="font-label-md text-label-md text-primary font-bold">
            Interactive Three.js & Cyber Spider Web Canvas
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display-xl text-display-xl text-text-primary tracking-tight leading-tight mb-space-md max-w-3xl">
          الخلفية التفاعلية وشبكة <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-container via-primary to-secondary">العنكبوت السيبراني</span>
        </h1>

        <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-space-xl">
          حرّك مؤشر الفأرة في أي مكان على الشاشة لتشاهد خيوط العنكبوت المرنة تنجذب نحوك بنظام الرادار المتطور ونبضات الضوء القرمزية.
        </p>

        {/* Interactive Stats Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md w-full max-w-3xl mb-space-xl">
          <div className="p-space-md rounded-2xl bg-surface-container/60 border border-white/10 backdrop-blur-xl flex flex-col items-center shadow-lg">
            <span className="font-metric-display-mobile text-metric-display-mobile text-primary font-bold">75+</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">عقدة جزيئية نشطة</span>
          </div>
          <div className="p-space-md rounded-2xl bg-surface-container/60 border border-white/10 backdrop-blur-xl flex flex-col items-center shadow-lg">
            <span className="font-metric-display-mobile text-metric-display-mobile text-secondary font-bold">180px</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">نطاق جذب مؤشر الفأرة</span>
          </div>
          <div className="p-space-md rounded-2xl bg-surface-container/60 border border-white/10 backdrop-blur-xl flex flex-col items-center shadow-lg">
            <span className="font-metric-display-mobile text-metric-display-mobile text-text-primary font-bold">60 FPS</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">معدل الإطارات اللحظي</span>
          </div>
          <div className="p-space-md rounded-2xl bg-surface-container/60 border border-white/10 backdrop-blur-xl flex flex-col items-center shadow-lg">
            <span className="font-metric-display-mobile text-metric-display-mobile text-tertiary font-bold">#ff003c</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">لون التوهج القرمزي</span>
          </div>
        </div>

        {/* Opacity Control Slider */}
        <div className="p-space-lg rounded-2xl bg-surface-container-high/70 border border-primary/30 backdrop-blur-xl flex flex-col gap-2 w-full max-w-md shadow-2xl shadow-glow-crimson/15 mb-space-xl">
          <div className="flex items-center justify-between text-label-md font-bold text-text-primary">
            <span>درجة سطوع وتوهج الشبكة:</span>
            <span className="text-primary font-mono">{Math.round(opacity * 100)}%</span>
          </div>
          <input
            type="range"
            min={0.2}
            max={1}
            step={0.05}
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-full h-2 rounded-lg bg-surface-container-highest accent-primary-container cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-space-md">
          <Link
            href="/"
            className="px-space-xl py-3 rounded-xl bg-primary-container text-white font-label-lg text-label-lg font-bold shadow-xl shadow-glow-crimson hover:bg-[#e60036] transition-all flex items-center gap-space-xs"
          >
            <span>العودة للرئيسية</span>
            <span className="material-symbols-outlined text-[18px]">home</span>
          </Link>
          <Link
            href="/pricing"
            className="px-space-xl py-3 rounded-xl bg-surface-container border border-white/10 text-text-primary hover:bg-surface-container-high font-label-lg text-label-lg transition-all"
          >
            معاينة الباقات والأسعار
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}

