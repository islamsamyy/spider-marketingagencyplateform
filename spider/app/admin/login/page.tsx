'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDataStore } from '../../../lib/store';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, Key, CheckCircle2, AlertCircle } from 'lucide-react';

const PRESET_ACCOUNTS = [
  {
    role: 'المدير العام (Super Admin)',
    email: 'admin@blackspider.agency',
    badge: 'صلاحيات كاملة',
    color: 'border-primary/50 text-primary bg-primary/10',
  },
  {
    role: 'مدير المبيعات (Sales Manager)',
    email: 'sales@blackspider.agency',
    badge: 'CRM + الصفقات',
    color: 'border-amber-500/50 text-amber-400 bg-amber-500/10',
  },
  {
    role: 'المدير المالي (Finance Manager)',
    email: 'finance@blackspider.agency',
    badge: 'الفواتير والمالية',
    color: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10',
  },
  {
    role: 'مسؤول المحتوى (Content Editor)',
    email: 'content@blackspider.agency',
    badge: 'المشاريع والمدونة',
    color: 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10',
  },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useDataStore();
  const [email, setEmail] = useState('admin@blackspider.agency');
  const [password, setPassword] = useState('BlackSpider@2026!');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        router.push('/admin');
      } else {
        setError(res.error || 'فشل تسجيل الدخول. تحقق من البريد وكلمة المرور.');
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectPreset = async (presetEmail: string) => {
    setEmail(presetEmail);
    setPassword('BlackSpider@2026!');
    setError(null);
    setIsSubmitting(true);

    const res = await login(presetEmail, 'BlackSpider@2026!');
    if (res.success) {
      router.push('/admin');
    } else {
      setError(res.error || 'تعذر تسجيل الدخول بالحساب التجريبي');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-deep flex items-center justify-center p-4 relative overflow-hidden selection:bg-primary-container selection:text-white" dir="rtl">
      {/* Background ambient neon glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-xl z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-container-high border border-primary/40 shadow-glow-crimson/30 shadow-2xl">
            <img src="/logo.svg" alt="Black Spider" className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(255,0,60,0.6)]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-text-primary tracking-tight">
              بوابة الدخول الإدارية | Black Spider Hub
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              منظومة إدارة الوكالة المربوطة مباشرة بـ Supabase Cloud مع نظام أذونات RBAC
            </p>
          </div>
        </div>

        {/* Quick Demo Switcher Cards */}
        <div className="bg-surface-glass backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>تسجيل دخول سريع للأدوار التجريبية (1-Click Switch):</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              LIVE SUPABASE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRESET_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                onClick={() => handleSelectPreset(acc.email)}
                disabled={isSubmitting}
                className="text-right p-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/5 hover:border-primary/40 transition-all flex flex-col gap-1 group"
                type="button"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">
                    {acc.role}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${acc.color}`}>
                    {acc.badge}
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant font-mono truncate">
                  {acc.email}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Login Form */}
        <div className="bg-surface-glass backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
                البريد الإلكتروني الإداري
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-outline absolute right-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@blackspider.agency"
                  className="w-full bg-surface-container pr-10 pl-4 py-2.5 rounded-xl text-sm text-text-primary border border-white/5 focus:outline-none focus:border-primary font-mono transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
                كلمة المرور المشفرة
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-outline absolute right-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-surface-container pr-10 pl-4 py-2.5 rounded-xl text-sm text-text-primary border border-white/5 focus:outline-none focus:border-primary font-mono transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold text-sm shadow-lg shadow-glow-crimson/30 hover:shadow-glow-crimson/50 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>جاري تسجيل الدخول والتحقق...</span>
              ) : (
                <>
                  <span>دخول لوحة التحكم</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>حماية RLS مفعلة على 9 جداول</span>
            </span>
            <span className="font-mono text-[10px] text-outline">
              DB: aijgzvgnmjjvkxqrgfhm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
