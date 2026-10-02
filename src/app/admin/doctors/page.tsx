'use client';

import React, { useState, useEffect } from 'react';
import { getDoctors, updateDoctor } from '@/services/doctors';
import { Doctor } from '@/types';
import { UserCheck, Star, Clock, CheckCircle2, Edit2, X } from 'lucide-react';

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [editChair, setEditChair] = useState('');
  const [editTimings, setEditTimings] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const fetchDocs = async () => {
    const list = await getDoctors();
    setDoctors(list);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctor) return;

    await updateDoctor(editingDoctor.id, {
      chairAssignment: editChair,
      shiftHours: editTimings,
    });
    await fetchDocs();
    setEditingDoctor(null);
    triggerToast(`Updated roster & floor assignment for ${editingDoctor.name}`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-extrabold text-primary">Doctor Floor Rostering & Chairs</h1>
        <p className="text-xs text-on-surface-variant">
          Manage specialist presence, assigned operatory bays, and daily consultation shifts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 space-y-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={doc.photo}
                alt={doc.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary-fixed"
              />
              <div>
                <h3 className="text-lg font-bold text-primary">{doc.name}</h3>
                <p className="text-xs text-secondary font-semibold">{doc.designation}</p>
                <p className="text-[11px] text-outline">{doc.qualification}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-3.5 rounded-2xl text-xs">
              <div>
                <span className="text-[10px] text-outline uppercase font-bold">Assigned Chair</span>
                <p className="font-bold text-primary">{doc.chairAssignment}</p>
              </div>
              <div>
                <span className="text-[10px] text-outline uppercase font-bold">Shift Schedule</span>
                <p className="font-semibold text-on-surface">{doc.shiftHours}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-outline">
                {doc.experienceYears}+ Yrs • {doc.patientsTreated} treated
              </span>
              <button
                onClick={() => {
                  setEditingDoctor(doc);
                  setEditChair(doc.chairAssignment);
                  setEditTimings(doc.shiftHours);
                }}
                className="px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Roster</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingDoctor && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveDoc}
            className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-outline-variant/30 space-y-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="text-sm font-bold text-primary">Roster: {editingDoctor.name}</h3>
              <button
                type="button"
                onClick={() => setEditingDoctor(null)}
                className="p-1 text-outline"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Chair / Bay Assignment</label>
                <input
                  type="text"
                  value={editChair}
                  onChange={(e) => setEditChair(e.target.value)}
                  placeholder="e.g. Chair 1 & 2"
                  required
                  className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Consultation Shift Hours</label>
                <input
                  type="text"
                  value={editTimings}
                  onChange={(e) => setEditTimings(e.target.value)}
                  placeholder="e.g. 09:00 AM – 02:00 PM, 05:00 PM – 10:00 PM"
                  required
                  className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => setEditingDoctor(null)}
                className="px-4 py-2 rounded-xl bg-surface-container text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md"
              >
                Update Roster
              </button>
            </div>
          </form>
        </div>
      )}

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
