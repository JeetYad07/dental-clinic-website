import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { WhatsAppBookingWidget } from '@/components/booking/WhatsAppBookingWidget';
import { TreatmentCard } from '@/components/treatments/TreatmentCard';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { ClinicVideoTourSection } from '@/components/ui/ClinicVideoTourSection';
import { getTreatments } from '@/services/treatments';
import { getReviews } from '@/services/reviews';
import { getDoctors } from '@/services/doctors';
import {
  Star,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  Navigation,
  Sparkles,
  Activity,
  CheckCircle2,
  Stethoscope,
} from 'lucide-react';

export default async function HomePage() {
  const treatments = await getTreatments(true);
  const reviews = await getReviews();
  const doctors = await getDoctors();
  const primaryDoctor = doctors[0];

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col selection:bg-teal-100 selection:text-teal-900">
      <Header />

      <main className="w-full pt-20 flex-1">
        {/* TOP HERO & INSTANT BOOKING SECTION */}
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-100/70 via-white to-slate-50/50 pb-20 pt-10 sm:pt-14">
          {/* Subtle Ambient Medical Glow */}
          <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-cyan-100/50 blur-3xl" />
          <div className="pointer-events-none absolute top-1/3 -left-20 h-80 w-80 rounded-full bg-teal-100/40 blur-3xl" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Trust Indicator Header Badges */}
            <div className="mb-6 flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200/80 px-4 py-1.5 shadow-2xs">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs sm:text-sm font-bold text-amber-950">
                  Google Rating 4.9 ★★★★★
                </span>
                <span className="text-xs text-amber-800/80 font-medium">
                  (480+ Verified Reviews)
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-2xs border border-slate-200/80">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-700">
                  Open Daily 9:00 AM – 10:00 PM • Neeladri Rd, Electronic City Phase 1
                </span>
              </div>
            </div>

            {/* Hero Grid: Left Messaging, Right Specialist Profile Card */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 leading-[1.15] tracking-tight">
                    Gentle, World-Class Dental Care You Can Trust in{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">
                      Electronic City
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                    Dr. Dhanashree & Dr. Anand provide anxiety-free painless dentistry, precision implants, rotary
                    root canals, and clear aligners. Trusted by 480+ tech-corridor families with a 4.9★ rating.
                  </p>
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
                  <a
                    href="https://wa.me/919036940356?text=Hi%20Tooth%20Story%20Clinic%2C%20I'd%20like%20to%20book%20an%20appointment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] px-6 py-4 text-sm font-extrabold text-white shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>Book via WhatsApp (090369 40356)</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#treatments-pricing"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 px-5 py-4 text-xs sm:text-sm font-bold text-slate-700 shadow-2xs transition-colors"
                  >
                    <span>Explore Treatments & Tariff</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </a>
                </div>

                {/* Mini Guarantees Bar */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200/80">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700 border border-teal-100">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">100% Sterile & Safe</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700 border border-teal-100">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Zero Wait Priority</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700 border border-teal-100">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Rotary Painless RCT</span>
                  </div>
                </div>
              </div>

              {/* Doctor Showcase Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200/80">
                  {/* Badge */}
                  <div className="absolute -top-3.5 right-6 rounded-full bg-teal-600 px-3.5 py-1 text-xs font-extrabold text-white shadow-sm tracking-wide">
                    Painless Anesthesia Specialist
                  </div>

                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/60 shadow-xs">
                    <img
                      src={primaryDoctor.photo}
                      alt={`${primaryDoctor.name} - Chief Dental Surgeon`}
                      className="h-full w-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-3.5 left-4 right-4 text-white">
                      <p className="text-xl font-extrabold tracking-tight">{primaryDoctor.name}</p>
                      <p className="text-xs text-cyan-200 font-medium">
                        {primaryDoctor.qualification} • {primaryDoctor.experienceYears}+ Yrs Exp • Chief Dental Surgeon
                      </p>
                    </div>
                  </div>

                  {/* Doctor Meta Stats Inside Card */}
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                      <span className="block text-base font-extrabold text-slate-900">3,200+</span>
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                        Treated
                      </span>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                      <span className="block text-base font-extrabold text-amber-600">4.9★</span>
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                        Google
                      </span>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                      <span className="block text-base font-extrabold text-teal-700">10 PM</span>
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                        Evening Care
                      </span>
                    </div>
                  </div>

                  <div className="mt-3.5 flex items-center justify-between px-1 pt-1 text-xs text-slate-500">
                    <span>
                      Associated Specialist:{' '}
                      <strong className="text-slate-900 font-bold">Dr. Anand</strong> (Orthodontics & Braces)
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* INTERACTIVE 2-STEP INSTANT WHATSAPP BOOKING WIDGET */}
            <WhatsAppBookingWidget />
          </div>
        </section>

        {/* SOCIAL PROOF & REAL GOOGLE REVIEWS SECTION */}
        <section className="w-full bg-white py-20 sm:py-24 border-y border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-3.5 py-1 text-xs font-bold text-amber-900 mb-3 shadow-2xs">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Electronic City Top Rated Dental Clinic</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  4.9 Stars Based on 480 Google Reviews
                </h2>
                <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                  Read verified patient experiences from Neeladri Nagar and Electronic City IT corridor residents.
                </p>
              </div>

              {/* Keywords Mention Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200">
                  Root Canal Treatment (69+)
                </span>
                <span className="rounded-full bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200">
                  Wisdom Tooth (44+)
                </span>
                <span className="rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-bold text-teal-800 border border-teal-200/60">
                  Friendly Doctors (80+)
                </span>
                <span className="rounded-full bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200">
                  Braces & Aligners
                </span>
              </div>
            </div>

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {reviews.slice(0, 3).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm shadow-sm hover:shadow-md border border-slate-200 transition-all active:scale-95"
              >
                <span>Read All 480+ Verified Google Reviews & Testimonials</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        </section>

        {/* TREATMENTS & TRANSPARENT PRICING GRID SECTION */}
        <section className="w-full bg-slate-50/70 py-20 sm:py-28 border-b border-slate-200/80" id="treatments-pricing">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200/60 px-4 py-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider shadow-2xs">
                No Hidden Costs • 100% Upfront Tariff
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight">
                Transparent Dental Treatments
              </h2>
              <p className="text-base text-slate-600 mt-3 leading-relaxed">
                High precision instruments, computerized painless anesthesia, and top-tier certified German biomaterials at clear pricing.
              </p>
            </div>

            {/* 6 Treatments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {treatments.map((treatment) => (
                <TreatmentCard key={treatment.id} treatment={treatment} />
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE VIDEO TOUR & SYSTEM WALKTHROUGH SECTION */}
        <ClinicVideoTourSection />

        {/* CLINIC LOCATION & VISIT DETAILS SECTION */}
        <section className="w-full bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Clinic Details Column (6 Cols) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200/60 px-3.5 py-1 text-xs font-bold text-teal-800">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>Electronic City Phase 1 Clinic Hub</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Visit Tooth Story Dental Clinic
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Conveniently located in Neeladri Nagar, minutes away from Wipro, Infosys, and prime residential complexes. Easy dedicated car and two-wheeler parking available.
                </p>

                {/* Address Card */}
                <div className="rounded-2xl bg-slate-50 p-6 space-y-3 border border-slate-200">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">
                        Malligue Residency, 16th Cross Road
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                        Neeladri Nagar, Electronic City Phase I, Doddathoguru, Karnataka 560100
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs font-mono font-bold text-slate-700">
                          Plus Code: RJRW+C3 Doddathoguru
                        </span>
                        <span className="rounded-lg bg-teal-50 border border-teal-200/60 px-2.5 py-1 text-xs font-bold text-teal-800 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                          Dedicated Parking
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hours & Traffic Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="rounded-2xl bg-slate-50 p-4 flex items-center gap-3.5 border border-slate-200">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-800 border border-cyan-100">
                      <Clock className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Operating Hours</p>
                      <p className="text-sm font-extrabold text-slate-900">9 AM – 10 PM</p>
                      <p className="text-[11px] text-teal-700 font-semibold">All 7 Days Open</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 flex items-center gap-3.5 border border-slate-200">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <Activity className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Live Clinic Traffic</p>
                      <p className="text-sm font-extrabold text-slate-900">Normal Flow</p>
                      <p className="text-[11px] text-slate-500 font-medium">Appointments On Time</p>
                    </div>
                  </div>
                </div>

                {/* Direction & Call Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://maps.google.com/?q=Tooth+Story+Dental+Clinic+Neeladri+Nagar+Electronic+City"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-95"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Google Maps Directions</span>
                  </a>
                  <a
                    href="tel:09036940356"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-800 border border-slate-200 transition-all active:scale-95"
                  >
                    <Phone className="w-4 h-4 text-teal-700" />
                    <span>Call Reception: 090369 40356</span>
                  </a>
                </div>
              </div>

              {/* Clinic Interactive Map / Ambience Images (6 Cols) */}
              <div className="lg:col-span-6 space-y-4">
                {/* Location Map Visual Card */}
                <div
                  className="h-72 w-full rounded-3xl bg-slate-100 shadow-md bg-cover bg-center overflow-hidden border border-slate-200 flex flex-col justify-between p-5"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBeNK7d7UbSikwDh3d7tNFX386Iz3X_Pw_fsgyz4Y6fwHrtalUHfbLFhI2iYChsGHbk2gwb4WeVu0Y0ddgBDNIWxuZeKT3YCaPEyQlZ9ib7LeclGL_sc7QM4kD33Jurk80uNdhmLVxBUwKmshAp4Q6sHoD0AXkXXx7tnj6-_wSVkdj71j1_eeFYoExKMqvSOQXk8A9TJCUp8E51QIhlseosBG_-h5-05343NaDtrI_6zEwI8nDu_xJNBQ')`,
                  }}
                >
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 shadow-sm self-start border border-slate-200">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-900">Tooth Story • 4.9★ (480 reviews)</span>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Tooth+Story+Dental+Clinic+Neeladri+Nagar+Electronic+City"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 text-white backdrop-blur-md px-4 py-2 text-xs font-bold self-end shadow-md hover:bg-slate-900 transition-all"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Ambience Gallery Grid */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="relative h-40 overflow-hidden rounded-2xl bg-slate-100 shadow-xs border border-slate-200 group">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJn7KOXqyuoUjo4OyMhhKXJUobSBWUvII87-lfut3jAKBGxQaE0QqKK2EDRXKqJIuJhSqD_Ik7QR-Zfsp7cbGrhJ-FwgPz4pCIYjEbf_zCq3trqCtPCgXmVIdO6bE9-JQ9eNSUsayJkVRBFgiHnHhmStms4vMz_wTBaFX3--MXM0GrgBiLVjIYuerzuM2Kl1h6u99ufazkT2sKsPD88DFTjKh71YUAdUQhGUnIJ1S29uIx5_OjClWWxw"
                      alt="Operatory 1 Sterile Suite at Tooth Story"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2.5 left-2.5 rounded-lg bg-slate-950/80 px-2.5 py-1 backdrop-blur-md text-[11px] font-bold text-white shadow-xs">
                      Operatory 1 (Sterile)
                    </div>
                  </div>

                  <div className="relative h-40 overflow-hidden rounded-2xl bg-slate-100 shadow-xs border border-slate-200 group">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDymdUnAIqw4XrHPcPKCq7rwJ1_1c2vit0vogCULnfub7fLMND23_9GthoXlDOEgVXqsiCKCsc3CmLilSCiLBqwsdquTCdMZy99YK2YmCVVSUfVIf2hjt9mNI1bdNMcO3xqw9Rcuqra97SHJdLbN2opdBHngnwYqiLBwZXzf6pciNIb8hhY1pHLMvVXWrc1Z4zNU8j-UOItws3PuVJ4UHWAgWne9vHt_3RwBfbuD8lavG6AReYUB1ZOxg"
                      alt="Patient Waiting Lounge at Tooth Story"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2.5 left-2.5 rounded-lg bg-slate-950/80 px-2.5 py-1 backdrop-blur-md text-[11px] font-bold text-white shadow-xs">
                      Patient Lounge
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
