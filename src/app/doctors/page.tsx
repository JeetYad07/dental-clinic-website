import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { getDoctors } from '@/services/doctors';
import { Stethoscope, Award, Star, ShieldCheck, HeartHandshake } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Doctors & Dental Surgeons | Tooth Story Dental Clinic',
  description:
    'Meet Dr. Dhanashree (BDS, MDS Endodontist) and Dr. Anand (BDS, MDS Orthodontist). 12+ years of clinical experience delivering gentle, anxiety-free dental care in Electronic City.',
};

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Header />

      <main className="w-full pt-28 pb-16 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200/60 px-3.5 py-1 text-xs font-bold text-teal-800 uppercase tracking-wider mb-3">
              <Award className="w-4 h-4 text-teal-600" />
              <span>Certified MDS Specialists • 12+ Years Experience</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Experienced, Empathetic Clinicians
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Our specialists combine advanced postgraduate training from premier dental institutes with
              a compassionate, patient-first chairside philosophy that eliminates fear and anxiety.
            </p>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>

          {/* Philosophy Banner */}
          <div className="mt-16 rounded-3xl bg-white p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
                <HeartHandshake className="w-8 h-8 text-teal-400" />
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="text-lg font-extrabold text-slate-900">
                  The Tooth Story Gentle Care Pledge
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We listen before we treat. We explain each step thoroughly using digital screens,
                  guarantee zero hurried consultations, and prioritize preserving your natural tooth
                  structure with minimal interventions.
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
