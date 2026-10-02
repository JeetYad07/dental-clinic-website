import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { getReviews } from '@/services/reviews';
import { Star, MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Google Reviews & Patient Testimonials (4.9★) | Tooth Story Dental Clinic',
  description:
    'Read 480+ authentic 5-star Google Reviews for Tooth Story Dental Clinic in Electronic City Bengaluru. Verified feedback on root canals, braces, and extractions.',
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Header />

      <main className="w-full pt-28 pb-16 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Rating Overview Box */}
          <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] border border-slate-200/80 mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-900 border border-amber-200/80 shadow-2xs">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Google Verified Reviews</span>
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Patient Reviews & Experience
                </h1>
                <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Real feedback from IT professionals, residents, and families in Neeladri Nagar, Doddathoguru, and Electronic City Phase 1.
                </p>
              </div>

              {/* Big 4.9 Rating Box */}
              <div className="flex items-center gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-200 shrink-0">
                <div className="text-center">
                  <span className="block text-4xl font-black text-slate-900">4.9</span>
                  <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="border-l border-slate-200 pl-4 text-xs text-slate-500 space-y-1">
                  <p className="font-bold text-slate-900 text-sm">480+ Google Reviews</p>
                  <p className="text-teal-700 font-bold">98% 5-Star Ratio</p>
                  <p className="text-[11px] text-slate-400">Verified Patients</p>
                </div>
              </div>
            </div>

            {/* Keyword Mentions Strip */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
                Top Mentioned Topics:
              </span>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200/60">
                Friendly Doctor (80+)
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200/60">
                Root Canal (69+)
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200/60">
                Wisdom Tooth (44+)
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200/60">
                Braces & Aligners
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200/60">
                Clean & Hygienic
              </span>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Review Link CTA */}
          <div className="mt-16 text-center space-y-3">
            <a
              href="https://maps.google.com/?q=Tooth+Story+Dental+Clinic+Neeladri+Nagar+Electronic+City"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Leave a Google Review on Maps</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-slate-400">
              Help your Electronic City neighbors make informed oral health choices.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
