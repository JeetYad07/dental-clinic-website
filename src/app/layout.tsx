import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Tooth Story Dental Clinic | Dentist in Electronic City, Bengaluru',
  description:
    'Gentle, world-class dental care in Electronic City, Bengaluru. Painless root canal, braces, clear aligners, wisdom tooth extractions & implants. Book via WhatsApp or online.',
  keywords: [
    'Dentist in Electronic City',
    'Tooth Story Dental Clinic',
    'Neeladri Nagar Dentist',
    'Root Canal Bangalore',
    'Dental Clinic Phase 1 Electronic City',
    'Braces Electronic City',
    'Painless Dentistry Bengaluru',
  ],
  authors: [{ name: 'Tooth Story Dental Clinic' }],
  metadataBase: new URL('https://toothstorydental.com'),
  openGraph: {
    title: 'Tooth Story Dental Clinic | Dentist in Electronic City, Bengaluru',
    description:
      'Painless dentistry, precision implants, rotary root canals & clear aligners. Rated 4.9★ with 480+ Google Reviews. Open daily till 10 PM.',
    url: 'https://toothstorydental.com',
    siteName: 'Tooth Story Dental Clinic',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM3Rl5_qDycg5MzurdHAxFuAje-whutR9iKPsv3hzzvYNQUYYhXeuCCUlSiwgk-L-EWIvyP4BSOTXd0JfRIIa6_I4A7UIyFOh6dpuOUOo3eIdipNCFlMO3XBlT3UdisGUDch0gl4zk2vHZbQh_lZfkCOZ4dKcLqdy9gCsI-v7Pp8z-75tHoKhX1I_T25umK7r7Zi_z8c898nzWOM2kdegvm9JPn35Qnpr2hoxd_JaYVG1pv23erfnATQ',
        width: 1200,
        height: 630,
        alt: 'Dr. Dhanashree - Tooth Story Dental Clinic',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: 'Tooth Story Dental Clinic',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCM3Rl5_qDycg5MzurdHAxFuAje-whutR9iKPsv3hzzvYNQUYYhXeuCCUlSiwgk-L-EWIvyP4BSOTXd0JfRIIa6_I4A7UIyFOh6dpuOUOo3eIdipNCFlMO3XBlT3UdisGUDch0gl4zk2vHZbQh_lZfkCOZ4dKcLqdy9gCsI-v7Pp8z-75tHoKhX1I_T25umK7r7Zi_z8c898nzWOM2kdegvm9JPn35Qnpr2hoxd_JaYVG1pv23erfnATQ',
    telephone: '+919036940356',
    url: 'https://toothstorydental.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Malligue Residency, 16th Cross Road, Neeladri Nagar, Electronic City Phase I',
      addressLocality: 'Electronic City, Doddathoguru, Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560100',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '12.8395',
      longitude: '77.6775',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '22:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '480',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-surface font-sans text-on-surface antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
