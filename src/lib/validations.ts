import { z } from 'zod';

export const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

export const bookingFormSchema = z.object({
  patientName: z
    .string()
    .min(2, 'Please enter your full name (at least 2 characters)')
    .max(80, 'Name is too long'),
  phone: z
    .string()
    .refine((val) => {
      const clean = val.replace(/[\s\-\(\)]/g, '');
      return phoneRegex.test(clean) || (clean.length === 10 && /^[6-9]\d{9}$/.test(clean));
    }, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  treatmentId: z.string().min(1, 'Please select a treatment'),
  treatmentName: z.string().min(1, 'Please select a treatment'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time slot'),
  message: z.string().max(500, 'Note cannot exceed 500 characters').optional().or(z.literal('')),
});

export const appointmentStatusSchema = z.enum([
  'pending',
  'confirmed',
  'rescheduled',
  'completed',
  'cancelled',
  'no_show',
]);

export const appointmentUpdateSchema = z.object({
  status: appointmentStatusSchema.optional(),
  assignedDoctor: z.string().optional(),
  operatoryBay: z.string().optional(),
  notes: z.string().max(1000).optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

export const patientSchema = z.object({
  name: z.string().min(2, 'Name required').max(100),
  phone: z.string().min(10, 'Valid phone required'),
  email: z.string().email().optional().or(z.literal('')),
  notes: z.string().max(1000).optional().or(z.literal('')),
});

export const clinicSettingsSchema = z.object({
  clinicName: z.string().min(2),
  tagline: z.string().min(2),
  phone: z.string().min(8),
  whatsappNumber: z.string().min(10),
  address: z.string().min(10),
  plusCode: z.string().optional().default(''),
  landmark: z.string().optional().default(''),
  operatingHours: z.string().min(3),
  emergencyNote: z.string().optional().default(''),
  googleMapsUrl: z.string().url(),
  googleRating: z.number().min(1).max(5),
  googleReviewsCount: z.number().min(0),
});
