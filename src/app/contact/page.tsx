import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Navigation,
  Star,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Google Map Directions | Tooth Story Dental Clinic',
  description:
    'Contact Tooth Story Dental Clinic in Neeladri Nagar, Electronic City Bengaluru. Phone: 090369 40356. Get Google Maps directions and clinic hours.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Header />

      <main className="w-full pt-28 pb-16 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200/60 px-3.5 py-1 text-xs font-bold text-teal-800 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span>Neeladri Nagar • Electronic City Phase 1</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Contact & Visit Tooth Story
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We are situated on 16th Cross Road in Malligue Residency, close to prime Electronic City
              tech parks and residential communities.
            </p>
          </div>

          {/* Main 2-Column Info & Interactive Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Contact Details (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Address Card */}
              <div className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] border border-slate-200/80 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-800 border border-cyan-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Clinic Address</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                      Malligue Residency, 16th Cross Road, Neeladri Nagar, Electronic City Phase I,
                      Doddathoguru, Karnataka 560100
                    </p>
                    <p className="text-xs text-slate-500 font-mono mt-2">
                      Plus Code: <strong className="text-teal-700">RJRW+C3 Doddathoguru</strong>
                    </p>
                    <div className="mt-2.5 text-xs text-teal-700 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Free Dedicated 4-Wheeler & 2-Wheeler Parking</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone & WhatsApp Card */}
              <div className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] border border-slate-200/80 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">Phone & Helpline</h3>
                    <a
                      href="tel:09036940356"
                      className="block text-xl font-extrabold text-slate-900 hover:text-primary transition-colors font-mono"
                    >
                      090369 40356
                    </a>
                    <p className="text-xs text-slate-500">
                      Direct Front-Desk Reception Hotline
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/919036940356?text=Hi%20Tooth%20Story%20Clinic%2C%20I'd%20like%20to%20book%20an%20appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] py-3.5 px-4 text-xs sm:text-sm font-extrabold text-white shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat with Reception on WhatsApp</span>
                </a>
              </div>

              {/* Hours Card */}
              <div className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800 border border-amber-100">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Operating Hours</h3>
                    <p className="text-xs sm:text-sm font-bold text-slate-800">
                      Mon – Sun: 9:00 AM – 10:00 PM
                    </p>
                    <p className="text-xs text-teal-700 font-semibold">Open all 7 days a week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Map & Directions (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] border border-slate-200/80 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold text-slate-900">
                      Tooth Story Dental Clinic (4.9★ / 480+ Reviews)
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/60">
                    Open Now
                  </span>
                </div>

                {/* Map Graphic Container */}
                <div
                  className="h-80 w-full rounded-2xl bg-slate-100 shadow-xs bg-cover bg-center overflow-hidden border border-slate-200 flex flex-col justify-between p-5"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBeNK7d7UbSikwDh3d7tNFX386Iz3X_Pw_fsgyz4Y6fwHrtalUHfbLFhI2iYChsGHbk2gwb4WeVu0Y0ddgBDNIWxuZeKT3YCaPEyQlZ9ib7LeclGL_sc7QM4kD33Jurk80uNdhmLVxBUwKmshAp4Q6sHoD0AXkXXx7tnj6-_wSVkdj71j1_eeFYoExKMqvSOQXk8A9TJCUp8E51QIhlseosBG_-h5-05343NaDtrI_6zEwI8nDu_xJNBQ')`,
                  }}
                >
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-sm max-w-xs border border-slate-200 space-y-1">
                    <p className="text-xs font-bold text-slate-900">Tooth Story Dental Clinic</p>
                    <p className="text-[11px] text-slate-600 leading-tight">
                      Opp. Ajmera Infinity, 2 min from Wipro Gate 5, Neeladri Rd
                    </p>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Tooth+Story+Dental+Clinic+Neeladri+Nagar+Electronic+City"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start rounded-full bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 text-xs font-bold shadow-md transition-all active:scale-95"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions in Google Maps</span>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3.5 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <span className="font-bold text-slate-900 block">From Wipro Gate 5</span>
                    <span className="text-slate-500">~450 meters (2 min drive)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <span className="font-bold text-slate-900 block">From Infosys Main Gate</span>
                    <span className="text-slate-500">~1.8 km (6 min drive)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
