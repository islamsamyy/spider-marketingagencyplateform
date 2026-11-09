'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Layers,
  Package,
  FolderKanban,
  BookOpen,
  PhoneCall,
  LayoutDashboard,
  Menu,
  X,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface NavbarProps {
  activeTab?:
    | 'home'
    | 'services'
    | 'packages'
    | 'projects'
    | 'blog'
    | 'contact'
    | 'admin'
    | 'about'
    | 'dashboard'
    | 'portfolio'
    | 'pricing'
    | 'threejs';
}

export default function Navbar({ activeTab = 'home' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'AR' | 'EN'>('AR');

  const navItems = [
    { id: 'home', label: 'الرئيسية', href: '/', icon: Home },
    { id: 'services', label: 'خدماتنا', href: '/services', icon: Layers },
    { id: 'packages', label: 'الباقات والأسعار', href: '/packages', icon: Package },
    { id: 'projects', label: 'سابقة الأعمال', href: '/projects', icon: FolderKanban },
    { id: 'blog', label: 'المدونة', href: '/blog', icon: BookOpen },
    { id: 'contact', label: 'تواصل معنا', href: '/contact', icon: PhoneCall },
  ];

  return (
    <header className="fixed top-0 w-full z-40 bg-surface-glass backdrop-blur-xl border-b border-white/5 shadow-[0_12px_32px_-4px_rgba(255,0,60,0.12)]">
      <div className="h-20 w-full px-gutter flex items-center justify-between gap-space-md max-w-7xl mx-auto">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <img
            alt="Black Spider Agency Logo"
            className="h-10 w-10 object-contain drop-shadow-[0_0_12px_rgba(255,0,60,0.6)] group-hover:scale-105 transition-transform"
            src="/logo.svg"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-text-primary tracking-tight">
                بلاك سبايدر
              </span>
              <span className="text-primary font-mono text-xs uppercase tracking-widest font-semibold">
                BLACK SPIDER
              </span>
            </div>
            <span className="text-xs text-primary-fixed-dim tracking-wide">
              وكالة نمو رقمي وهندسة برمجية
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 px-2 py-1 rounded-xl bg-surface-container-lowest/80 border border-white/5 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 transition-all rounded-lg text-xs font-semibold ${
                  isActive
                    ? 'bg-surface-container-high text-primary shadow-[0_0_14px_rgba(255,0,60,0.25)] border border-primary/20'
                    : 'text-on-surface-variant hover:text-white hover:bg-surface-container'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Admin Dashboard Pill */}
          <Link
            href="/admin"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low border border-primary/25 text-primary text-xs font-semibold hover:border-primary/60 hover:bg-surface-container-high transition-all"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>لوحة الإدارة</span>
          </Link>

          {/* Primary Consultation Button */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-container text-white text-xs font-bold shadow-[0_0_24px_rgba(255,0,60,0.45)] hover:shadow-[0_0_34px_rgba(255,0,60,0.7)] hover:bg-[#e60036] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>طلب دراسة نمو مجانية</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-surface-container text-on-surface hover:text-primary transition-colors"
            type="button"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-raised border-b border-white/10 px-gutter py-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-primary-container text-white font-bold'
                    : 'text-on-surface-variant hover:text-white hover:bg-surface-container'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-primary-container text-white text-sm font-bold shadow-lg shadow-glow-crimson flex items-center justify-center gap-2"
            >
              <span>طلب دراسة نمو مجانية</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-surface-container border border-primary/20 text-primary text-xs font-semibold flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>الدخول للوحة الإدارة (Admin)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
