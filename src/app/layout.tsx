import type { Metadata, Viewport } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';

const MobileStickyQuote = dynamic(() => import('@/components/ui/MobileStickyQuote'));
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Elite Turf Refresh | Professional Artificial Turf Cleaning in Denver',
  description:
    'Professional artificial turf cleaning, sanitization, and putting green restoration for the Denver metro area. Serving Castle Rock to Broomfield. Call (720) 450-1653 for a free quote.',
  metadataBase: new URL('https://eliteturfrefresh.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Elite Turf Refresh',
    images: [
      {
        url: '/images/etr-logo-wide.png',
        width: 1200,
        height: 630,
        alt: 'Elite Turf Refresh — Artificial Turf Cleaning & Putting Green Refresh in Denver',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#2E7D32',
  width: 'device-width',
  initialScale: 1,
};

const localBusinessLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Elite Turf Refresh',
  description:
    'Professional artificial turf cleaning, sanitization, and putting green restoration serving the Denver metro area.',
  url: 'https://eliteturfrefresh.com',
  telephone: '(720) 450-1653',
  email: 'info@eliteturfrefresh.com',
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 39.7392,
      longitude: -104.9903,
    },
    geoRadius: '50',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Parker',
    addressRegion: 'CO',
    addressCountry: 'US',
  },
  openingHours: ['Mo-Fr 07:00-18:00', 'Sa 08:00-16:00'],
  priceRange: '$$',
  image: 'https://eliteturfrefresh.com/images/etr-logo.png',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable}`}
    >
      <head>
        <JsonLd data={localBusinessLd} />
        {/* Preload hero LCP image for faster paint */}
        <link
          rel="preload"
          as="image"
          href="/images/etr/IMG_0077.jpg"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-dvh flex flex-col font-body antialiased">
        <Header />
        <main className="pt-24 flex-1">{children}</main>
        <Footer />
        {/* Spacer so mobile sticky CTA bar doesn't cover footer's bottom bar — matches footer's dark green */}
        <div className="h-16 lg:hidden" style={{ background: '#0A1F0C' }} aria-hidden="true" />
        <MobileStickyQuote />
      </body>
    </html>
  );
}
