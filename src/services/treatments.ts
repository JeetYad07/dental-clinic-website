import { Treatment } from '@/types';
import { INITIAL_TREATMENTS } from '@/lib/seed-data';

const TREATMENTS_STORAGE_KEY = 'tooth_story_treatments_v1';

function getLocalTreatments(): Treatment[] {
  if (typeof window === 'undefined') return INITIAL_TREATMENTS;
  try {
    const raw = localStorage.getItem(TREATMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(TREATMENTS_STORAGE_KEY, JSON.stringify(INITIAL_TREATMENTS));
      return INITIAL_TREATMENTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_TREATMENTS;
  }
}

function saveLocalTreatments(treatments: Treatment[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TREATMENTS_STORAGE_KEY, JSON.stringify(treatments));
  } catch (e) {
    console.error('Error saving local treatments:', e);
  }
}

export async function getTreatments(activeOnly = false): Promise<Treatment[]> {
  const list = getLocalTreatments();
  if (activeOnly) {
    return list.filter((t) => t.active);
  }
  return list;
}

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  const list = getLocalTreatments();
  return list.find((t) => t.slug === slug || t.id === slug) || null;
}

export async function updateTreatment(id: string, updates: Partial<Treatment>): Promise<Treatment | null> {
  const list = getLocalTreatments();
  const idx = list.findIndex((t) => t.id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates };
    saveLocalTreatments(list);
    return list[idx];
  }
  return null;
}

export async function createTreatment(data: Omit<Treatment, 'id'>): Promise<Treatment> {
  const id = data.slug || `treatment-${Date.now()}`;
  const newTreatment: Treatment = { ...data, id };
  const list = getLocalTreatments();
  saveLocalTreatments([...list, newTreatment]);
  return newTreatment;
}
