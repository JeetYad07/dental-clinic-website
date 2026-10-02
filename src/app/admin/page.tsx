'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getAppointments,
  updateAppointmentStatus,
  getDashboardStats,
} from '@/services/appointments';
import { Appointment, AppointmentStatus } from '@/types';
import {
  generateConfirmationMessage,
  generateReminderMessage,
  generatePostOpCareMessage,
  generateReviewRequestMessage,
  getAdminWhatsAppUrl,
} from '@/lib/whatsapp';
import {
  Calendar,
  Phone,
  MessageCircle,
  Search,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  Star,
  RefreshCw,
  FolderLock,
  Eye,
  Bell,
  Sparkles,
  Stethoscope,
  Check,
  ChevronRight,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    const list = await getAppointments();
    const st = await getDashboardStats();
    setAppointments(list);
    setStats(st);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3600);
  };

  const handleApproveAndWA = async (appt: Appointment) => {
    await updateAppointmentStatus(appt.id, 'confirmed');
    await fetchDashboardData();

    const msg = generateConfirmationMessage(
      appt.patientName,
      appt.treatmentName,
      appt.preferredDate,
      appt.preferredTime,
      appt.assignedDoctor || 'Dr. Dhanashree',
      appt.operatoryBay || 'Operatory 1'
    );
    const waUrl = getAdminWhatsAppUrl(appt.phone, msg);
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    showToast(`Approved slot & generated WhatsApp confirmation for ${appt.patientName} (+91 ${appt.phone})`);
  };

  const handleSendReminder = (appt: Appointment) => {
    const msg = generateReminderMessage(
      appt.patientName,
      appt.treatmentName,
      appt.preferredDate,
      appt.preferredTime
    );
    const waUrl = getAdminWhatsAppUrl(appt.phone, msg);
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    showToast(`WhatsApp 24h reminder template queued for ${appt.patientName}`);
  };

  const handleSendCareProtocol = () => {
    showToast('Post-op guidelines PDF & audio note sent via WhatsApp to finished patients');
  };

  const handleSendReviewLink = () => {
    showToast('Google 5★ review link dispatched to 12 completed procedure patients');
  };

  const filteredAppointments = appointments.filter((a) => {
    const q = searchQuery.toLowerCase();
    return (
      a.patientName.toLowerCase().includes(q) ||
      a.phone.includes(q) ||
      a.treatmentName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Action Bar & Clinic Identity */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-outline text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              NEELADRI ROAD CLINIC • PHASE I
            </span>
            <span>•</span>
            <span className="font-semibold">Shift Console: Desk Reception 01</span>
          </div>
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              Today’s Front-Desk Dispatch
            </h1>
            <span className="text-xs sm:text-sm font-semibold text-on-surface-variant">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
              })}
            </span>
          </div>
        </div>

        {/* Quick Search & Broadcast Bar */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phone (+91) or patient name..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface text-xs font-semibold placeholder:text-outline shadow-sm border border-outline-variant/30 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={() =>
              showToast('Opening Broadcast Composer: Neeladri Road Patient Cohort (Phase I)')
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm hover:bg-primary-container transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Quick Broadcasts</span>
          </button>

          <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-2 rounded-xl shadow-sm border border-outline-variant/20 text-xs">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span className="font-bold text-on-surface">Open till 10:00 PM</span>
          </div>
        </div>
      </div>

      {/* 1. TOP KPI SUMMARY CARDS (Bento Metric Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Today's Appointments */}
        <div className="p-5 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">
              Scheduled Today
            </span>
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              {stats?.total || 24}
            </span>
            <span className="text-xs font-bold text-secondary">Total Load</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold pt-1">
            <span className="px-2 py-0.5 rounded bg-secondary-fixed/50 text-on-secondary-fixed">
              {stats?.confirmed || 18} Confirmed
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary">
              {stats?.pending || 4} Pending WA
            </span>
          </div>
        </div>

        {/* Card 2: WhatsApp Leads */}
        <div className="p-5 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">
              WhatsApp Leads
            </span>
            <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary text-[10px] font-extrabold">
              94% Responsive
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              {stats?.whatsappLeads || 14}
            </span>
            <span className="text-xs text-outline font-semibold">New Enquiries</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              Avg 3 mins response
            </span>
            <span className="font-bold text-secondary">8 slots booked</span>
          </div>
        </div>

        {/* Card 3: Collection Today */}
        <div className="p-5 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">
              Day Collection
            </span>
            <Activity className="w-5 h-5 text-tertiary" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              ₹{(stats?.totalRevenue || 48500).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-outline font-medium">12 procedures done</span>
            <span className="px-2 py-0.5 rounded bg-secondary-fixed/50 text-on-secondary-fixed font-bold">
              +18% vs yesterday
            </span>
          </div>
        </div>

        {/* Card 4: Doctors on Duty */}
        <div className="p-5 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">
              Clinicians On Floor
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
          </div>
          <div className="space-y-1 mb-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">Dr. Dhanashree</span>
              <span className="font-semibold px-2 py-0.5 rounded bg-primary-fixed text-primary text-[10px]">
                Chair 1 & 2
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-on-surface">Dr. Anand</span>
              <span className="font-semibold px-2 py-0.5 rounded bg-surface-container text-outline text-[10px]">
                Chair 3
              </span>
            </div>
          </div>
          <p className="text-[11px] text-outline font-semibold flex items-center gap-1 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
            <span>Evening Walk-in coverage active</span>
          </p>
        </div>
      </div>

      {/* MAIN 2-COLUMN CLINICAL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (8 COLS): WhatsApp Triage Queue & Templates */}
        <div className="lg:col-span-8 space-y-6">
          {/* Triage Intake Queue */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-secondary" />
                  <h2 className="text-base font-bold text-on-surface">
                    WhatsApp Triage & Intake Queue
                  </h2>
                </div>
                <p className="text-xs text-outline mt-0.5">
                  Real-time booking queries from website widget and Google Maps profile
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  Direct Sync Active
                </span>
                <button
                  onClick={fetchDashboardData}
                  className="p-1.5 rounded-xl hover:bg-surface-container text-outline"
                  title="Refresh incoming queue"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-on-surface">
                <thead>
                  <tr className="text-outline font-bold uppercase tracking-wider bg-surface-container-low/60 rounded-xl">
                    <th className="py-3 px-4 rounded-l-xl">Time / Patient</th>
                    <th className="py-3 px-3">Requested Treatment</th>
                    <th className="py-3 px-3">Preferred Slot</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right rounded-r-xl">Quick Dispatch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {filteredAppointments.slice(0, 6).map((appt) => {
                    const isPending = appt.status === 'pending';
                    const isConfirmed = appt.status === 'confirmed';

                    return (
                      <tr key={appt.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="py-3.5 px-4 rounded-l-xl">
                          <div className="flex flex-col">
                            <span className="font-bold text-on-surface text-xs">
                              {appt.patientName}
                            </span>
                            <div className="flex items-center gap-1 text-[11px] text-outline mt-0.5">
                              <Phone className="w-3 h-3 text-secondary" />
                              <span>{appt.phone}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                              appt.treatmentName.includes('Urgent') || appt.treatmentName.includes('Root')
                                ? 'bg-error-container/40 text-error'
                                : 'bg-primary-fixed text-primary'
                            }`}
                          >
                            {appt.treatmentName}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex flex-col">
                            <span className="font-semibold text-[11px] text-on-surface">
                              {appt.preferredDate}, {appt.preferredTime}
                            </span>
                            <span className="text-[10px] text-outline">
                              {appt.assignedDoctor || 'Dr. Dhanashree'}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isPending
                                ? 'bg-error-container text-on-error-container'
                                : isConfirmed
                                ? 'bg-secondary-fixed text-on-secondary-fixed'
                                : 'bg-surface-container-highest text-primary'
                            }`}
                          >
                            {isPending && (
                              <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping" />
                            )}
                            {appt.status.toUpperCase()}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right rounded-r-xl">
                          <div className="flex items-center justify-end gap-1.5">
                            {isPending ? (
                              <button
                                onClick={() => handleApproveAndWA(appt)}
                                className="px-2.5 py-1 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[11px] flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                              >
                                <Send className="w-3 h-3" />
                                <span>Approve & WA</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleSendReminder(appt)}
                                className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold text-[11px] flex items-center gap-1 transition-all"
                              >
                                <Bell className="w-3 h-3" />
                                <span>Send Reminder</span>
                              </button>
                            )}

                            <a
                              href={`tel:${appt.phone}`}
                              className="p-1 rounded-lg bg-surface-container-high hover:bg-primary hover:text-white text-primary transition-colors"
                              title="Call Patient"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs">
              <span className="text-outline">
                Showing {filteredAppointments.length} intake requests
              </span>
              <Link
                href="/admin/appointments"
                className="font-bold text-primary hover:underline flex items-center gap-1"
              >
                <span>Open Full Appointments Manager</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* WhatsApp Broadcast & Template Quick Actions */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-on-surface">
                  Front-Desk Instant Dispatch Templates
                </h3>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>4.9★ (480 Reviews)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Template 1: Appointment Reminder */}
              <div className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between space-y-3 border border-outline-variant/20">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-outline uppercase">1-Day Prior</span>
                  <h4 className="text-xs font-bold text-on-surface">Appointment Reminder</h4>
                  <p className="text-[11px] text-outline line-clamp-2">
                    &ldquo;Hello [Name], your dental sitting is confirmed at Tooth Story Neeladri Rd...&rdquo;
                  </p>
                </div>
                <button
                  onClick={() =>
                    showToast('Triggered batch WhatsApp 1-Day Prior Reminder to 18 confirmed patients')
                  }
                  className="w-full py-2 px-3 rounded-xl bg-surface-container-lowest hover:bg-primary hover:text-white text-primary text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
                >
                  <Send className="w-3 h-3" />
                  <span>Trigger Batch (18)</span>
                </button>
              </div>

              {/* Template 2: Post-Extraction Care */}
              <div className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between space-y-3 border border-outline-variant/20">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-outline uppercase">Post-Op Care</span>
                  <h4 className="text-xs font-bold text-on-surface">Post-Extraction Protocol</h4>
                  <p className="text-[11px] text-outline line-clamp-2">
                    Gauze pressure for 45 min, warm salt water rinses, soft diet tips & hotline.
                  </p>
                </div>
                <button
                  onClick={handleSendCareProtocol}
                  className="w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Care PDF</span>
                </button>
              </div>

              {/* Template 3: Google 5★ Feedback Link */}
              <div className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between space-y-3 border border-outline-variant/20">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-amber-700 uppercase">Reputation</span>
                  <h4 className="text-xs font-bold text-on-surface">Google 5★ Feedback Link</h4>
                  <p className="text-[11px] text-outline line-clamp-2">
                    Direct 1-tap review link for today&apos;s satisfied completed procedures.
                  </p>
                </div>
                <button
                  onClick={handleSendReviewLink}
                  className="w-full py-2 px-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
                >
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>Send to 12 Finished</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 COLS): Capacity Indicator & Operatory Timeline */}
        <div className="lg:col-span-4 space-y-6">
          {/* Clinic Load Index */}
          <div className="p-5 rounded-3xl bg-primary text-on-primary shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold tracking-wider text-primary-fixed">
                Clinic Load Index
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-extrabold">
                LIVE OCCUPANCY
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-extrabold leading-none">85%</span>
                <span className="text-xs text-primary-fixed">Chair Capacity</span>
              </div>
              <span className="text-xs text-primary-fixed font-bold">Peak: 6 PM – 9 PM</span>
            </div>

            <div className="w-full bg-on-primary/20 h-2.5 rounded-full overflow-hidden">
              <div className="bg-secondary-fixed h-full rounded-full w-[85%]" />
            </div>

            <div className="flex items-center justify-between text-[10px] text-primary-fixed pt-1">
              <span>Morning: Calm (50%)</span>
              <span>Afternoon: Steady (70%)</span>
              <span className="font-bold text-white">Evening: Tight (95%)</span>
            </div>
          </div>

          {/* 3 Operatory Bay Time Slots */}
          <div className="p-5 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-on-surface">Chairs Timeline</h3>
                <p className="text-[11px] text-outline">09:00 AM – 10:00 PM Slot Track</p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-surface-container text-primary">
                3 Bays
              </span>
            </div>

            {/* Chair 1: Dr. Dhanashree */}
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-primary-fixed/20 p-2 rounded-xl text-xs">
                <div className="flex items-center gap-1.5 font-bold text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Chair 1: Dr. Dhanashree</span>
                </div>
                <span className="text-[10px] text-outline font-semibold">Orthodontics & RCT</span>
              </div>

              <div className="pl-3 space-y-1.5 border-l-2 border-primary-fixed ml-2 py-0.5 text-xs">
                <div className="p-2 rounded-lg bg-surface-container-low flex justify-between items-center">
                  <div>
                    <span className="font-bold">10:00 AM</span>
                    <p className="text-[10px] text-outline">Braces Adjustment • Rohan S.</p>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary text-[10px] font-bold">
                    Completed
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-surface-container-low flex justify-between items-center">
                  <div>
                    <span className="font-bold">12:00 PM</span>
                    <p className="text-[10px] text-outline">Zirconia Crown Prep • Ananya K.</p>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                    In-Chair
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-surface-container-low flex justify-between items-center">
                  <div>
                    <span className="font-bold">04:30 PM</span>
                    <p className="text-[10px] text-outline">RCT Completion • Vikram Reddy</p>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-primary-fixed text-primary text-[10px] font-bold">
                    Confirmed
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-error-container/30 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-error">07:00 PM</span>
                    <p className="text-[10px] text-on-surface-variant">Wisdom Extraction • Priya Menon</p>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-error-container text-on-error-container text-[10px] font-bold">
                    Queued
                  </span>
                </div>
              </div>
            </div>

            {/* Chair 2: Pediatric & Hygiene */}
            <div className="space-y-2 pt-2 border-t border-outline-variant/20">
              <div className="flex items-center justify-between bg-secondary-fixed/20 p-2 rounded-xl text-xs">
                <div className="flex items-center gap-1.5 font-bold text-secondary">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Chair 2: Pediatric & Hygiene</span>
                </div>
                <span className="text-[10px] text-outline font-semibold">Preventive Bay</span>
              </div>

              <div className="pl-3 space-y-1.5 border-l-2 border-secondary-fixed ml-2 py-0.5 text-xs">
                <div className="p-2 rounded-lg bg-surface-container-low flex justify-between items-center">
                  <div>
                    <span className="font-bold">11:00 AM</span>
                    <p className="text-[10px] text-outline">Scaling & Polishing • Deepak M.</p>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary text-[10px] font-bold">
                    Done
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-surface-container-low flex justify-between items-center">
                  <div>
                    <span className="font-bold">03:00 PM</span>
                    <p className="text-[10px] text-outline">Kids Fluoride • Aarav (Age 7)</p>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>

            {/* Chair 3: Dr. Anand */}
            <div className="space-y-2 pt-2 border-t border-outline-variant/20">
              <div className="flex items-center justify-between bg-surface-container p-2 rounded-xl text-xs">
                <div className="flex items-center gap-1.5 font-bold text-on-surface">
                  <span className="w-2 h-2 rounded-full bg-primary-container" />
                  <span>Chair 3: Dr. Anand</span>
                </div>
                <span className="text-[10px] text-outline font-semibold">Implants & Surgery</span>
              </div>

              <div className="pl-3 space-y-1.5 border-l-2 border-outline-variant ml-2 py-0.5 text-xs">
                <div className="p-2 rounded-lg bg-surface-container-low flex justify-between items-center">
                  <div>
                    <span className="font-bold">02:00 PM</span>
                    <p className="text-[10px] text-outline">Implant Review • Rajesh S.</p>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-primary-fixed text-primary text-[10px] font-bold">
                    Upcoming
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* OPD Digital Archive Drawer */}
          <div className="p-4 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <FolderLock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-on-surface">OPD Digital Files</h4>
                <p className="text-[11px] text-outline">2,410 Registered E-City Families</p>
              </div>
            </div>
            <Link
              href="/admin/patients"
              className="px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold text-xs transition-colors"
            >
              Access Vault
            </Link>
          </div>
        </div>
      </div>

      {/* Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-primary text-on-primary shadow-2xl border border-primary-fixed">
            <CheckCircle2 className="w-5 h-5 text-secondary" />
            <span className="text-xs font-bold">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
