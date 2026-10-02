import React from 'react';
import { Doctor } from '@/types';
import {
  Star,
  Award,
  Clock,
  CheckCircle2,
  MessageCircle,
  Calendar,
} from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const waUrl = `https://wa.me/919036940356?text=Hi%20Tooth%20Story%2C%20I'd%20like%20to%20book%20an%20appointment%20with%20${encodeURIComponent(
    doctor.name
  )}`;

  return (
    <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.08)] hover:shadow-[0_16px_36px_-6px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1.5 border border-slate-200/80">
      <div>
        {/* Doctor Photo & Badges */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 mb-5 border border-slate-200/60 shadow-xs">
          <img
            src={doctor.photo}
            alt={`${doctor.name} - ${doctor.designation}`}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-3.5 left-4 right-4 text-white">
            <h3 className="text-xl font-extrabold tracking-tight">{doctor.name}</h3>
            <p className="text-xs text-cyan-200 font-semibold">{doctor.qualification}</p>
          </div>
          <div className="absolute top-3 right-3 rounded-full bg-teal-600/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-xs">
            {doctor.experienceYears}+ Yrs Exp
          </div>
        </div>

        {/* Doctor Designation & Bio */}
        <div className="space-y-1.5 mb-4">
          <p className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            {doctor.designation}
          </p>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
            {doctor.bio}
          </p>
        </div>

        {/* Doctor Stats Grid */}
        <div className="grid grid-cols-3 gap-2 text-center my-4">
          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
            <span className="block text-sm font-extrabold text-slate-900">{doctor.patientsTreated}</span>
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Treated</span>
          </div>
          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
            <div className="flex items-center justify-center gap-1 text-amber-600 text-sm font-extrabold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{doctor.rating}★</span>
            </div>
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Google</span>
          </div>
          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
            <span className="block text-sm font-extrabold text-teal-700">{doctor.chairAssignment}</span>
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Suite</span>
          </div>
        </div>

        {/* Specialties Chips */}
        <div className="space-y-1.5 mb-4">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            Clinical Focus:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {doctor.specialties.map((spec, i) => (
              <span
                key={i}
                className="rounded-lg bg-slate-100 border border-slate-200/60 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>{doctor.availableDays}</span>
          </span>
          <span className="font-bold text-slate-700">{doctor.shiftHours}</span>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] py-3 px-4 text-xs font-extrabold text-white shadow-xs hover:shadow-md transition-all active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Consult {doctor.name} on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
