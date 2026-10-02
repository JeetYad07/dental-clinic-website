import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  Shield,
  ArrowRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Logo theme="dark" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Contemporary high-precision dentistry delivering compassionate, anxiety-free oral
              healthcare in the heart of Electronic City Bangalore.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 shadow-xs">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-white">4.9 / 5.0</span>
              <span className="text-xs text-slate-400">• 480+ Google Reviews</span>
            </div>
          </div>

          {/* Column 2: Clinic Location & Direction */}
          <div className="space-y-3">
            <h4 className="text-[16px] font-bold text-white tracking-wide">Clinic Location</h4>
            <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-1" />
              <p>
                Malligue Residency, 16th Cross Road, Neeladri Nagar, Electronic City Phase I,
                Doddathoguru, Karnataka 560100
              </p>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Plus Code: <strong className="text-cyan-400">RJRW+C3 Doddathoguru</strong>
            </p>
            <a
              href="https://maps.google.com/?q=Tooth+Story+Dental+Clinic+Neeladri+Nagar+Electronic+City"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors pt-1"
            >
              <span>Get Google Maps Directions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Column 3: Hours & Contact */}
          <div className="space-y-3">
            <h4 className="text-[16px] font-bold text-white tracking-wide">Clinic Hours</h4>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>
                <strong className="text-white">Mon – Sun:</strong> 9:00 AM – 10:00 PM
              </span>
            </div>
            <p className="text-xs text-teal-400 font-semibold">
              ✓ Open All 7 Days till 10 PM
            </p>
            <div className="pt-2 flex flex-col gap-1">
              <span className="text-xs text-slate-500">Reception Helpline:</span>
              <a
                href="tel:09036940356"
                className="text-lg font-extrabold text-white hover:text-cyan-400 transition-colors font-mono"
              >
                090369 40356
              </a>
            </div>
          </div>

          {/* Column 4: Quick Connect & Fast Actions */}
          <div className="space-y-4">
            <h4 className="text-[16px] font-bold text-white tracking-wide">Quick Connect</h4>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://wa.me/919036940356?text=Hi%20Tooth%20Story%20Clinic%2C%20I'd%20like%20to%20book%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all shadow-md w-fit active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp 1-Click Desk</span>
              </a>
              <Link
                href="/treatments"
                className="text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2 pt-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Transparent Treatment Tariff</span>
              </Link>
              <Link
                href="/reviews"
                className="text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Verified Google Reviews (4.9★)</span>
              </Link>
              <Link
                href="/patient-portal"
                className="text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Patient Care Tracker</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Staff Links Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Tooth Story Dental Clinic. All rights reserved. Electronic City, Bengaluru.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/treatments" className="hover:text-slate-300 transition-colors">
              Treatments
            </Link>
            <Link href="/doctors" className="hover:text-slate-300 transition-colors">
              Doctors
            </Link>
            <Link href="/gallery" className="hover:text-slate-300 transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="text-cyan-400 hover:text-cyan-300 transition-colors font-bold">
              Clinic Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
