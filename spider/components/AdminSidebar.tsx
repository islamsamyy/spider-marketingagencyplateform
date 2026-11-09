'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDataStore } from '../lib/store';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  FolderKanban,
  FileText,
  Star,
  Package,
  Settings,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  LogOut,
  LogIn,
  ShieldCheck
} from 'lucide-react';

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  super_admin: { label: 'المدير العام', color: 'text-primary border-primary/40 bg-primary/10' },
  sales_manager: { label: 'مدير المبيعات', color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' },
  finance_manager: { label: 'المدير المالي', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' },
  content_editor: { label: 'مسؤول المحتوى', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
};

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { userProfile, userRole, logout, isLiveSupabase } = useDataStore();

  const navLinks = [
    { name: 'نظرة عامة والعمليات', href: '/admin', icon: LayoutDashboard },
    { name: 'إدارة الصفقات (CRM)', href: '/admin/crm', icon: Users },
    { name: 'باقات الأسعار (Packages CMS)', href: '/admin/packages', icon: Package },
    { name: 'المالية والفواتير', href: '/admin/finance', icon: DollarSign },
    { name: 'المشاريع وسابقة الأعمال', href: '/admin/projects', icon: FolderKanban },
    { name: 'المدونة والمقالات', href: '/admin/blog', icon: FileText },
    { name: 'إدارة التقييمات', href: '/admin/reviews', icon: Star },
    { name: 'الفريق والأدوار (RBAC)', href: '/admin/users', icon: ShieldAlert },
    { name: 'إعدادات المنظومة', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  const currentRoleInfo = userRole ? ROLE_LABELS[userRole] || { label: userRole, color: 'text-outline' } : null;

  return (
    <aside
      className={`fixed top-0 right-0 h-screen z-50 bg-surface-container-lowest/95 border-l border-white/5 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Brand Header */}
      <div className="overflow-y-auto">
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <img
              src="/logo.svg"
              alt="Black Spider Admin"
              className="w-9 h-9 object-contain drop-shadow-[0_0_10px_rgba(255,0,60,0.5)] shrink-0"
            />
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-sm text-text-primary tracking-tight">
                  بلاك سبايدر
                </span>
                <span className="text-[10px] text-primary font-mono tracking-widest font-semibold uppercase">
                  ADMIN CONTROL
                </span>
              </div>
            )}
          </Link>

          {/* Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-white transition-colors"
            type="button"
            title={collapsed ? 'توسيع القائمة' : 'طي القائمة'}
          >
            {collapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-primary-container text-white shadow-lg shadow-glow-crimson/30 font-bold'
                    : 'text-on-surface-variant hover:text-white hover:bg-surface-container'
                }`}
                title={collapsed ? link.name : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile and Site Link */}
      <div className="p-3 border-t border-white/5 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-all"
          title="معاينة الموقع العام"
        >
          <ExternalLink className="w-4 h-4 text-primary shrink-0" />
          {!collapsed && <span>معاينة الموقع العام</span>}
        </Link>

        {/* User Card */}
        {userProfile ? (
          <div className="p-2.5 rounded-xl bg-surface-container-low border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-full bg-primary-container/20 border border-primary/40 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                  {userProfile.full_name?.substring(0, 2) || 'BS'}
                </div>
                {!collapsed && (
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-text-primary truncate">
                      {userProfile.full_name}
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-mono truncate">
                      {userProfile.email}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {!collapsed && (
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${currentRoleInfo?.color}`}>
                  {currentRoleInfo?.label}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                  type="button"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>خروج</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/admin/login"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-primary-container/20 hover:bg-primary-container/30 border border-primary/40 text-primary text-xs font-semibold transition-all"
            title="تسجيل الدخول الإداري"
          >
            <LogIn className="w-4 h-4 shrink-0" />
            {!collapsed && <span>تسجيل الدخول الإداري</span>}
          </Link>
        )}

        {/* Supabase Status Pill */}
        {!collapsed && (
          <div className="px-2 py-1 flex items-center justify-between text-[10px] font-mono text-on-surface-variant">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              SUPABASE v17 LIVE
            </span>
            <span>RLS ACTIVE</span>
          </div>
        )}
      </div>
    </aside>
  );
}
