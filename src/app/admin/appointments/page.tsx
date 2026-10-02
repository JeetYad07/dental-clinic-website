'use client';

import React, { useState, useEffect } from 'react';
import {
  getAppointments,
  updateAppointmentStatus,
  updateAppointmentDetails,
  createAppointment,
} from '@/services/appointments';
import { Appointment, AppointmentStatus } from '@/types';
import {
  generateConfirmationMessage,
  generateReminderMessage,
  generateRescheduleMessage,
  generatePostOpCareMessage,
  getAdminWhatsAppUrl,
} from '@/lib/whatsapp';
import {
  Calendar,
  Phone,
  MessageCircle,
  Search,
  Filter,
  Plus,
  Edit2,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Stethoscope,
  X,
  Send,
  Sparkles,
} from 'lucide-react';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Selected appointment for detail / edit modal
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [editDoctor, setEditDoctor] = useState('');
  const [editChair, setEditChair] = useState('');

  // Create new appointment modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newTreatment, setNewTreatment] = useState('Root Canal Treatment');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('06:00 PM');
  const [toast, setToast] = useState<string | null>(null);

  const fetchList = async () => {
    setLoading(true);
    const list = await getAppointments();
    setAppointments(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleStatusChange = async (id: string, newStatus: AppointmentStatus) => {
    await updateAppointmentStatus(id, newStatus);
    await fetchList();
    if (selectedAppt && selectedAppt.id === id) {
      setSelectedAppt({ ...selectedAppt, status: newStatus });
    }
    triggerToast(`Appointment #${id} updated to status: ${newStatus.toUpperCase()}`);
  };

  const handleSaveDetails = async () => {
    if (!selectedAppt) return;
    await updateAppointmentDetails(selectedAppt.id, {
      notes: editNotes,
      assignedDoctor: editDoctor,
      operatoryBay: editChair,
    });
    await fetchList();
    setSelectedAppt(null);
    triggerToast(`Saved details for #${selectedAppt.id}`);
  };

  const handleCreateNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    await createAppointment(
      {
        patientName: newName,
        phone: newPhone,
        treatmentId: 'custom-treatment',
        treatmentName: newTreatment,
        preferredDate: newDate,
        preferredTime: newTime,
      },
      'admin'
    );

    setIsCreateOpen(false);
    setNewName('');
    setNewPhone('');
    await fetchList();
    triggerToast(`Created walk-in / phone appointment for ${newName}`);
  };

  const handleWhatsAppAction = (type: 'confirm' | 'reminder' | 'reschedule' | 'care', appt: Appointment) => {
    let msg = '';
    if (type === 'confirm') {
      msg = generateConfirmationMessage(
        appt.patientName,
        appt.treatmentName,
        appt.preferredDate,
        appt.preferredTime,
        appt.assignedDoctor || 'Dr. Dhanashree',
        appt.operatoryBay || 'Operatory 1'
      );
    } else if (type === 'reminder') {
      msg = generateReminderMessage(
        appt.patientName,
        appt.treatmentName,
        appt.preferredDate,
        appt.preferredTime
      );
    } else if (type === 'reschedule') {
      msg = generateRescheduleMessage(
        appt.patientName,
        appt.treatmentName,
        appt.preferredDate,
        appt.preferredTime
      );
    } else if (type === 'care') {
      msg = generatePostOpCareMessage(appt.patientName, appt.treatmentName);
    }

    const url = getAdminWhatsAppUrl(appt.phone, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
    triggerToast(`Dispatched ${type} WhatsApp message to ${appt.patientName}`);
  };

  const filtered = appointments.filter((a) => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      a.patientName.toLowerCase().includes(q) ||
      a.phone.includes(q) ||
      a.treatmentName.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-primary">Appointment Management</h1>
          <p className="text-xs text-on-surface-variant">
            View, triage, confirm, reschedule, and communicate with patients.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { label: 'All', value: 'all' },
            { label: 'Pending', value: 'pending' },
            { label: 'Confirmed', value: 'confirmed' },
            { label: 'Completed', value: 'completed' },
            { label: 'Rescheduled', value: 'rescheduled' },
            { label: 'Cancelled', value: 'cancelled' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === tab.value
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, phone, ref..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-surface-container-low text-xs font-semibold outline-none focus:ring-2 focus:ring-primary shadow-inner"
          />
        </div>
      </div>

      {/* Appointments Table */}
      <div className="rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-on-surface">
            <thead>
              <tr className="bg-surface-container-low/70 text-outline font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Ref / Patient</th>
                <th className="py-3 px-3">Treatment</th>
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-3">Doctor / Chair</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filtered.map((appt) => (
                <tr key={appt.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-primary">{appt.patientName}</span>
                      <span className="text-[11px] text-outline font-mono">
                        #{appt.id} • {appt.phone}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="font-semibold">{appt.treatmentName}</span>
                    {appt.message && (
                      <p className="text-[11px] text-outline truncate max-w-xs mt-0.5">
                        Note: {appt.message}
                      </p>
                    )}
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex flex-col font-medium">
                      <span>{appt.preferredDate}</span>
                      <span className="text-secondary font-bold">{appt.preferredTime}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex flex-col text-[11px]">
                      <span className="font-bold text-on-surface">
                        {appt.assignedDoctor || 'Dr. Dhanashree'}
                      </span>
                      <span className="text-outline">{appt.operatoryBay || 'Operatory 01'}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <select
                      value={appt.status}
                      onChange={(e) =>
                        handleStatusChange(appt.id, e.target.value as AppointmentStatus)
                      }
                      className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold outline-none cursor-pointer border ${
                        appt.status === 'pending'
                          ? 'bg-error-container text-on-error-container border-error/30'
                          : appt.status === 'confirmed'
                          ? 'bg-secondary-fixed text-on-secondary-fixed border-secondary/30'
                          : appt.status === 'completed'
                          ? 'bg-surface-container-highest text-primary border-primary/20'
                          : 'bg-surface-container text-outline border-outline/20'
                      }`}
                    >
                      <option value="pending">PENDING</option>
                      <option value="confirmed">CONFIRMED</option>
                      <option value="completed">COMPLETED</option>
                      <option value="rescheduled">RESCHEDULED</option>
                      <option value="cancelled">CANCELLED</option>
                      <option value="no_show">NO SHOW</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* WhatsApp Trigger */}
                      <button
                        onClick={() => handleWhatsAppAction('confirm', appt)}
                        className="p-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white"
                        title="WhatsApp Patient"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      </button>

                      {/* Direct Call */}
                      <a
                        href={`tel:${appt.phone}`}
                        className="p-1.5 rounded-lg bg-surface-container-high hover:bg-primary hover:text-white text-primary transition-colors"
                        title="Call Patient"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>

                      {/* Edit Details Button */}
                      <button
                        onClick={() => {
                          setSelectedAppt(appt);
                          setEditNotes(appt.notes || '');
                          setEditDoctor(appt.assignedDoctor || 'Dr. Dhanashree');
                          setEditChair(appt.operatoryBay || 'Chair 1');
                        }}
                        className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface"
                        title="Edit / Notes"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail / Edit Modal */}
      {selectedAppt && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-outline-variant/30 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div>
                <h3 className="text-base font-bold text-primary">Appointment Details</h3>
                <p className="text-xs text-outline">Ref: #{selectedAppt.id}</p>
              </div>
              <button
                onClick={() => setSelectedAppt(null)}
                className="p-1.5 rounded-xl hover:bg-surface-container text-outline"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-surface-container-low p-4 rounded-2xl text-xs">
              <div>
                <span className="text-outline uppercase text-[10px] font-bold">Patient</span>
                <p className="font-bold text-on-surface">{selectedAppt.patientName}</p>
                <p className="text-secondary font-mono">{selectedAppt.phone}</p>
              </div>
              <div>
                <span className="text-outline uppercase text-[10px] font-bold">Slot</span>
                <p className="font-bold text-on-surface">{selectedAppt.preferredDate}</p>
                <p className="text-primary font-bold">{selectedAppt.preferredTime}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Assigned Doctor</label>
                <select
                  value={editDoctor}
                  onChange={(e) => setEditDoctor(e.target.value)}
                  className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                >
                  <option value="Dr. Dhanashree">Dr. Dhanashree (Chief Surgeon)</option>
                  <option value="Dr. Anand">Dr. Anand (Orthodontics & Implants)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Operatory Bay</label>
                <select
                  value={editChair}
                  onChange={(e) => setEditChair(e.target.value)}
                  className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                >
                  <option value="Chair 1 (Sterile Operatory 1)">Chair 1 (Sterile Operatory 1)</option>
                  <option value="Chair 2 (Pediatric & Hygiene Bay)">Chair 2 (Pediatric & Hygiene Bay)</option>
                  <option value="Chair 3 (Surgery & Implants)">Chair 3 (Surgery & Implants)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Receptionist Notes</label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={3}
                  placeholder="Add clinical observations, crown shade notes, medical history..."
                  className="w-full rounded-xl bg-surface-container-low p-3 outline-none resize-none"
                />
              </div>
            </div>

            {/* WhatsApp Quick Dispatch Actions */}
            <div className="pt-2 border-t border-outline-variant/20 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleWhatsAppAction('confirm', selectedAppt)}
                className="flex-1 py-2 px-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
              >
                <Send className="w-3 h-3" />
                <span>Confirmation</span>
              </button>
              <button
                type="button"
                onClick={() => handleWhatsAppAction('reminder', selectedAppt)}
                className="flex-1 py-2 px-3 rounded-xl bg-surface-container-high text-primary font-bold text-xs flex items-center justify-center gap-1"
              >
                <span>24h Reminder</span>
              </button>
              <button
                type="button"
                onClick={() => handleWhatsAppAction('care', selectedAppt)}
                className="flex-1 py-2 px-3 rounded-xl bg-surface-container text-on-surface font-bold text-xs flex items-center justify-center gap-1"
              >
                <span>Post-Op Care</span>
              </button>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedAppt(null)}
                className="px-4 py-2 rounded-xl bg-surface-container text-outline text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveDetails}
                className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-md"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateNew}
            className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-outline-variant/30 space-y-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <h3 className="text-base font-bold text-primary">New Walk-in / Phone Booking</h3>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="p-1.5 rounded-xl hover:bg-surface-container text-outline"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Patient Full Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  required
                  className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Mobile Number</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="9876543210"
                  required
                  className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Treatment</label>
                <input
                  type="text"
                  value={newTreatment}
                  onChange={(e) => setNewTreatment(e.target.value)}
                  placeholder="e.g. Root Canal Treatment"
                  required
                  className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                    className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant">Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="06:00 PM"
                    required
                    className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-4 py-2 rounded-xl bg-surface-container text-outline text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-md"
              >
                Create Booking
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-primary text-on-primary shadow-2xl border border-primary-fixed">
            <CheckCircle2 className="w-5 h-5 text-secondary" />
            <span className="text-xs font-bold">{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
