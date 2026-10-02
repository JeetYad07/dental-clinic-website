import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { TreatmentCard } from '@/components/treatments/TreatmentCard';
import { getTreatments } from '@/services/treatments';
import { Stethoscope, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dental Treatments & Transparent Pricing | Tooth Story Dental Clinic',
  description:
    'Explore dental treatments in Electronic City, Bengaluru: Rotary Root Canal, Wisdom Tooth Extraction, Clear Aligners, Zirconia Crowns & Ultrasonic Teeth Cleaning at transparent prices.',
};

export default async function TreatmentsPage() {
  const treatments = await getTreatments(false);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Header />

      <main className="w-full pt-28 pb-16 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200/60 px-3.5 py-1 text-xs font-bold text-teal-800 uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Certified German Biomaterials • 100% Upfront Tariff</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Treatments & Transparent Tariff
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              We believe in honest, predictable dental care without surprise billing. Every procedure is
              performed using computerized precision instruments, digital RVG sensors, and painless anesthesia.
            </p>
          </div>

          {/* Treatments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((treatment) => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))}
          </div>

          {/* Quality Standards Banner */}
          <div className="mt-16 rounded-3xl bg-white p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center justify-center md:justify-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span>No Hidden Fees</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Treatment estimates are clearly presented before any procedure begins, including materials, X-rays, and medications.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center justify-center md:justify-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span>Hospital-Grade Sterilization</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Class-B vacuum autoclaves, disposable surgical kits, and ultrasonic chemical sanitization for every patient sitting.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center justify-center md:justify-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span>Direct WhatsApp Follow-ups</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Post-procedure care guidelines, prescription queries, and healing check-ins are handled promptly via WhatsApp.
                </p>
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
