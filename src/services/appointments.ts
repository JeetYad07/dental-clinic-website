import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase/config';
import { Appointment, AppointmentStatus, BookingFormData, BookingSource } from '@/types';
import { INITIAL_APPOINTMENTS } from '@/lib/seed-data';
import { upsertPatientFromAppointment } from './patients';

const LOCAL_STORAGE_KEY = 'tooth_story_appointments_v1';

function getLocalAppointments(): Appointment[] {
  if (typeof window === 'undefined') return INITIAL_APPOINTMENTS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_APPOINTMENTS;
  }
}

function saveLocalAppointments(appointments: Appointment[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appointments));
  } catch (e) {
    console.error('Error saving local appointments:', e);
  }
}

/**
 * Creates a new appointment booking request
 */
export async function createAppointment(
  data: BookingFormData,
  source: BookingSource = 'website'
): Promise<Appointment> {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const id = `TS-EC-${randomNum}`;
  const now = new Date().toISOString();

  // Determine time slot category
  const timeStr = data.preferredTime.toLowerCase();
  let timeSlotCategory: 'morning' | 'afternoon' | 'evening' = 'evening';
  if (timeStr.includes('am') || timeStr.includes('10:') || timeStr.includes('11:')) {
    timeSlotCategory = 'morning';
  } else if (timeStr.includes('02:') || timeStr.includes('03:') || timeStr.includes('04:') || timeStr.includes('2:') || timeStr.includes('3:') || timeStr.includes('4:')) {
    timeSlotCategory = 'afternoon';
  }

  const newAppointment: Appointment = {
    id,
    clinicId: 'tooth-story-ecity',
    patientName: data.patientName.trim(),
    phone: data.phone.trim(),
    email: data.email?.trim() || undefined,
    treatmentId: data.treatmentId,
    treatmentName: data.treatmentName,
    preferredDate: data.preferredDate,
    preferredTime: data.preferredTime,
    timeSlotCategory,
    message: data.message?.trim() || undefined,
    status: 'pending',
    source,
    createdAt: now,
    updatedAt: now,
    assignedDoctor: 'Dr. Dhanashree',
    operatoryBay: 'Operatory 02',
    estimatedFee: data.treatmentId === 'root-canal-treatment' ? 3500 : data.treatmentId === 'wisdom-tooth-extraction' ? 2500 : 500,
  };

  // Upsert Patient record automatically
  await upsertPatientFromAppointment({
    name: newAppointment.patientName,
    phone: newAppointment.phone,
    email: newAppointment.email,
    treatmentName: newAppointment.treatmentName,
    appointmentDate: newAppointment.preferredDate,
  });

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'appointments', id);
      await setDoc(docRef, {
        ...newAppointment,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn('Firestore write fallback to local storage:', err);
    }
  }

  // Update local storage
  const current = getLocalAppointments();
  saveLocalAppointments([newAppointment, ...current]);

  return newAppointment;
}

/**
 * Retrieves appointments with optional filtering and search
 */
export async function getAppointments(filter?: {
  status?: AppointmentStatus | 'all';
  search?: string;
  date?: string;
}): Promise<Appointment[]> {
  let appointments: Appointment[] = [];

  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        appointments = snapshot.docs.map((doc) => ({
          ...(doc.data() as Appointment),
          id: doc.id,
        }));
      }
    } catch (e) {
      console.warn('Firestore read fallback to local storage:', e);
    }
  }

  if (appointments.length === 0) {
    appointments = getLocalAppointments();
  }

  // Apply in-memory filters
  if (filter) {
    if (filter.status && filter.status !== 'all') {
      appointments = appointments.filter((a) => a.status === filter.status);
    }
    if (filter.date) {
      appointments = appointments.filter((a) => a.preferredDate === filter.date);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      appointments = appointments.filter(
        (a) =>
          a.patientName.toLowerCase().includes(q) ||
          a.phone.toLowerCase().includes(q) ||
          a.treatmentName.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q)
      );
    }
  }

  return appointments;
}

/**
 * Get single appointment by ID
 */
export async function getAppointmentById(id: string): Promise<Appointment | null> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'appointments', id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { ...(snapshot.data() as Appointment), id: snapshot.id };
      }
    } catch (e) {
      console.warn('Firestore getAppointmentById fallback:', e);
    }
  }

  const list = getLocalAppointments();
  return list.find((a) => a.id === id) || null;
}

/**
 * Update appointment status (confirm, reschedule, complete, cancel)
 */
export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus,
  notes?: string
): Promise<Appointment | null> {
  const now = new Date().toISOString();
  const updates: Partial<Appointment> = {
    status,
    updatedAt: now,
  };

  if (status === 'confirmed') updates.confirmedAt = now;
  if (status === 'cancelled') updates.cancelledAt = now;
  if (notes !== undefined) updates.notes = notes;

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'appointments', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn('Firestore updateAppointmentStatus fallback:', e);
    }
  }

  const list = getLocalAppointments();
  const idx = list.findIndex((a) => a.id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates };
    saveLocalAppointments(list);
    return list[idx];
  }
  return null;
}

/**
 * Update arbitrary appointment details (doctor, chair, notes, date/time)
 */
export async function updateAppointmentDetails(
  id: string,
  data: Partial<Appointment>
): Promise<Appointment | null> {
  const now = new Date().toISOString();
  const updates = { ...data, updatedAt: now };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'appointments', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn('Firestore updateAppointmentDetails fallback:', e);
    }
  }

  const list = getLocalAppointments();
  const idx = list.findIndex((a) => a.id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates };
    saveLocalAppointments(list);
    return list[idx];
  }
  return null;
}

/**
 * Computes reception dashboard statistics
 */
export async function getDashboardStats() {
  const appointments = await getAppointments();
  
  const total = appointments.length;
  const pending = appointments.filter((a) => a.status === 'pending').length;
  const confirmed = appointments.filter((a) => a.status === 'confirmed').length;
  const completed = appointments.filter((a) => a.status === 'completed').length;
  const whatsappLeads = appointments.filter((a) => a.source === 'whatsapp' || a.source === 'website').length;

  const totalRevenue = appointments
    .filter((a) => a.status === 'completed' || a.status === 'confirmed')
    .reduce((sum, a) => sum + (a.estimatedFee || 1500), 0);

  return {
    total,
    pending,
    confirmed,
    completed,
    whatsappLeads,
    totalRevenue,
    avgResponseMinutes: 3,
    occupancyPercentage: 85,
  };
}
