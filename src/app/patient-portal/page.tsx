'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MessageCircle,
  Phone,
  ShieldAlert,
  AlertCircle,
  FileText,
  Sparkles,
  MapPin,
  Check,
  Stethoscope,
  Share2,
} from 'lucide-react';

export default function PatientPortalPage() {
  const [gargleCount, setGargleCount] = useState(2);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="w-full pt-24 pb-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Identity & Welcoming Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-surface-container p-6 sm:p-8 shadow-md border border-outline-variant/30">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm bg-surface-container-highest ring-2 ring-primary-fixed">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_BkSGaDF-F8QmdPSzMvp-ROW2HclDe2nw9RXqz5SsLJvfKIaVAww-lm1bL6yiKn0Hc9fHEmojdyQn_qu6svTpkParTYsp48lMZL-velmwuaxQOveJ7iqeOvQ46WSLMgpp0jfbuhlyof-s8SlRSPYpE_HWLKCRBC1Nx5yBP7hwPkDmm0vZCewjrZsZzownsfSfJm8TXEBrIsLhkfkEj5fFkm7mTOA6TwjZkgFN__lmY0uxqw_i-SgsOA"
                      alt="Patient Rajesh Sharma"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-sm">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-primary">
                      Welcome back, Rajesh Sharma
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-xs font-bold text-primary shadow-sm">
                      Active Patient
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
                    <span>
                      ID: <strong className="text-on-surface font-mono">#TS-2024-8841</strong>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-secondary" />
                      <span>Neeladri Nagar, Electronic City</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 text-xs">
                    <span className="text-outline">Primary Lead:</span>
                    <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-bold">
                      Dr. Dhanashree (Chief Surgeon)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                <a
                  href="https://wa.me/919036940356?text=Hi%20Dr.%20Dhanashree,%20Patient%20Rajesh%20Sharma%20(ID:%20TS-2024-8841)%20checking%20in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-extrabold shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Message Doctor on WhatsApp</span>
                </a>
                <a
                  href="tel:09036940356"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Main Grid: Care Plan & Appointments (8 cols) and Diagnostics/Billing (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Upcoming Session Spotlight */}
              <div className="rounded-3xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                    <span className="text-xs font-extrabold text-primary uppercase tracking-wider">
                      Upcoming Dental Sitting
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                    <span>Confirmed via WhatsApp</span>
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4 border border-outline-variant/20">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-primary">
                      Root Canal Treatment - Session 2
                    </h3>
                    <p className="text-xs font-semibold text-on-surface-variant">
                      Crown Fitting & Permanent Occlusion Seal
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1 text-on-surface font-bold">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>Thursday, Oct 24 • 06:30 PM</span>
                      </span>
                      <span>•</span>
                      <span>Operatory 2 (1st Floor)</span>
                      <span>•</span>
                      <span className="text-secondary font-bold">Dr. Dhanashree</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
                    <a
                      href="https://wa.me/919036940356?text=Hi%20Tooth%20Story,%20I%20would%20like%20to%20reschedule%20my%20appointment%20on%20Oct%2024"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-surface-container-highest hover:bg-primary-fixed text-primary text-xs font-bold transition-colors"
                    >
                      Reschedule
                    </a>
                    <button
                      onClick={() =>
                        triggerToast('Appointment synchronized with Google Calendar: Oct 24, 06:30 PM')
                      }
                      className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-colors shadow-sm"
                    >
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Care Plan & Milestone Tracker */}
              <div className="rounded-3xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/30 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-primary">Active Care Plan</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary text-xs font-bold">
                        Stage 2 of 3
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Post-pulpectomy healing & preparation for Zirconia crown seating
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-surface-container text-primary text-xs font-bold self-start sm:self-auto">
                    Recovery: Day 14
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="p-4 rounded-2xl bg-surface-container-low space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-on-surface-variant">
                    <span>Treatment Milestone Progress</span>
                    <span className="text-primary">70% Completed</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-surface-container-highest overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary via-primary-container to-secondary rounded-full"
                      style={{ width: '70%' }}
                    />
                  </div>
                  <div className="grid grid-cols-3 text-center text-[11px] font-semibold pt-1">
                    <span className="text-secondary">✓ Pulpectomy Done</span>
                    <span className="text-primary font-bold">● Crown Fitting (Next)</span>
                    <span className="text-outline">Final Occlusion & Polish</span>
                  </div>
                </div>

                {/* Post-Op Doctor Guidelines */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-primary">Post-Op Doctor Guidelines</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-surface">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm text-on-surface-variant line-through">
                          Avoid chewing hard foods on treated left molar
                        </p>
                        <p className="text-[11px] text-outline">
                          First 72-hour soft diet precaution completed cleanly.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low">
                      <button
                        onClick={() => {
                          const next = gargleCount >= 3 ? 1 : gargleCount + 1;
                          setGargleCount(next);
                          triggerToast(`Logged salt-water gargle: ${next}/3 completed for today.`);
                        }}
                        className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center shrink-0 mt-0.5 hover:bg-primary/10"
                      >
                        {gargleCount >= 3 && <Check className="w-3 h-3 text-primary" />}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-bold text-primary">
                          Warm salt water gargle 3x daily after meals
                        </p>
                        <p className="text-[11px] text-on-surface-variant">
                          Reduces gingival inflammation around the temporary seal.
                        </p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-primary text-xs font-bold shrink-0">
                        Today: {gargleCount}/3
                      </span>
                    </div>
                  </div>
                </div>

                {/* Emergency Box */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-error-container/40 text-on-error-container border border-error/20">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-error shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-error">
                        Experiencing sudden throbbing pain or swelling?
                      </p>
                      <p className="text-[11px] text-on-surface-variant">
                        Dr. Dhanashree’s team provides continuous emergency triage for registered patients.
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/919036940356?text=EMERGENCY:%20I%20am%20experiencing%20severe%20pain/swelling%20-%20Patient%20Rajesh%20Sharma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-error text-white text-xs font-bold text-center whitespace-nowrap shadow-sm hover:opacity-90 transition-opacity"
                  >
                    Emergency WhatsApp
                  </a>
                </div>
              </div>

              {/* Past Treatment Ledger */}
              <div className="rounded-3xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/30 space-y-4">
                <h3 className="text-base font-bold text-primary">Past Clinical History</h3>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-surface-container-low gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-primary">
                          Root Canal Session 1 (Pulpectomy)
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          Carried out by Dr. Anand • Thorough canal debridement & shaping
                        </p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between text-xs">
                      <span className="font-semibold text-on-surface">Oct 10, 2026</span>
                      <span className="text-secondary font-bold">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (4 Cols): Diagnostic Records & Billing */}
            <div className="lg:col-span-4 space-y-6">
              {/* Diagnostic Radiography Card */}
              <div className="rounded-3xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/30 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-primary">Diagnostic X-Ray</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary text-[11px] font-bold">
                    HD Sensor
                  </span>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-on-background aspect-[4/3] shadow-inner">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvvttDmNuNM8ZGhu9RZHO3Tp8_uNX0qFO3o2Vt7jEbnuWS2om-TzU4hoCKJQjITzgRzW0hcQgB_AC0ckHBhAxiu1DWiSWDyxOAtzAnaYDJMWgqcRRqllJ3swgISVzdIZgToKI_j8V2y_Zl2AKqgtHcF8AOIMU3doOPZkic3FMXn-qN2T1vo4-Z0v0oZShymtR4S3caWtuzvXwKkIw6rUBR3pvbWRpQe5k6nV-Z0XBpgH-9u23uGF9J7g"
                    alt="Dental Radiography Scan"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4">
                    <span className="text-xs font-bold text-white">Upper Left Molar (Tooth #27)</span>
                    <span className="text-[11px] text-primary-fixed">Digital Sensor #04 • Oct 10 Scan</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface-container-low space-y-1">
                  <span className="text-[10px] font-extrabold text-outline uppercase tracking-wider">
                    Doctor Clinical Note
                  </span>
                  <p className="text-xs text-on-surface italic leading-relaxed">
                    &ldquo;Canals cleanly obturated; no periapical lesion extension. Tooth stable & primed for Zirconia crown seating.&rdquo;
                  </p>
                </div>
              </div>

              {/* Quick Book Next Sitting */}
              <div className="rounded-3xl bg-primary p-6 text-on-primary shadow-lg space-y-4">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Need a Follow-up or Query?</h4>
                  <p className="text-xs text-primary-fixed leading-relaxed">
                    Dr. Dhanashree’s team is directly accessible via WhatsApp for our registered care tracker patients.
                  </p>
                </div>
                <a
                  href="https://wa.me/919036940356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] py-3 text-xs font-extrabold text-white shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-primary text-on-primary shadow-2xl border border-primary-fixed">
            <CheckCircle2 className="w-5 h-5 text-secondary" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
