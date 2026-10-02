'use client';

import React from 'react';
import { Phone, MessageCircle, Menu } from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-3.5 sm:px-6 border-b border-outline-variant/30 transition-all duration-200">
      {/* Left: Mobile Menu Toggle & Title Badge */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-xl bg-surface-container text-primary hover:bg-surface-container-high border border-outline-variant/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary shrink-0"
          aria-label="Toggle Staff Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-outline hidden sm:inline">
            Electronic City Phase I Clinic
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-bold bg-primary-fixed text-primary flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Live Sync
          </span>
        </div>
      </div>

      {/* Right: Quick Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <a
          href="tel:09036940356"
          className="hidden md:flex items-center gap-1.5 text-xs font-bold text-on-surface hover:text-primary transition-colors"
          title="Call Reception"
        >
          <Phone className="w-3.5 h-3.5 text-primary" />
          <span>090369 40356</span>
        </a>

        <a
          href="https://wa.me/919036940356"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all active:scale-95"
          title="WhatsApp Desk"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span className="hidden xs:inline sm:inline">WhatsApp</span>
        </a>
      </div>
    </header>
  );
};
