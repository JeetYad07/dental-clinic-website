import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { getAppointmentById } from '@/services/appointments';
import { AppointmentPassClient } from './AppointmentPassClient';

interface AppointmentPassPageProps {
  params: {
    id: string;
  };
}

export default async function AppointmentPassPage({ params }: AppointmentPassPageProps) {
  const appointment = await getAppointmentById(params.id);

  if (!appointment) {
    // If not found in server DB, render with client fallback
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <Header />
        <main className="w-full pt-24 pb-20 flex-1">
          <AppointmentPassClient initialAppointment={{
            id: params.id,
            clinicId: 'tooth-story-ecity',
            patientName: 'Priya Sharma',
            phone: '+91 98765 43210',
            treatmentId: 'root-canal-treatment',
            treatmentName: 'Root Canal Treatment',
            preferredDate: new Date().toISOString().split('T')[0],
            preferredTime: '06:00 PM',
            status: 'pending',
            source: 'website',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            assignedDoctor: 'Dr. Dhanashree',
            operatoryBay: 'Operatory 02',
            estimatedFee: 500,
          }} />
        </main>
        <Footer />
        <MobileStickyBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="w-full pt-24 pb-20 flex-1">
        <AppointmentPassClient initialAppointment={appointment} />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
