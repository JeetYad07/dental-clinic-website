'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Calendar,
  Activity,
  CheckCircle2,
  Maximize2,
  MessageCircle,
} from 'lucide-react';

export const ClinicVideoTourSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'tour' | 'features'>('tour');

  const tourFeatures = [
    {
      icon: MessageCircle,
      title: 'Direct WhatsApp Booking Desk',
      description: 'Select your procedure and time slot for automated WhatsApp reservation and instant priority token.',
      badge: 'Zero-Wait',
    },
    {
      icon: Smartphone,
      title: 'Digital Priority Pass & QR Check-In',
      description: 'Receive an airline-style digital boarding pass with 1-tap reception check-in and prep checklists.',
      badge: 'Fast-Track',
    },
    {
      icon: Activity,
      title: 'Post-Op Care & RVG Radiography Viewer',
      description: 'Track recovery stages, log warm saline gargles, and view high-resolution digital X-rays from home.',
      badge: 'Patient Portal',
    },
    {
      icon: ShieldCheck,
      title: 'Class-B Sterile Operatory Suites',
      description: 'Equipped with computerized painless anesthesia, rotary endodontics, and certified German biomaterials.',
      badge: '100% Sterile',
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white via-slate-50/70 to-white py-20 sm:py-28 border-y border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200/60 px-4 py-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Interactive Virtual Clinic Walkthrough</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            See How Tooth Story Works
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Watch our complete digital patient experience — from instant WhatsApp scheduling to digital boarding passes and post-care tracking.
          </p>
        </div>

        {/* Main 2-Column Grid: Video Showcase & Interactive Feature Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left / Top: Interactive Video Tour Player (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-slate-900 p-2 sm:p-3.5 shadow-2xl border border-slate-800 group overflow-hidden">
              {/* Browser Window Header Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline">
                    toothstorydental.com • Live System Tour
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 text-[10px] font-bold border border-teal-800/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    HD Walkthrough
                  </span>
                </div>
              </div>

              {/* Video Player Display */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800">
                {isPlaying ? (
                  <img
                    src="/videos/tooth-story-tour.webp"
                    alt="Tooth Story Dental Clinic Complete System Walkthrough Demo"
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-slate-950 text-white p-6 text-center">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-primary hover:bg-primary-hover text-white shadow-lg transition-transform hover:scale-105 active:scale-95 mb-3"
                    >
                      <Play className="w-7 h-7 fill-white ml-1" />
                    </button>
                    <p className="text-sm font-bold">Video Paused</p>
                    <p className="text-xs text-slate-400">Click to resume walkthrough</p>
                  </div>
                )}

                {/* Floating Player Control Bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-slate-950/85 backdrop-blur-md px-4 py-2 border border-slate-700/60 text-white shadow-lg">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      )}
                    </button>
                    <span className="text-xs font-semibold text-slate-300">
                      Tooth Story System Walkthrough
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/book-appointment"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 px-3 py-1.5 text-xs font-bold text-white transition-all active:scale-95"
                    >
                      <span>Try Live Booking</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right / Bottom: Feature Highlights Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Modernizing Dental Care in Electronic City
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Experience seamless patient-first dentistry designed around your convenience and peace of mind.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {tourFeatures.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-teal-200 transition-all group"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Consultation Slot</span>
              </Link>
              <Link
                href="/patient-portal"
                className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 px-5 py-3 text-xs sm:text-sm font-bold text-slate-700 shadow-2xs transition-colors"
              >
                <span>View Patient Portal Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
