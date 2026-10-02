'use client';

import React, { useState, useEffect } from 'react';
import { getTreatments, updateTreatment, createTreatment } from '@/services/treatments';
import { Treatment } from '@/types';
import { Receipt, Edit2, Plus, CheckCircle2, Clock, X } from 'lucide-react';

export default function AdminTreatmentsPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  const [editPrice, setEditPrice] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const fetchTreatments = async () => {
    const list = await getTreatments(false);
    setTreatments(list);
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleToggleActive = async (t: Treatment) => {
    await updateTreatment(t.id, { active: !t.active });
    await fetchTreatments();
    triggerToast(`${t.name} is now ${!t.active ? 'ACTIVE' : 'INACTIVE'}`);
  };

  const handleSavePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTreatment) return;

    await updateTreatment(editingTreatment.id, {
      startingPrice: editPrice,
      priceDisplay: `Starting from ₹${editPrice.toLocaleString('en-IN')}`,
    });
    await fetchTreatments();
    setEditingTreatment(null);
    triggerToast(`Updated pricing for ${editingTreatment.name}`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-primary">Treatments & Tariff Catalog</h1>
          <p className="text-xs text-on-surface-variant">
            Manage procedures, starting prices, and public visibility.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {treatments.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
                  {t.category}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    t.active
                      ? 'bg-secondary-fixed text-on-secondary-fixed'
                      : 'bg-surface-container text-outline'
                  }`}
                >
                  {t.active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
              <h3 className="text-base font-bold text-primary">{t.name}</h3>
              <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">
                {t.shortDescription}
              </p>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-outline uppercase">Starting Price</span>
                  <p className="text-lg font-extrabold text-primary">
                    ₹{t.startingPrice.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-outline">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{t.durationMinutes}m</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingTreatment(t);
                    setEditPrice(t.startingPrice);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Price</span>
                </button>
                <button
                  onClick={() => handleToggleActive(t)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    t.active
                      ? 'bg-surface-container text-outline hover:bg-error-container hover:text-error'
                      : 'bg-secondary text-white'
                  }`}
                >
                  {t.active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Price Modal */}
      {editingTreatment && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSavePrice}
            className="w-full max-w-sm bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-outline-variant/30 space-y-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="text-sm font-bold text-primary">
                Edit Price: {editingTreatment.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingTreatment(null)}
                className="p-1 text-outline hover:text-on-surface"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-on-surface-variant">Starting Price (₹ INR)</label>
              <input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(Number(e.target.value))}
                required
                className="w-full h-11 rounded-xl bg-surface-container-low px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingTreatment(null)}
                className="px-4 py-2 rounded-xl bg-surface-container text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md"
              >
                Save Changes
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
