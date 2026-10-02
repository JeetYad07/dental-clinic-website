'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Phone,
  Calendar,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  Stethoscope,
  ChevronDown,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { createAppointment } from '@/services/appointments';
import { cleanPhoneNumber, generatePatientBookingMessage } from '@/lib/whatsapp';

export const WhatsAppBookingWidget: React.FC = () => {
  const router = useRouter();
  const [patientName, setPatientName] = useState('Pooja Sharma');
  const [patientPhone, setPatientPhone] = useState('9876543210');
  const [treatment, setTreatment] = useState('Root Canal Treatment');
  const [treatmentId, setTreatmentId] = useState('root-canal-treatment');
  const [prefDate, setPrefDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Evening (6:00 PM)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedPassId, setSubmittedPassId] = useState<string | null>(null);

  // Set default tomorrow date
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setPrefDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const formattedDateString = prefDate
    ? (() => {
        try {
          const d = new Date(prefDate);
          return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
        } catch {
          return prefDate;
        }
      })()
    : 'tomorrow';

  const liveMessageText = `Hi Tooth Story Clinic, I'd like to book an appointment for ${
    patientName.trim() || 'Patient'
  } on ${formattedDateString} at ${timeSlot} for ${treatment}. Please confirm my slot.`;

  const waUrl = `https://wa.me/919036940356?text=${encodeURIComponent(liveMessageText)}`;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      alert('Please provide your name and mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const appt = await createAppointment(
        {
          patientName,
          phone: patientPhone,
          treatmentId,
          treatmentName: treatment,
          preferredDate: prefDate,
          preferredTime: timeSlot,
        },
        'website'
      );

      setSubmittedPassId(appt.id);

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      // Navigate to digital appointment pass confirmation screen
      setTimeout(() => {
        router.push(`/appointment-pass/${appt.id}`);
      }, 800);
    } catch (err) {
      console.error('Error creating booking:', err);
      // Fallback open WhatsApp directly
      window.open(waUrl, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  const treatmentsList = [
    { id: 'root-canal-treatment', name: 'Root Canal Treatment (Rotary / Painless)' },
    { id: 'wisdom-tooth-extraction', name: 'Wisdom Tooth Extraction' },
    { id: 'invisible-braces-aligners', name: 'Braces & Clear Aligners Consultation' },
    { id: 'teeth-cleaning-polishing', name: 'Teeth Cleaning & Whitening' },
    { id: 'ceramic-zirconia-crowns', name: 'Dental Ceramic Crown / Bridge' },
    { id: 'pediatric-dental-care', name: 'Kids / Pediatric Dentistry' },
    { id: 'general-consultation', name: 'General Checkup & X-Ray' },
  ];

  return (
    <div className="mt-12 sm:mt-16 rounded-3xl bg-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200/80">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-200/60 px-3.5 py-1 text-xs font-bold text-teal-800 tracking-wide mb-3 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
            <span>INSTANT PRIORITY DESK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Direct WhatsApp Appointment Booking
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed">
          Skip long forms. Select your slot preference — we generate your instant WhatsApp reservation
          and immediately log your priority token.
        </p>
      </div>

      {/* Grid: Left Inputs, Right WhatsApp Preview */}
      <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Patient Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 tracking-wider uppercase">
              Patient Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Pooja Sharma"
                required
                className="h-12 w-full rounded-xl bg-slate-50 border border-slate-200/80 pl-10 pr-3 text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 tracking-wider uppercase">
              WhatsApp Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-teal-600" />
              <input
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                required
                className="h-12 w-full rounded-xl bg-slate-50 border border-slate-200/80 pl-10 pr-3 text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 shadow-xs transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Treatment Select */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-xs font-bold text-slate-700 tracking-wider uppercase">
              Preferred Treatment / Concern
            </label>
            <div className="relative">
              <Stethoscope className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <select
                value={treatment}
                onChange={(e) => {
                  setTreatment(e.target.value);
                  const selected = treatmentsList.find((t) => t.name === e.target.value);
                  if (selected) setTreatmentId(selected.id);
                }}
                className="h-12 w-full rounded-xl bg-slate-50 border border-slate-200/80 pl-10 pr-10 text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs appearance-none cursor-pointer transition-all"
              >
                {treatmentsList.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 tracking-wider uppercase">
              Preferred Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={prefDate}
                onChange={(e) => setPrefDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="h-12 w-full rounded-xl bg-slate-50 border border-slate-200/80 pl-10 pr-3 text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs transition-all"
              />
            </div>
          </div>

          {/* Time Slot Select */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 tracking-wider uppercase">
              Preferred Time Window
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="h-12 w-full rounded-xl bg-slate-50 border border-slate-200/80 pl-10 pr-10 text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs appearance-none cursor-pointer transition-all"
              >
                <option value="Morning (10:00 AM)">Morning (10:00 AM)</option>
                <option value="Morning (11:30 AM)">Morning (11:30 AM)</option>
                <option value="Afternoon (02:00 PM)">Afternoon (02:00 PM)</option>
                <option value="Afternoon (04:30 PM)">Afternoon (04:30 PM)</option>
                <option value="Evening (6:00 PM)">Evening (6:00 PM) - Recommended</option>
                <option value="Evening (7:30 PM)">Evening (7:30 PM)</option>
                <option value="Late Evening (8:30 PM)">Late Evening (8:30 PM)</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Live WhatsApp Preview Box & Action (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/80 p-6 border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Live Dispatch Preview
                </span>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Direct Sync
              </span>
            </div>

            {/* Chat Bubble Presentation */}
            <div className="relative rounded-2xl bg-[#E7FBEF] p-4 shadow-sm border border-emerald-200/70">
              <div className="flex items-center justify-between gap-1.5 mb-2">
                <span className="text-xs font-bold text-teal-950">To: Tooth Story Reception</span>
                <span className="text-[11px] font-mono text-teal-800 font-semibold">090369 40356</span>
              </div>
              <p className="text-xs text-slate-800 font-mono leading-relaxed bg-white/90 p-3 rounded-xl border border-emerald-100/80 shadow-2xs">
                {liveMessageText}
              </p>
              <div className="mt-2.5 flex items-center justify-end gap-1 text-teal-800 text-[11px] font-medium">
                <span>Auto-formatted message</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              </div>
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="mt-6 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] py-3.5 px-5 text-sm font-extrabold text-white shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Reserving Slot...' : 'Open WhatsApp & Confirm (+91 90369 40356)'}</span>
            </button>
            <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Reception acknowledges & replies within 3–5 minutes during clinic hours.</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
