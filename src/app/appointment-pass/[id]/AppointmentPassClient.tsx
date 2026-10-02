'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Appointment } from '@/types';
import {
  CheckCircle2,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Download,
  Share2,
  Navigation,
  CreditCard,
  Check,
} from 'lucide-react';

interface AppointmentPassClientProps {
  initialAppointment: Appointment;
}

export const AppointmentPassClient: React.FC<AppointmentPassClientProps> = ({
  initialAppointment,
}) => {
  const [checklist, setChecklist] = useState({
    records: false,
    temperature: false,
    early: false,
  });

  const allChecked = checklist.records && checklist.temperature && checklist.early;

  const waCheckinUrl = `https://wa.me/919036940356?text=${encodeURIComponent(
    `Hi Tooth Story Desk, checking in for booking #${initialAppointment.id} (${initialAppointment.patientName} - ${initialAppointment.preferredTime})`
  )}`;

  const waLateUrl = `https://wa.me/919036940356?text=${encodeURIComponent(
    `Hi Desk, I am running slightly late for my ${initialAppointment.preferredTime} appointment (Ref: #${initialAppointment.id})`
  )}`;

  const handleAddToCalendar = () => {
    const title = `Dental Appointment at Tooth Story (${initialAppointment.treatmentName})`;
    const details = `Consulting with Dr. Dhanashree at Tooth Story Dental Clinic, Neeladri Nagar, Phase 1, Electronic City. Booking Ref: #${initialAppointment.id}`;
    const location = 'Tooth Story Dental Clinic, Malligue Residency, Neeladri Nagar, Electronic City, Bengaluru';
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 space-y-5 animate-in fade-in duration-300">
      {/* Status Celebration Pill */}
      <div className="flex items-center gap-3 bg-secondary/10 px-4 py-3 rounded-full border border-secondary/20">
        <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-bold text-secondary truncate">
            Booking Request Received & Desk Reserved
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-secondary/90 shrink-0">
          #{initialAppointment.id}
        </span>
      </div>

      {/* Reassurance Notification Banner */}
      <div className="bg-surface-container-low p-4 rounded-2xl shadow-sm flex items-start gap-3 border border-outline-variant/30">
        <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
          <MessageCircle className="w-4 h-4 text-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-bold text-on-surface">
            Synced with Dr. Dhanashree’s Desk
          </p>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Verified via WhatsApp assistant. Active desk reply typical time: &lt; 3 mins.
          </p>
        </div>
      </div>

      {/* TACTILE DIGITAL DENTAL BOARDING PASS */}
      <div className="bg-surface-container-lowest rounded-3xl shadow-xl overflow-hidden flex flex-col border border-outline-variant/30">
        {/* Pass Header Accent */}
        <div className="bg-primary p-4 sm:p-5 text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary-fixed" />
            <span className="text-xs font-bold text-primary-fixed tracking-wider uppercase">
              Digital Priority Pass
            </span>
          </div>
          <span className="text-[11px] font-bold text-on-primary bg-primary-container px-2.5 py-0.5 rounded-full">
            Neeladri Phase 1
          </span>
        </div>

        {/* Ticket Core Top Body */}
        <div className="p-5 sm:p-6 flex flex-col gap-4">
          {/* Clinic & Doctor Profile */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
                Consulting Specialist
              </span>
              <p className="text-lg sm:text-xl font-extrabold text-on-surface truncate">
                {initialAppointment.assignedDoctor || 'Dr. Dhanashree'}
              </p>
              <p className="text-xs text-on-surface-variant font-medium">
                BDS, MDS • Chief Dental Surgeon
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center shrink-0 overflow-hidden shadow-sm ring-2 ring-primary-fixed">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM3Rl5_qDycg5MzurdHAxFuAje-whutR9iKPsv3hzzvYNQUYYhXeuCCUlSiwgk-L-EWIvyP4BSOTXd0JfRIIa6_I4A7UIyFOh6dpuOUOo3eIdipNCFlMO3XBlT3UdisGUDch0gl4zk2vHZbQh_lZfkCOZ4dKcLqdy9gCsI-v7Pp8z-75tHoKhX1I_T25umK7r7Zi_z8c898nzWOM2kdegvm9JPn35Qnpr2hoxd_JaYVG1pv23erfnATQ"
                alt="Doctor Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Patient & Reason Bento */}
          <div className="grid grid-cols-2 gap-3 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20">
            <div className="min-w-0">
              <p className="text-[11px] text-outline font-semibold uppercase">Patient</p>
              <p className="text-xs sm:text-sm font-bold text-on-surface truncate">
                {initialAppointment.patientName}
              </p>
              <p className="text-[11px] text-on-surface-variant truncate font-mono">
                {initialAppointment.phone}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-outline font-semibold uppercase">Concern / Slot</p>
              <p className="text-xs sm:text-sm font-bold text-primary truncate">
                {initialAppointment.treatmentName}
              </p>
              <p className="text-[11px] text-secondary font-semibold truncate">
                Priority Reserved
              </p>
            </div>
          </div>

          {/* Appointment Time Focus */}
          <div className="flex items-center justify-between bg-primary-fixed/30 p-4 rounded-2xl border border-primary-fixed">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-primary uppercase font-extrabold">
                  {initialAppointment.preferredDate}
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-primary">
                  {initialAppointment.preferredTime}
                </p>
              </div>
            </div>
            <span className="text-xs bg-surface-container-lowest text-primary font-bold px-3 py-1 rounded-full shadow-sm border border-outline-variant/20">
              {initialAppointment.operatoryBay || 'Operatory 02'}
            </span>
          </div>

          {/* Billing Note */}
          <div className="flex items-center justify-between px-1 text-xs text-on-surface-variant">
            <div>
              <span>Consultation Estimate: </span>
              <strong className="text-on-surface font-bold">
                ₹{initialAppointment.estimatedFee || 500}
              </strong>
              <span className="text-[11px] text-outline"> (Pay at clinic)</span>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <CreditCard className="w-3.5 h-3.5 text-secondary" />
              <span>UPI / Cash / Card</span>
            </div>
          </div>
        </div>

        {/* Ticket Perforation Tear Line */}
        <div className="relative flex items-center justify-between my-0">
          <div className="w-4 h-8 bg-surface rounded-r-full -ml-2" />
          <div className="flex-1 mx-2 flex items-center justify-center overflow-hidden">
            <div className="w-full flex justify-between gap-1.5 opacity-40">
              {[...Array(16)].map((_, i) => (
                <span key={i} className="w-2 h-0.5 bg-outline rounded-full" />
              ))}
            </div>
          </div>
          <div className="w-4 h-8 bg-surface rounded-l-full -mr-2" />
        </div>

        {/* Ticket Express Check-in Stub */}
        <div className="p-5 sm:p-6 bg-surface-container-lowest flex flex-col items-center gap-3 text-center">
          {/* SVG Express QR Code */}
          <div className="bg-surface-container-low p-3 rounded-2xl shadow-inner border border-outline-variant/20">
            <svg className="w-28 h-28 text-primary" fill="currentColor" viewBox="0 0 100 100">
              <rect x="10" y="10" width="24" height="24" rx="4" />
              <rect x="14" y="14" width="16" height="16" fill="#faf8ff" />
              <rect x="18" y="18" width="8" height="8" />
              <rect x="66" y="10" width="24" height="24" rx="4" />
              <rect x="70" y="14" width="16" height="16" fill="#faf8ff" />
              <rect x="74" y="18" width="8" height="8" />
              <rect x="10" y="66" width="24" height="24" rx="4" />
              <rect x="14" y="70" width="16" height="16" fill="#faf8ff" />
              <rect x="18" y="74" width="8" height="8" />
              <rect x="42" y="12" width="6" height="6" />
              <rect x="52" y="18" width="6" height="6" />
              <rect x="42" y="28" width="8" height="8" />
              <rect x="44" y="44" width="12" height="12" rx="2" fill="#006c49" />
              <rect x="16" y="44" width="8" height="6" />
              <rect x="28" y="48" width="6" height="10" />
              <rect x="64" y="42" width="8" height="6" />
              <rect x="78" y="48" width="10" height="6" />
              <rect x="42" y="64" width="6" height="12" />
              <rect x="52" y="74" width="10" height="8" />
              <rect x="68" y="68" width="8" height="8" />
              <rect x="80" y="76" width="6" height="10" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface">1-Tap Express Scan at Clinic Tablet</p>
            <p className="text-[11px] text-on-surface-variant max-w-xs mt-0.5">
              Show this pass at the Tooth Story reception desk for immediate check-in without paper forms.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="space-y-2">
        <button
          onClick={handleAddToCalendar}
          className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>Add to Google / Apple Calendar</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={waCheckinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Chat</span>
          </a>

          <a
            href="https://maps.google.com/?q=Tooth+Story+Dental+Clinic+Neeladri+Nagar"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 bg-surface-container-high hover:bg-surface-container-highest text-primary rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <Navigation className="w-4 h-4 text-primary" />
            <span>Get Directions</span>
          </a>
        </div>
      </div>

      {/* Anxiety-Free Pre-Visit Preparation Card */}
      <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-sm border border-outline-variant/30 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-on-surface">Patient Care Preparation</h3>
            <p className="text-[11px] text-on-surface-variant">
              Simple steps for a seamless, pain-free appointment
            </p>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          <label className="flex items-start gap-3 p-3 bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors">
            <input
              type="checkbox"
              checked={checklist.records}
              onChange={(e) => setChecklist({ ...checklist, records: e.target.checked })}
              className="mt-0.5 w-4 h-4 rounded text-primary accent-primary"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-on-surface">Previous Records & X-Rays</p>
              <p className="text-[11px] text-on-surface-variant">
                Carry old dental scans or prescriptions if available.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors">
            <input
              type="checkbox"
              checked={checklist.temperature}
              onChange={(e) => setChecklist({ ...checklist, temperature: e.target.checked })}
              className="mt-0.5 w-4 h-4 rounded text-primary accent-primary"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-on-surface">Avoid extreme food temperatures</p>
              <p className="text-[11px] text-on-surface-variant">
                Skip ice-cold water or very hot beverages 1 hour prior to your visit.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors">
            <input
              type="checkbox"
              checked={checklist.early}
              onChange={(e) => setChecklist({ ...checklist, early: e.target.checked })}
              className="mt-0.5 w-4 h-4 rounded text-primary accent-primary"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-on-surface">Arrive 10 minutes early</p>
              <p className="text-[11px] text-on-surface-variant">
                Relaxes jaw muscles and gives ample time for digital check-in.
              </p>
            </div>
          </label>
        </div>

        {allChecked && (
          <div className="flex items-center gap-2 bg-secondary/10 px-3 py-2 rounded-xl text-secondary text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>All set! You are completely prepared for Dr. Dhanashree.</span>
          </div>
        )}

        {/* Delay / Reschedule WhatsApp Direct Trigger */}
        <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold text-on-surface">Running late in traffic?</p>
            <p className="text-[11px] text-outline">We hold your slot for 15 minutes.</p>
          </div>
          <a
            href={waLateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-primary rounded-full text-[11px] font-bold shrink-0 transition-colors"
          >
            Notify Desk
          </a>
        </div>
      </div>

      {/* Live Clinic Desk Pulse */}
      <div className="bg-surface-container-low p-4 rounded-3xl border border-outline-variant/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-bold text-on-surface">Clinic Live Status</span>
          </div>
          <span className="text-[11px] text-secondary font-bold bg-secondary-container/40 px-2.5 py-0.5 rounded-full">
            Neeladri Nagar Hub
          </span>
        </div>
        <p className="text-xs text-on-surface-variant">
          Operatories operating on schedule. Current estimated wait time is{' '}
          <strong className="text-on-surface font-bold">&lt; 7 minutes</strong>.
        </p>
        <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20 text-xs">
          <span className="text-outline">Helpline: 090369 40356</span>
          <Link href="/" className="text-primary font-bold hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
