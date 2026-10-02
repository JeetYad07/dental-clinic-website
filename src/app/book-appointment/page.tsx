'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { createAppointment } from '@/services/appointments';
import {
  Star,
  Phone,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  Send,
  Stethoscope,
  Activity,
  Layers,
  Sparkles,
  Sun,
  Moon,
  Sunrise,
  ShieldAlert,
} from 'lucide-react';

function BookingFlowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTreatmentParam = searchParams.get('treatment');

  const treatments = [
    {
      id: 'root-canal-treatment',
      name: 'Root Canal Treatment',
      display: 'Emergency Tooth Pain / Root Canal',
      subtext: 'Single sitting option available',
      price: 'from ₹3,500',
      icon: Activity,
    },
    {
      id: 'wisdom-tooth-extraction',
      name: 'Wisdom Tooth Extraction',
      display: 'Wisdom Tooth Extraction',
      subtext: 'Painless laser & surgical tech',
      price: 'from ₹2,500',
      icon: Stethoscope,
    },
    {
      id: 'invisible-braces-aligners',
      name: 'Invisible Braces & Aligners',
      display: 'Braces & Clear Aligners',
      subtext: 'Invisalign & Ceramic brackets',
      price: 'from ₹35,000',
      icon: Layers,
    },
    {
      id: 'teeth-cleaning-polishing',
      name: 'Teeth Cleaning & Polishing',
      display: 'Teeth Cleaning & Polishing',
      subtext: 'Ultrasonic scaling & stain wipe',
      price: 'from ₹1,200',
      icon: Sparkles,
    },
    {
      id: 'general-consultation',
      name: 'General Consultation & Digital X-Ray',
      display: 'Consultation & Digital X-Ray',
      subtext: 'Comprehensive dental checkup',
      price: '₹500',
      icon: ShieldCheck,
    },
  ];

  const [selectedTreatment, setSelectedTreatment] = useState(
    treatments.find((t) => t.name === initialTreatmentParam) || treatments[0]
  );
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedDateValue, setSelectedDateValue] = useState('');
  const [selectedTime, setSelectedTime] = useState('06:00 PM');
  const [patientName, setPatientName] = useState('Priya Sharma');
  const [patientPhone, setPatientPhone] = useState('+91 98765 43210');
  const [patientNotes, setPatientNotes] = useState('Mild pain in upper molar');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate date chips for Today, Tomorrow, +2 days, +3 days
  const [dateChips, setDateChips] = useState<
    { label: string; dayName: string; dayNum: string; isToday?: boolean; value: string }[]
  >([]);

  useEffect(() => {
    const chips = [];
    const now = new Date();
    for (let i = 0; i < 4; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      const dayName = d.toLocaleDateString('en-IN', { weekday: 'short' });
      const dayNum = d.getDate().toString();
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const value = `${yyyy}-${mm}-${dd}`;
      const label = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayName;
      chips.push({ label, dayName, dayNum, isToday: i === 0, value });
    }
    setDateChips(chips);
    setSelectedDate(chips[0].label);
    setSelectedDateValue(chips[0].value);
  }, []);

  const liveMessage = `Hi Tooth Story Official Desk,

I'd like to book an appointment:
Name: ${patientName.trim() || 'Patient'}
Phone: ${patientPhone.trim()}
Treatment: ${selectedTreatment.name}
Date: ${selectedDate} (${selectedDateValue})
Time: ${selectedTime}
${patientNotes.trim() ? `Note: ${patientNotes.trim()}` : ''}

Please confirm my slot.`;

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      alert('Please fill your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const appt = await createAppointment(
        {
          patientName,
          phone: patientPhone,
          treatmentId: selectedTreatment.id,
          treatmentName: selectedTreatment.name,
          preferredDate: selectedDateValue || new Date().toISOString().split('T')[0],
          preferredTime: selectedTime,
          message: patientNotes,
        },
        'website'
      );

      const waUrl = `https://wa.me/919036940356?text=${encodeURIComponent(liveMessage)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      setTimeout(() => {
        router.push(`/appointment-pass/${appt.id}`);
      }, 700);
    } catch (err) {
      console.error(err);
      const waUrl = `https://wa.me/919036940356?text=${encodeURIComponent(liveMessage)}`;
      window.open(waUrl, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Trust Spotlight Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] border border-slate-200/80 relative overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Tooth Story Dental Clinic</h1>
              <span className="bg-teal-50 text-teal-800 border border-teal-200/60 px-2.5 py-0.5 rounded-full text-xs font-bold">
                E-City Phase 1
              </span>
            </div>
            <div className="flex items-center gap-2.5 mt-1.5">
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-slate-900">4.9</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                (480+ Verified Google Reviews)
              </span>
            </div>
          </div>
          <a
            href="tel:09036940356"
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-xs active:scale-95 transition-all shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Desk</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 px-3 py-1 rounded-full text-slate-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Dr. Dhanashree (BDS, MDS) & Dr. Anand</span>
          </div>
          <div className="flex items-center gap-1.5 bg-teal-50 border border-teal-200/60 text-teal-800 px-3 py-1 rounded-full font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
            <span>Open Daily till 10:00 PM</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmitBooking} className="space-y-6">
        {/* STEP 1: Select Treatment */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-600" />
              <span>1. Select Treatment Concern</span>
            </h2>
            <span className="text-xs font-bold text-slate-400">Step 1 of 3</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {treatments.map((t) => {
              const isSelected = selectedTreatment.id === t.id;
              const IconComp = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTreatment(t)}
                  className={`flex items-center justify-between p-4 rounded-2xl text-left transition-all active:scale-[0.99] border ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-md border-slate-900'
                      : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-200/80 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-white/10 text-white'
                          : 'bg-cyan-50 text-cyan-800 border border-cyan-100'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate">{t.display}</p>
                      <p
                        className={`text-xs mt-0.5 ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {t.subtext}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-black shrink-0 ml-2 ${
                      isSelected ? 'text-teal-300' : 'text-slate-900'
                    }`}
                  >
                    {t.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: Date & Slot Timing */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span>2. Choose Date & Time Window</span>
            </h2>
            <span className="text-xs font-bold text-slate-400">Step 2 of 3</span>
          </div>

          {/* Quick Date Selector */}
          <div className="grid grid-cols-4 gap-2.5">
            {dateChips.map((chip) => {
              const isSelected = selectedDate === chip.label;
              return (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => {
                    setSelectedDate(chip.label);
                    setSelectedDateValue(chip.value);
                  }}
                  className={`flex flex-col items-center justify-center py-3.5 px-1 rounded-2xl text-center transition-all border ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-md border-slate-900 font-bold'
                      : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-200/80 shadow-2xs'
                  }`}
                >
                  <span className={`text-[11px] uppercase font-semibold ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>{chip.dayName}</span>
                  <span className="text-lg font-black my-0.5">{chip.dayNum}</span>
                  <span className="text-[10px] font-bold">{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Time Slot Groups */}
          <div className="space-y-3 pt-2">
            {/* Morning */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sunrise className="w-3.5 h-3.5 text-slate-400" /> Morning
              </span>
              <div className="grid grid-cols-2 gap-2">
                {['10:00 AM', '11:30 AM'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedTime === time
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Afternoon */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-slate-400" /> Afternoon
              </span>
              <div className="grid grid-cols-2 gap-2">
                {['02:00 PM', '04:30 PM'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedTime === time
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Evening (Popular) */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-teal-600" /> Evening (Popular for Tech-corridor)
              </span>
              <button
                type="button"
                onClick={() => setSelectedTime('06:00 PM')}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold border flex items-center justify-between transition-all ${
                  selectedTime === '06:00 PM'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>06:00 PM</span>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-bold">
                  Recommended Slot
                </span>
              </button>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {['07:30 PM', '08:45 PM'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedTime === time
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: Patient Quick Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-teal-600" />
              <span>3. Patient Details</span>
            </h2>
            <span className="text-xs font-bold text-slate-400">Step 3 of 3</span>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] border border-slate-200/80 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                required
                className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                WhatsApp Mobile Number
              </label>
              <input
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="+91 98765 43210"
                required
                className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 shadow-xs transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Symptom Note (Optional)
              </label>
              <textarea
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Mild sensitivity when drinking cold water"
                className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs sm:text-sm font-medium text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs transition-all resize-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Live WhatsApp Preview */}
        <div className="rounded-3xl bg-white shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] border border-slate-200/80 overflow-hidden">
          <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center font-extrabold text-xs">
                TS
              </div>
              <div>
                <p className="text-xs font-extrabold">Tooth Story Official Desk</p>
                <p className="text-[10px] text-teal-300 font-mono">+91 90369 40356 • Instant Acknowledgment</p>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
          </div>

          <div className="p-5 bg-gradient-to-b from-slate-50 to-slate-100/70">
            <div className="bg-[#E7FBEF] p-4 rounded-2xl rounded-tr-none shadow-xs text-xs font-mono leading-relaxed border border-emerald-200/70 whitespace-pre-line text-slate-800">
              {liveMessage}
            </div>
          </div>
        </div>

        {/* Submit Booking Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2.5 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
          <span>{isSubmitting ? 'Reserving Slot...' : 'Open WhatsApp & Reserve Priority Slot (+91 90369 40356)'}</span>
        </button>
      </form>
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Header />
      <main className="w-full pt-24 pb-20 flex-1">
        <Suspense fallback={<div className="text-center py-12 text-sm text-slate-400">Loading booking interface...</div>}>
          <BookingFlowContent />
        </Suspense>
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
