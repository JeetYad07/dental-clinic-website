'use client';

import React, { useState, useEffect } from 'react';
import { getPatients } from '@/services/patients';
import { Patient } from '@/types';
import { getAdminWhatsAppUrl } from '@/lib/whatsapp';
import {
  Users,
  Search,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle2,
  FolderLock,
  Plus,
  Stethoscope,
} from 'lucide-react';

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      const list = await getPatients();
      setPatients(list);
      setLoading(false);
    };
    fetchPatients();
  }, []);

  const filtered = patients.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      (p.email && p.email.toLowerCase().includes(q)) ||
      (p.latestTreatment && p.latestTreatment.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-primary">Patient Records Database</h1>
          <p className="text-xs text-on-surface-variant">
            Electronic City OPD directory and treatment history index.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient name or phone..."
            className="w-full pl-10 pr-3 py-2 rounded-2xl bg-surface-container-lowest text-xs font-semibold outline-none focus:ring-2 focus:ring-primary shadow-sm border border-outline-variant/30"
          />
        </div>
      </div>

      {/* Patients Table */}
      <div className="rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-on-surface">
            <thead>
              <tr className="bg-surface-container-low/70 text-outline font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-3">Contact</th>
                <th className="py-3 px-3">Total Visits</th>
                <th className="py-3 px-3">Latest Treatment</th>
                <th className="py-3 px-3">Last Visit</th>
                <th className="py-3 px-4 text-right">Connect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filtered.map((patient) => {
                const waUrl = getAdminWhatsAppUrl(
                  patient.phone,
                  `Hi ${patient.name}, greetings from Tooth Story Dental Clinic Front Desk!`
                );

                return (
                  <tr key={patient.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center text-xs shrink-0">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-primary">{patient.name}</p>
                          <p className="text-[10px] text-outline font-mono">ID: {patient.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="flex flex-col">
                        <span className="font-bold font-mono">{patient.phone}</span>
                        {patient.email && <span className="text-[10px] text-outline">{patient.email}</span>}
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container font-bold text-primary text-[11px]">
                        {patient.totalAppointments} Visits
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-on-surface">
                        {patient.latestTreatment || 'Dental Consultation'}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-on-surface-variant font-medium">
                        {patient.latestAppointmentDate || 'Recent'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white"
                          title="WhatsApp Patient"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        </a>
                        <a
                          href={`tel:${patient.phone}`}
                          className="p-1.5 rounded-lg bg-surface-container-high hover:bg-primary hover:text-white text-primary transition-colors"
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
      </div>
    </div>
  );
}
