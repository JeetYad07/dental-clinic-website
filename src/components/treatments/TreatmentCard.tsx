import React from 'react';
import Link from 'next/link';
import { Treatment } from '@/types';
import {
  MessageCircle,
  Stethoscope,
  Activity,
  Layers,
  Sparkles,
  Smile,
  Shield,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface TreatmentCardProps {
  treatment: Treatment;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({ treatment }) => {
  const waMessage = `Hi Tooth Story Clinic, I'd like to book a consultation for ${treatment.name}.`;
  const waUrl = `https://wa.me/919036940356?text=${encodeURIComponent(waMessage)}`;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'medical_services':
        return <Stethoscope className="w-6 h-6 text-primary" />;
      case 'healing':
        return <Activity className="w-6 h-6 text-primary" />;
      case 'view_in_ar':
        return <Layers className="w-6 h-6 text-primary" />;
      case 'clean_hands':
        return <Sparkles className="w-6 h-6 text-primary" />;
      case 'child_care':
        return <Smile className="w-6 h-6 text-primary" />;
      default:
        return <Shield className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <div className="group flex flex-col justify-between rounded-2xl bg-white p-6 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_32px_-6px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1.5 border border-slate-200/80">
      <div>
        {/* Top Icon & Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-800 border border-cyan-100 shadow-2xs group-hover:bg-cyan-100/80 transition-colors">
            {getIcon(treatment.icon)}
          </span>
          {treatment.badge && (
            <span className="rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold text-teal-800 border border-teal-200/60 uppercase tracking-wide">
              {treatment.badge}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <Link href={`/treatments/${treatment.slug}`}>
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {treatment.name}
          </h3>
        </Link>
        <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-5">
          {treatment.shortDescription}
        </p>
      </div>

      <div>
        {/* Price & Duration */}
        <div className="mb-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
              Starting from
            </span>
            <span className="text-xl font-extrabold text-slate-900">
              ₹{treatment.startingPrice.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            <span>~{treatment.durationMinutes} mins</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="grid grid-cols-2 gap-2.5">
          <Link
            href={`/treatments/${treatment.slug}`}
            className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors text-center"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-xs font-bold text-white shadow-xs hover:shadow-md transition-all text-center active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Book WA</span>
          </a>
        </div>
      </div>
    </div>
  );
};
