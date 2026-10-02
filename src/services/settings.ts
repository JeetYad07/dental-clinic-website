import { ClinicSettings } from '@/types';
import { INITIAL_CLINIC_SETTINGS } from '@/lib/seed-data';

const SETTINGS_KEY = 'tooth_story_settings_v1';

export async function getClinicSettings(): Promise<ClinicSettings> {
  if (typeof window === 'undefined') return INITIAL_CLINIC_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(INITIAL_CLINIC_SETTINGS));
      return INITIAL_CLINIC_SETTINGS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_CLINIC_SETTINGS;
  }
}

export async function updateClinicSettings(updates: Partial<ClinicSettings>): Promise<ClinicSettings> {
  const current = await getClinicSettings();
  const updated = { ...current, ...updates };
  if (typeof window !== 'undefined') {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  }
  return updated;
}
