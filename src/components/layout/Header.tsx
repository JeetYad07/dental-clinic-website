'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  Calendar,
  ShieldCheck,
  MapPin,
  ChevronRight,
  Lock,
} from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Treatments', href: '/treatments' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Reviews (4.9★)', href: '/reviews' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
            {/* Left: Brand Logo */}
            <Link
              href="/"
              className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
            >
              <Logo />
            </Link>

            {/* Center: Desktop Navigation Bar */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 justify-center flex-1 max-w-2xl px-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-full text-[12.5px] xl:text-[13.5px] font-semibold transition-all duration-200 whitespace-nowrap ${
                      active
                        ? 'text-primary bg-primary/10 shadow-xs font-bold'
                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Action CTAs & Quick Info */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Phone Quick Call (2XL screens only) */}
              <a
                href="tel:09036940356"
                className="hidden 2xl:flex items-center gap-2 px-3.5 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-primary border border-outline-variant/30 transition-all text-xs font-bold"
                title="Call Reception"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span className="font-mono text-[13px]">090369 40356</span>
              </a>

              {/* Direct WhatsApp Action (XL screens only to guarantee nav space) */}
              <a
                href="https://wa.me/919036940356?text=Hi%20Tooth%20Story%20Clinic%2C%20I'd%20like%20to%20inquire%20about%20booking%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-[#25D366] text-white text-[13px] font-bold hover:bg-[#1EBE5D] transition-all shadow-[0_2px_8px_-2px_rgba(37,211,102,0.4)] hover:shadow-md active:scale-95 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>

              {/* Book Appointment CTA */}
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center gap-1.5 h-9 sm:h-10 px-3.5 sm:px-5 rounded-full bg-primary text-on-primary text-xs sm:text-[13px] font-bold hover:bg-primary-container transition-all shadow-xs hover:shadow-md active:scale-95 whitespace-nowrap shrink-0"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Book Slot</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-surface-container text-primary hover:bg-surface-container-high border border-outline-variant/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary shrink-0"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
          <div className="fixed top-16 sm:top-20 right-0 bottom-0 w-full max-w-sm bg-surface p-5 sm:p-6 shadow-2xl overflow-y-auto flex flex-col justify-between gap-6 animate-in slide-in-from-right duration-200 border-l border-outline-variant/30">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                  <span className="text-xs font-bold text-secondary">
                    Open Daily 9:00 AM – 10:00 PM
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  4.9★ Google
                </span>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all ${
                      isActive(link.href)
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </Link>
                ))}
              </div>

              {/* Patient Care Tracker Link */}
              <div className="pt-2 border-t border-outline-variant/30 space-y-1">
                <Link
                  href="/patient-portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Patient Care Tracker</span>
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-primary-fixed text-primary font-bold">
                    Demo ID
                  </span>
                </Link>
              </div>
            </div>

            {/* Mobile Bottom Contact Box & Staff Access */}
            <div className="pt-4 border-t border-outline-variant/30 space-y-2.5">
              <a
                href="tel:09036940356"
                className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-surface-container-high text-primary font-bold text-sm hover:bg-surface-container-highest transition-colors active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Call Desk: 090369 40356</span>
              </a>
              <a
                href="https://wa.me/919036940356"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-md hover:bg-[#1EBE5D] transition-colors active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Instant Booking</span>
              </a>

              {/* Clinic Staff Portal Link directly at bottom of Call Reception */}
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold text-xs shadow-sm transition-all border border-slate-700 active:scale-95"
              >
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Clinic Staff & Reception Portal</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
