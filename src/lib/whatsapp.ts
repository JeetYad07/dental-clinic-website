export function cleanPhoneNumber(phone: string): string {
  if (!phone) return '919036940356';
  // Remove spaces, hyphens, parentheses, plus
  let cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  // Remove leading 0 if present (e.g. 09036940356 -> 9036940356)
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }
  // Add 91 country code for India if 10 digits
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  return cleaned;
}

export interface BookingMessagePayload {
  patientName: string;
  phone: string;
  treatmentName: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  bookingRef?: string;
}

/**
 * Generates the patient -> clinic booking request message
 */
export function generatePatientBookingMessage(data: BookingMessagePayload): string {
  const ref = data.bookingRef ? `\nReference: #${data.bookingRef}` : '';
  const note = data.message ? `\nNote: ${data.message}` : '';

  return `Hi Tooth Story Dental Clinic,

I'd like to book an appointment.

Name: ${data.patientName}
Phone: ${data.phone}
Treatment: ${data.treatmentName}
Preferred Date: ${data.preferredDate}
Preferred Time: ${data.preferredTime}${note}${ref}

Please confirm the appointment.

Thank you.`;
}

/**
 * Creates WhatsApp deep link with encoded message
 */
export function getWhatsAppBookingUrl(
  clinicWhatsAppNumber: string,
  payload: BookingMessagePayload
): string {
  const phone = cleanPhoneNumber(clinicWhatsAppNumber || '9036940356');
  const message = generatePatientBookingMessage(payload);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Admin -> Patient: Confirmation message
 */
export function generateConfirmationMessage(
  patientName: string,
  treatmentName: string,
  date: string,
  time: string,
  doctorName = 'Dr. Dhanashree',
  operatory = 'Operatory 1'
): string {
  return `Hi ${patientName},

Your appointment at Tooth Story Dental Clinic is confirmed! ✨

🗓️ Date: ${date}
⏰ Time: ${time}
🩺 Treatment: ${treatmentName}
👩‍⚕️ Consulting: ${doctorName} (${operatory})

📍 Location:
Malligue Residency, 16th Cross Rd, Neeladri Nagar, Electronic City Phase I, Bangalore
(Google Maps: https://maps.google.com/?q=Tooth+Story+Dental+Clinic+Neeladri+Nagar)

Please arrive 10 minutes prior to your slot. If you need any assistance, reply directly to this chat.

Thank you!
Tooth Story Dental Clinic`;
}

/**
 * Admin -> Patient: Reminder message
 */
export function generateReminderMessage(
  patientName: string,
  treatmentName: string,
  date: string,
  time: string
): string {
  return `Hi ${patientName},

This is a gentle reminder for your upcoming dental visit at Tooth Story Dental Clinic.

🗓️ Date: ${date}
⏰ Time: ${time}
🩺 Treatment: ${treatmentName}
📍 Neeladri Nagar, Electronic City Phase 1

Please let us know if you need to reschedule or have any questions. See you soon!

Warm regards,
Tooth Story Front Desk (090369 40356)`;
}

/**
 * Admin -> Patient: Reschedule notification
 */
export function generateRescheduleMessage(
  patientName: string,
  treatmentName: string,
  newDate: string,
  newTime: string
): string {
  return `Hi ${patientName},

Your appointment for ${treatmentName} at Tooth Story Dental Clinic has been rescheduled to:

🗓️ New Date: ${newDate}
⏰ New Time: ${newTime}

📍 Neeladri Nagar, Electronic City Phase 1

Please reply to confirm if this new time works for you.

Tooth Story Dental Clinic`;
}

/**
 * Admin -> Patient: Post-op care instructions
 */
export function generatePostOpCareMessage(
  patientName: string,
  treatmentName: string
): string {
  return `Hi ${patientName},

Thank you for visiting Tooth Story Dental Clinic for your ${treatmentName} today.

Here are your quick post-care instructions:
1. Maintain gentle oral hygiene around the treated area.
2. Avoid chewing hard or sticky foods on that side for 24-48 hours.
3. Take any prescribed medications on time.
4. If warm salt-water rinses were advised, begin 24 hours after procedure.

If you experience unexpected swelling or severe discomfort, reach our emergency helpline at 090369 40356.

Wishing you a speedy recovery!
Dr. Dhanashree & Team, Tooth Story`;
}

/**
 * Admin -> Patient: Google Review Link
 */
export function generateReviewRequestMessage(patientName: string): string {
  return `Hi ${patientName},

Thank you for trusting Tooth Story Dental Clinic with your dental care!

If you had a pleasant experience with Dr. Dhanashree and our team, we would truly appreciate it if you could leave us a quick 5-star Google review:
🌟 https://maps.google.com/?q=Tooth+Story+Dental+Clinic+Neeladri+Nagar

Your feedback helps other Electronic City families find gentle dental care.

Thank you!
Tooth Story Team`;
}

/**
 * Generates direct admin-to-patient WhatsApp link
 */
export function getAdminWhatsAppUrl(patientPhone: string, message: string): string {
  const phone = cleanPhoneNumber(patientPhone);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
