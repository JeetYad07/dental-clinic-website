import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { getGallery } from '@/services/gallery';
import { Sparkles, ShieldCheck, Camera, Eye } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clinic Ambience & Sterilization Gallery | Tooth Story Dental Clinic',
  description:
    'Take a photo tour of Tooth Story Dental Clinic in Electronic City Bangalore. Explore our sterile operatory suites, patient lounge, RVG digital X-rays, and sterilization room.',
};

export default async function GalleryPage() {
  const gallery = await getGallery();

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Header />

      <main className="w-full pt-28 pb-16 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200/60 px-3.5 py-1 text-xs font-bold text-teal-800 uppercase tracking-wider mb-3">
              <Camera className="w-4 h-4 text-teal-600" />
              <span>Modern Clinical Ambience</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              A Look Inside Tooth Story
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Designed to feel soothing, hospitable, and impeccably sterile. We maintain rigorous
              hospital-grade sanitization protocols for every patient operatory sitting.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl bg-white overflow-hidden shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1.5 border border-slate-200/80 flex flex-col"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.badge && (
                    <div className="absolute top-4 right-4 rounded-full bg-slate-900/85 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-white shadow-xs">
                      {item.badge}
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-7 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-teal-700 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-teal-600" />
                      <span>Strict Hygiene Protocol</span>
                    </span>
                    <span className="capitalize text-slate-600 text-[11px] font-bold bg-slate-100 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
