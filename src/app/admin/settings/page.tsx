'use client';

import React, { useState, useEffect } from 'react';
import { getClinicSettings, updateClinicSettings } from '@/services/settings';
import { ClinicSettings } from '@/types';
import { Settings, Save, CheckCircle2, Phone, MessageCircle, MapPin, Clock } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      const data = await getClinicSettings();
      setSettings(data);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    await updateClinicSettings(settings);
    triggerToast('Clinic settings updated successfully');
  };

  if (loading || !settings) {
    return <div className="text-center py-12 text-xs text-outline">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 pb-12 max-w-4xl animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-extrabold text-primary">Clinic Configuration & Settings</h1>
        <p className="text-xs text-on-surface-variant">
          Maintain verified clinic details, WhatsApp integration numbers, and Google Maps links.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 space-y-6"
      >
        {/* Core Identity */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>Clinic Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-on-surface-variant">Clinic Name</label>
              <input
                type="text"
                value={settings.clinicName}
                onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                required
                className="w-full h-11 rounded-xl bg-surface-container-low px-3 font-semibold outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-on-surface-variant">Brand Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                required
                className="w-full h-11 rounded-xl bg-surface-container-low px-3 font-semibold outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers & WhatsApp */}
        <div className="pt-4 border-t border-outline-variant/20 space-y-4">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <Phone className="w-4 h-4 text-secondary" />
            <span>Communication & WhatsApp Gateway</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-on-surface-variant">Reception Phone Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="090369 40356"
                required
                className="w-full h-11 rounded-xl bg-surface-container-low px-3 font-semibold outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-on-surface-variant">
                WhatsApp Dispatch Number (Configurable)
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                placeholder="9036940356"
                required
                className="w-full h-11 rounded-xl bg-surface-container-low px-3 font-semibold outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-[10px] text-outline">
                Indian 10-digit number used for automated deep links and templates.
              </p>
            </div>
          </div>
        </div>

        {/* Physical Address & Map */}
        <div className="pt-4 border-t border-outline-variant/20 space-y-4">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Clinic Location & Maps</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-on-surface-variant">Full Physical Address</label>
              <textarea
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                rows={2}
                required
                className="w-full rounded-xl bg-surface-container-low p-3 font-semibold outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Google Plus Code</label>
                <input
                  type="text"
                  value={settings.plusCode}
                  onChange={(e) => setSettings({ ...settings, plusCode: e.target.value })}
                  className="w-full h-11 rounded-xl bg-surface-container-low px-3 font-mono outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Operating Hours</label>
                <input
                  type="text"
                  value={settings.operatingHours}
                  onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
                  className="w-full h-11 rounded-xl bg-surface-container-low px-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-on-surface-variant">Google Maps Directions URL</label>
              <input
                type="url"
                value={settings.googleMapsUrl}
                onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                required
                className="w-full h-11 rounded-xl bg-surface-container-low px-3 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Clinic Settings</span>
          </button>
        </div>
      </form>

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
