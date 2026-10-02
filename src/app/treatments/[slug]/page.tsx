import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { getTreatmentBySlug, getTreatments } from '@/services/treatments';
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Calendar,
  ChevronRight,
  ArrowLeft,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import type { Metadata } from 'next';

interface TreatmentDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: TreatmentDetailPageProps): Promise<Metadata> {
  const treatment = await getTreatmentBySlug(params.slug);
  if (!treatment) return { title: 'Treatment | Tooth Story Dental Clinic' };

  return {
    title: `${treatment.name} in Electronic City | Tooth Story Dental Clinic`,
    description: treatment.shortDescription,
  };
}

export default async function TreatmentDetailPage({ params }: TreatmentDetailPageProps) {
  const treatment = await getTreatmentBySlug(params.slug);

  if (!treatment) {
    notFound();
  }

  const allTreatments = await getTreatments(true);
  const otherTreatments = allTreatments.filter((t) => t.id !== treatment.id).slice(0, 3);

  const waMessage = `Hi Tooth Story Clinic, I'd like to book an appointment for ${treatment.name}.`;
  const waUrl = `https://wa.me/919036940356?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="w-full pt-24 pb-16 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-outline">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/treatments" className="hover:text-primary transition-colors">
              Treatments
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary font-bold">{treatment.name}</span>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Main Heading & Badge */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary-container text-on-primary px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
                    {treatment.category}
                  </span>
                  {treatment.badge && (
                    <span className="rounded-full bg-secondary-container text-on-secondary-container px-3 py-0.5 text-xs font-extrabold">
                      {treatment.badge}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
                  {treatment.name}
                </h1>
                <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                  {treatment.description}
                </p>
              </div>

              {/* Treatment Image Feature */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-surface-container shadow-md border border-outline-variant/30">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-on-primary space-y-1">
                    <p className="text-lg font-bold">{treatment.name}</p>
                    <p className="text-xs text-primary-fixed">
                      Painless computerized protocol at Tooth Story Electronic City
                    </p>
                  </div>
                </div>
              </div>

              {/* Clinical Benefits */}
              <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm border border-outline-variant/30 space-y-4">
                <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <span>Key Treatment Advantages</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {treatment.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-2xl bg-surface-container-low"
                    >
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-on-surface font-medium leading-normal">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Procedure */}
              <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm border border-outline-variant/30 space-y-6">
                <h2 className="text-xl font-bold text-primary">Step-by-Step Clinical Procedure</h2>
                <div className="space-y-4">
                  {treatment.procedureSteps.map((step) => (
                    <div
                      key={step.step}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary font-extrabold text-sm">
                        {step.step}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-primary">{step.title}</h3>
                        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequently Asked Questions */}
              {treatment.faqs && treatment.faqs.length > 0 && (
                <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm border border-outline-variant/30 space-y-4">
                  <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    <span>Frequently Asked Questions</span>
                  </h2>
                  <div className="space-y-3">
                    {treatment.faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-surface-container-low space-y-1.5"
                      >
                        <h4 className="text-sm font-bold text-primary">{faq.question}</h4>
                        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Booking Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Pricing & Booking Action Card */}
              <div className="rounded-3xl bg-surface-container-lowest p-6 shadow-xl border border-outline-variant/30 space-y-5">
                <div>
                  <span className="text-xs font-semibold text-outline uppercase tracking-wider">
                    Transparent Estimate
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold text-primary">
                      ₹{treatment.startingPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-outline font-medium">onwards</span>
                  </div>
                  <p className="text-xs text-secondary font-semibold mt-1">
                    ✓ Includes consultation & digital scan review
                  </p>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low text-xs text-on-surface">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    Estimated duration: <strong>{treatment.durationMinutes} minutes</strong>
                  </span>
                </div>

                {/* Primary Booking Actions */}
                <div className="space-y-2.5">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] py-3.5 px-4 text-xs sm:text-sm font-extrabold text-white shadow-md transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Book on WhatsApp (090369 40356)</span>
                  </a>

                  <Link
                    href={`/book-appointment?treatment=${encodeURIComponent(treatment.name)}`}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-primary-container py-3.5 px-4 text-xs sm:text-sm font-bold text-on-primary shadow-sm transition-all active:scale-95"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Select Time Slot Online</span>
                  </Link>
                </div>

                <div className="pt-2 border-t border-outline-variant/20 text-center">
                  <p className="text-[11px] text-outline">
                    📍 Neeladri Nagar, Phase 1 • Open daily till 10 PM
                  </p>
                </div>
              </div>

              {/* Related Treatments */}
              <div className="rounded-3xl bg-surface-container-low p-5 space-y-3 border border-outline-variant/20">
                <h4 className="text-xs font-extrabold text-outline uppercase tracking-wider">
                  Other Popular Treatments
                </h4>
                <div className="space-y-2">
                  {otherTreatments.map((other) => (
                    <Link
                      key={other.id}
                      href={`/treatments/${other.slug}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high transition-colors group"
                    >
                      <span className="text-xs font-bold text-primary group-hover:underline truncate">
                        {other.name}
                      </span>
                      <span className="text-xs font-semibold text-outline shrink-0 ml-2">
                        ₹{other.startingPrice.toLocaleString('en-IN')}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
