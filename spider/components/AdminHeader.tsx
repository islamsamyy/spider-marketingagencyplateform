'use client';

import React from 'react';
import { Search, Bell, ShieldCheck } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="h-20 bg-surface-glass backdrop-blur-xl border-b border-white/5 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Title & Subtitle */}
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-text-primary tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-on-surface-variant">{subtitle}</p>}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Status Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low border border-white/5 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-on-surface-variant">SYS_PULSE:</span>
          <span className="text-emerald-400 font-bold">200 OK</span>
        </div>

        {/* Search */}
        <div className="relative hidden sm:block w-48 lg:w-64">
          <Search className="w-3.5 h-3.5 text-outline absolute right-3 top-3" />
          <input
            type="text"
            placeholder="بحث سريع..."
            className="w-full bg-surface-container pr-8 pl-3 py-1.5 rounded-lg text-xs text-on-surface placeholder:text-outline border border-white/5 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
          type="button"
          aria-label="التنبيهات"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-container"></span>
        </button>
      </div>
    </header>
  );
}
