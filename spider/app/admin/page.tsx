'use client';

import React, { useState } from 'react';
import AdminHeader from '../../components/AdminHeader';
import Counter from '../../components/Counter';
import { useDataStore } from '../../lib/store';
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  ArrowUpRight,
  MessageCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

export default function AdminOverviewPage() {
  const { leads, invoices, packages } = useDataStore();

  const totalRevenue = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="لوحة العمليات المركزية والمالية"
        subtitle="مراقبة مباشرة لمؤشرات الأداء، الصفقات النشطة، والتدفقات النقدية"
      />

      <main className="p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col justify-between group hover:border-primary/40 transition-all">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-xs font-mono uppercase font-bold text-primary">TOTAL REVENUE (Q3)</span>
              <div className="w-9 h-9 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold font-mono text-text-primary" dir="ltr">
                <Counter end={totalRevenue} prefix="$" />
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-emerald-400">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+34.2% مقارنة بالربع السابق</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col justify-between group hover:border-secondary/40 transition-all">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-xs font-mono uppercase font-bold text-secondary">ACTIVE PIPELINE</span>
              <div className="w-9 h-9 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold font-mono text-text-primary" dir="ltr">
                <Counter end={148} />
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-secondary">
                <span>12 صفقة جديدة هذا الأسبوع</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col justify-between group hover:border-tertiary/40 transition-all">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-xs font-mono uppercase font-bold text-tertiary">MANAGED SPEND</span>
              <div className="w-9 h-9 rounded-xl bg-tertiary-container/20 text-tertiary flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold font-mono text-text-primary" dir="ltr">
                <Counter end={1.42} prefix="$" suffix="M" decimals={2} />
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-on-surface-variant">
                <span>Meta • TikTok • Google</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col justify-between group hover:border-primary-container/40 transition-all">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-xs font-mono uppercase font-bold text-primary">BLENDED ROAS</span>
              <div className="w-9 h-9 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold font-mono text-primary" dir="ltr">
                <Counter end={4.9} suffix="x" decimals={1} />
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-primary-fixed-dim">
                <span>متوسط العائد المباشر لجميع الحسابات</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue & Pipeline Chart Placeholder */}
        <div className="p-6 rounded-2xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-text-primary">مسار الإيرادات الشهرية والإنفاق المدار</h2>
              <p className="text-xs text-on-surface-variant">تحليل العائد التراكمي لآخر 6 أشهر (2026)</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                <span>الإيرادات المحصلة</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span>الميزانيات الإعلانية</span>
              </span>
            </div>
          </div>

          {/* Chart SVG Visualization */}
          <div className="h-64 w-full pt-4 flex items-end justify-between gap-3 px-2 border-b border-surface-container-high/40">
            {[
              { month: 'يونيو', rev: 45, spend: 65, height: '45%' },
              { month: 'يوليو', rev: 60, spend: 78, height: '60%' },
              { month: 'أغسطس', rev: 72, spend: 85, height: '72%' },
              { month: 'سبتمبر', rev: 80, spend: 90, height: '80%' },
              { month: 'أكتوبر', rev: 92, spend: 95, height: '92%' },
              { month: 'نوفمبر', rev: 100, spend: 100, height: '100%' },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full max-w-[48px] flex items-end justify-center gap-1.5 h-full">
                  <div
                    style={{ height: col.height }}
                    className="w-1/2 rounded-t-lg bg-gradient-to-t from-primary-container/40 to-primary-container group-hover:brightness-125 transition-all relative"
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-[10px] text-white px-1.5 py-0.5 rounded font-mono transition-opacity">
                      ${col.rev}k
                    </span>
                  </div>
                  <div
                    style={{ height: `${parseInt(col.height) * 0.75}%` }}
                    className="w-1/2 rounded-t-lg bg-gradient-to-t from-secondary/30 to-secondary group-hover:brightness-125 transition-all"
                  ></div>
                </div>
                <span className="text-xs font-mono text-on-surface-variant group-hover:text-white transition-colors">
                  {col.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Leads Table & Quick Pipeline Actions */}
        <div className="p-6 rounded-2xl bg-surface-container-low border border-white/5 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-text-primary">أحدث طلبات الصفقات الواردة (Recent Leads)</h2>
              <p className="text-xs text-on-surface-variant">بيانات متزامنة فورياً مع قاعدة بيانات Supabase</p>
            </div>
            <Link
              href="/admin/crm"
              className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
            >
              <span>فتح لوحة الكانبان الكاملة</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-surface-container-high/40 pb-3 text-on-surface-variant font-mono">
                  <th className="py-3 px-3">العميل والشركة</th>
                  <th className="py-3 px-3">الخدمة والميزانية</th>
                  <th className="py-3 px-3">المرحلة</th>
                  <th className="py-3 px-3 text-left">التواصل الفوري</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/30">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface-container/60 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-text-primary">{lead.client_name}</span>
                        <span className="text-on-surface-variant">{lead.company}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-text-primary">{lead.service}</span>
                        <span className="text-primary font-mono font-bold" dir="ltr">{lead.budget}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary-container/20 text-primary border border-primary/30">
                        {lead.stage === 'new' && 'طلب جديد'}
                        {lead.stage === 'contacted' && 'تم التواصل'}
                        {lead.stage === 'negotiation' && 'قيد التفاوض'}
                        {lead.stage === 'closed_won' && 'تم التعاقد ✓'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-left">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary hover:text-white transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>محادثة واتساب</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

