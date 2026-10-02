'use client';

import React, { useState, useEffect } from 'react';
import { getReviews, addReview } from '@/services/reviews';
import { Review } from '@/types';
import { Star, Plus, CheckCircle2, X } from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [treatment, setTreatment] = useState('Root Canal Treatment');
  const [location, setLocation] = useState('Electronic City Phase 1');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [toast, setToast] = useState<string | null>(null);

  const fetchReviews = async () => {
    const list = await getReviews();
    setReviews(list);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const initials = author
      .split(' ')
      .map((w) => w.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();

    await addReview({
      author,
      initials,
      rating,
      date: 'Just now',
      treatment,
      location,
      comment,
      verified: true,
      source: 'google',
    });

    setIsAddOpen(false);
    setAuthor('');
    setComment('');
    await fetchReviews();
    triggerToast(`Added review from ${author}`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-primary">Patient Feedback & Reviews</h1>
          <p className="text-xs text-on-surface-variant">
            Google Reviews synchronization and testimonial manager.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Google Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                  Google Verified
                </span>
              </div>
              <p className="text-xs text-on-surface italic line-clamp-3">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-primary">{rev.author}</p>
                <p className="text-[10px] text-outline">{rev.treatment}</p>
              </div>
              <span className="text-[10px] text-outline">{rev.date}</span>
            </div>
          </div>
        ))}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddReview}
            className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-outline-variant/30 space-y-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="text-sm font-bold text-primary">Add Google Review Entry</h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="p-1 text-outline"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Reviewer Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Sumanth Rao"
                  required
                  className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant">Treatment</label>
                  <input
                    type="text"
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    required
                    className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant">Star Rating (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                    className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Review Text</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="Paste verified review text..."
                  required
                  className="w-full rounded-xl bg-surface-container-low p-3 outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 rounded-xl bg-surface-container text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md"
              >
                Save Review
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
