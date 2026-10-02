import { Doctor } from '@/types';
import { INITIAL_DOCTORS } from '@/lib/seed-data';

const DOCTORS_STORAGE_KEY = 'tooth_story_doctors_v1';

function getLocalDoctors(): Doctor[] {
  if (typeof window === 'undefined') return INITIAL_DOCTORS;
  try {
    const raw = localStorage.getItem(DOCTORS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(INITIAL_DOCTORS));
      return INITIAL_DOCTORS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_DOCTORS;
  }
}

function saveLocalDoctors(doctors: Doctor[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(doctors));
  } catch (e) {
    console.error('Error saving local doctors:', e);
  }
}

export async function getDoctors(): Promise<Doctor[]> {
  return getLocalDoctors();
}

export async function updateDoctor(id: string, updates: Partial<Doctor>): Promise<Doctor | null> {
  const list = getLocalDoctors();
  const idx = list.findIndex((d) => d.id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates };
    saveLocalDoctors(list);
    return list[idx];
  }
  return null;
}
