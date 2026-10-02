import React from 'react';
import { Review } from '@/types';
import { Star, CheckCircle2 } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_32px_-6px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1.5 border border-slate-200/80">
      <div>
        {/* Top Stars & Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Google Verified</span>
          </span>
        </div>

        {/* Comment Quote */}
        <p className="text-sm text-slate-700 leading-relaxed italic mb-4 font-normal">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>

      {/* Author Footer */}
      <div className="mt-4 flex items-center gap-3 pt-4 border-t border-slate-100">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-900 font-extrabold text-sm border border-cyan-200/80 shadow-2xs">
          {review.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-900 truncate leading-tight">
            {review.author}
          </p>
          <p className="text-xs text-slate-600 truncate mt-0.5">
            {review.treatment} • {review.location}
          </p>
        </div>
      </div>
    </div>
  );
};
