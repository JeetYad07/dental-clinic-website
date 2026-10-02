import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Tooth Story Dental Clinic | Electronic City Bengaluru',
  description:
    'Learn about Tooth Story Dental Clinic in Neeladri Nagar, Electronic City. Our commitment to painless clinical dentistry, sterilization standards, and patient comfort.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Header />

      <main className="w-full pt-28 pb-16 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200/60 px-3.5 py-1 text-xs font-bold text-teal-800 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Modern Clinical Dentistry With Compassion</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              About Tooth Story Dental Clinic
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Located in Malligue Residency, Neeladri Nagar, Tooth Story was founded to reimagine the
              dental clinic experience — replacing cold, anxious visits with comforting, transparent,
              and pain-free oral healthcare for Electronic City families.
            </p>
          </div>

          {/* Core Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-lg transition-all duration-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-800 border border-cyan-100 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Uncompromising Sterilization</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                We adhere to strict multi-tier sterilization protocols using Class-B vacuum autoclaves,
                individually sealed surgical instruments, and medical-grade surface disinfectants between every appointment.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-lg transition-all duration-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Anxiety-Free Chairside Manner</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Dental fear is real. Dr. Dhanashree and our clinical team explain every diagnosis on high-definition
                monitors, take time to answer questions, and employ computerized local numbing for zero pain.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-lg transition-all duration-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 border border-amber-100 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Ethical & Transparent Tariff</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                No surprises, no unnecessary procedures. Every cost estimate is laid out upfront with
                certified German materials and laboratory warranty documentation.
              </p>
            </div>
          </div>

          {/* Location & Convenience */}
          <div className="rounded-3xl bg-white p-8 md:p-12 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Community Focused
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  In the Heart of Electronic City Phase 1
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Situated conveniently on 16th Cross Road, Neeladri Nagar (opp. Ajmera Infinity and 2 minutes from Wipro Gate 5),
                  our clinic offers extended evening consulting hours till 10:00 PM to accommodate busy tech schedules.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="https://wa.me/919036940356"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp Clinic Desk</span>
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-colors"
                  >
                    <span>View Map & Directions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs border border-slate-200">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDymdUnAIqw4XrHPcPKCq7rwJ1_1c2vit0vogCULnfub7fLMND23_9GthoXlDOEgVXqsiCKCsc3CmLilSCiLBqwsdquTCdMZy99YK2YmCVVSUfVIf2hjt9mNI1bdNMcO3xqw9Rcuqra97SHJdLbN2opdBHngnwYqiLBwZXzf6pciNIb8hhY1pHLMvVXWrc1Z4zNU8j-UOItws3PuVJ4UHWAgWne9vHt_3RwBfbuD8lavG6AReYUB1ZOxg"
                  alt="Tooth Story Patient Reception"
                  className="w-full h-full object-cover"
                />
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
