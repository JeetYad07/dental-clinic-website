import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase/config';
import { Patient } from '@/types';
import { INITIAL_PATIENTS } from '@/lib/seed-data';

const PATIENTS_STORAGE_KEY = 'tooth_story_patients_v1';

function getLocalPatients(): Patient[] {
  if (typeof window === 'undefined') return INITIAL_PATIENTS;
  try {
    const raw = localStorage.getItem(PATIENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(INITIAL_PATIENTS));
      return INITIAL_PATIENTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_PATIENTS;
  }
}

function saveLocalPatients(patients: Patient[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(patients));
  } catch (e) {
    console.error('Error saving local patients:', e);
  }
}

export async function getPatients(search?: string): Promise<Patient[]> {
  let patients: Patient[] = [];

  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'patients'));
      if (!snapshot.empty) {
        patients = snapshot.docs.map((d) => ({
          ...(d.data() as Patient),
          id: d.id,
        }));
      }
    } catch (e) {
      console.warn('Firestore getPatients fallback:', e);
    }
  }

  if (patients.length === 0) {
    patients = getLocalPatients();
  }

  if (search) {
    const q = search.toLowerCase();
    patients = patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q) ||
        (p.email && p.email.toLowerCase().includes(q))
    );
  }

  return patients;
}

export async function getPatientById(id: string): Promise<Patient | null> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, 'patients', id));
      if (snap.exists()) {
        return { ...(snap.data() as Patient), id: snap.id };
      }
    } catch (e) {
      console.warn('Firestore getPatientById fallback:', e);
    }
  }
  const list = getLocalPatients();
  return list.find((p) => p.id === id) || null;
}

export async function upsertPatientFromAppointment(data: {
  name: string;
  phone: string;
  email?: string;
  treatmentName: string;
  appointmentDate: string;
}): Promise<Patient> {
  const cleanPhone = data.phone.replace(/\D/g, '');
  const list = getLocalPatients();
  const existing = list.find((p) => p.phone.replace(/\D/g, '') === cleanPhone);
  const now = new Date().toISOString();

  if (existing) {
    const updated: Patient = {
      ...existing,
      name: data.name || existing.name,
      email: data.email || existing.email,
      totalAppointments: (existing.totalAppointments || 1) + 1,
      latestAppointmentDate: data.appointmentDate,
      latestTreatment: data.treatmentName,
      updatedAt: now,
    };
    const updatedList = list.map((p) => (p.id === existing.id ? updated : p));
    saveLocalPatients(updatedList);
    return updated;
  } else {
    const newPatient: Patient = {
      id: `pat-${Date.now().toString(36)}`,
      clinicId: 'tooth-story-ecity',
      name: data.name,
      phone: data.phone,
      email: data.email,
      createdAt: now,
      updatedAt: now,
      totalAppointments: 1,
      latestAppointmentDate: data.appointmentDate,
      latestTreatment: data.treatmentName,
      status: 'active',
    };
    saveLocalPatients([newPatient, ...list]);
    return newPatient;
  }
}
