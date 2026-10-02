'use client';

import React from 'react';
import { Phone, MessageCircle, RefreshCw } from 'lucide-react';

export const AdminHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6 border-b border-outline-variant/30">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-outline">
          Electronic City Phase I Clinic
        </span>
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary-fixed text-primary flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Live Cloud Sync
        </span>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="tel:09036940356"
          className="flex items-center gap-1.5 text-xs font-bold text-on-surface hover:text-primary transition-colors"
        >
          <Phone className="w-4 h-4 text-primary" />
          <span>090369 40356</span>
        </a>

        <a
          href="https://wa.me/919036940356"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-sm transition-all active:scale-95"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp Direct</span>
        </a>
      </div>
    </header>
  );
};
