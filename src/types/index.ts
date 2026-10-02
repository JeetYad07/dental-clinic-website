export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'rescheduled'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export type BookingSource = 'website' | 'whatsapp' | 'admin';

export interface Appointment {
  id: string;
  clinicId: string;
  patientName: string;
  phone: string;
  email?: string;
  treatmentId: string;
  treatmentName: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // e.g. "06:00 PM"
  timeSlotCategory?: 'morning' | 'afternoon' | 'evening';
  message?: string;
  status: AppointmentStatus;
  source: BookingSource;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
  notes?: string;
  assignedDoctor?: string;
  operatoryBay?: string;
  estimatedFee?: number;
}

export interface Patient {
  id: string;
  clinicId: string;
  name: string;
  phone: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
  totalAppointments: number;
  latestAppointmentDate?: string;
  latestTreatment?: string;
  status: 'active' | 'archived';
  notes?: string;
}

export interface Treatment {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  startingPrice: number;
  priceDisplay: string;
  durationMinutes: number;
  image: string;
  icon: string;
  badge?: string;
  featured: boolean;
  active: boolean;
  benefits: string[];
  procedureSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface Doctor {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  specialties: string[];
  experienceYears: number;
  patientsTreated: string;
  rating: number;
  reviewsCount: number;
  photo: string;
  bio: string;
  chairAssignment: string;
  availableDays: string;
  shiftHours: string;
  active: boolean;
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  rating: number;
  date: string;
  treatment: string;
  location: string;
  comment: string;
  verified: boolean;
  source: 'google' | 'direct';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'operatory' | 'lounge' | 'technology' | 'sterilization';
  imageUrl: string;
  description: string;
  badge?: string;
}

export interface ClinicSettings {
  id?: string;
  clinicName: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  plusCode: string;
  landmark: string;
  operatingHours: string;
  emergencyNote: string;
  googleMapsUrl: string;
  googleRating: number;
  googleReviewsCount: number;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'staff';
  avatar?: string;
}

export interface BookingFormData {
  patientName: string;
  phone: string;
  email?: string;
  treatmentId: string;
  treatmentName: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}
