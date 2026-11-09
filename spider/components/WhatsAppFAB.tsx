'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useDataStore } from '../lib/store';

interface WhatsAppFABProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppFAB({
  phoneNumber,
  defaultMessage = 'مرحباً بلاك سبايدر، أود الاستفسار عن خدمات النمو الرقمي والحلول البرمجية.'
}: WhatsAppFABProps) {
  const { settings } = useDataStore();
  const [showTooltip, setShowTooltip] = useState(false);

  const activePhone = phoneNumber || settings?.agencyWhatsApp || '966501234567';
  const encodedMsg = encodeURIComponent(defaultMessage);
  const waUrl = `https://wa.me/${activePhone.replace(/[^0-9]/g, '')}?text=${encodedMsg}`;

  return (
    <aside aria-label="محادثة واتساب سريعة" className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="bg-surface-container-low border border-primary/30 p-3.5 rounded-2xl shadow-2xl shadow-glow-crimson/30 backdrop-blur-xl flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-200 max-w-xs">
          <div className="flex flex-col text-right">
            <span className="font-bold text-xs text-text-primary">مستشار النمو متصل الآن ⚡</span>
            <span className="text-[11px] text-on-surface-variant">الرد خلال أقل من 5 دقائق على واتساب</span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-on-surface-variant hover:text-white p-1 rounded-lg"
            type="button"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="تواصل فوري عبر واتساب"
      >
        {/* Radar ping ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping pointer-events-none"></span>

        <MessageCircle className="w-7 h-7 relative z-10 fill-white/20 stroke-[2.5]" />
      </a>
    </aside>
  );
}

