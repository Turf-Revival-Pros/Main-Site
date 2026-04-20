import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, CheckCircle } from 'lucide-react';
import { locations } from '@/data/locations';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import LeadForm from '@/components/forms/LeadForm';
import TestimonialCard from '@/components/cards/TestimonialCard';
import FAQ from '@/components/sections/FAQ';

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) return {};
  return {
    title: location.metaTitle,
    description: location.metaDescription,
  };
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);

  if (!location) {
    notFound();
  }

  // Get testimonials mentioning this area (or first 2 as fallback)
  const localTestimonials = testimonials.filter((t) =>
    t.customerLocation.toLowerCase().includes(location.name.toLowerCase())
  );
  const displayTestimonials =
    localTestimonials.length > 0
      ? localTestimonials.slice(0, 2)
      : testimonials.slice(0, 2);

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Turf Revival Pros',
        description: `Professional artificial turf cleaning and putting green maintenance in ${location.name}, ${location.county}.`,
        url: `https://turfrevivalpros.com/locations/${slug}`,
        telephone: '(719) 859-0314',
        email: 'info@turfrevivalpros.com',
        areaServed: {
          '@type': 'City',
          name: location.name,
          containedInPlace: {
            '@type': 'State',
            name: 'Colorado',
          },
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Parker',
          addressRegion: 'CO',
          addressCountry: 'US',
        },
        openingHours: ['Mo-Fr 07:00-18:00', 'Sa 08:00-16:00'],
        priceRange: '$$',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Locations', href: '/locations' },
            { label: location.name, href: `/locations/${slug}` },
          ]}
        />
      </div>

      {/* Hero — green gradient with photo */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/etr/IMG_0763.jpg')" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(27, 94, 32, 0.9) 0%, rgba(46, 125, 50, 0.85) 50%, rgba(25, 118, 210, 0.75) 100%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/80 mb-3">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium">{location.county}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Artificial Turf Cleaning in {location.name}
          </h1>
          <p className="text-lg text-white/85 leading-relaxed max-w-3xl">
            {location.serviceAreaDescription}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* About this location */}
              <div className="mb-10">
                <h2 className="text-2xl font-heading font-bold text-etr-black mb-4">
                  Turf Care in {location.name}
                </h2>
                <p className="text-etr-gray-light leading-relaxed mb-4">
                  {location.localContext}
                </p>
                <p className="text-etr-gray-light leading-relaxed">
                  {location.description}
                </p>
              </div>

              {/* Services for this location */}
              <div className="mb-10">
                <h2 className="text-2xl font-heading font-bold text-etr-black mb-4">
                  Services in {location.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/${service.slug}-in-${slug}`}
                      className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm card-hover block"
                    >
                      <h3 className="text-base font-heading font-bold text-etr-black mb-1">
                        {service.name}
                      </h3>
                      <p className="text-sm text-etr-gray-light line-clamp-2 mb-2">
                        {service.shortDescription}
                      </p>
                      <span className="text-sm font-semibold text-etr-green">
                        Learn More &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Neighborhoods */}
              {location.neighborhoods.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-heading font-bold text-etr-black mb-4">
                    Neighborhoods We Serve in {location.name}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {location.neighborhoods.map((n) => (
                      <div
                        key={n}
                        className="flex items-center gap-2 bg-etr-bg-alt rounded-lg px-3 py-2"
                      >
                        <CheckCircle className="w-4 h-4 text-etr-green shrink-0" />
                        <span className="text-sm text-etr-black">{n}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials */}
              {displayTestimonials.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-heading font-bold text-etr-black mb-4">
                    Customer Reviews
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {displayTestimonials.map((t, i) => (
                      <TestimonialCard key={i} testimonial={t} />
                    ))}
                  </div>
                </div>
              )}

              {/* Google Review prompt */}
              <div className="mb-10 p-6 bg-etr-bg-alt rounded-2xl text-center">
                <h3 className="text-lg font-heading font-bold text-etr-black mb-2">
                  Had a Great Experience?
                </h3>
                <p className="text-sm text-etr-gray-light mb-4 max-w-md mx-auto">
                  We appreciate honest feedback from {location.name} homeowners. Your review helps others find quality turf care.
                </p>
                <a
                  href="https://g.page/r/turfrevivalpros/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-etr-green hover:bg-etr-green-dark text-white font-heading font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
                >
                  Leave a Google Review
                </a>
              </div>

              {/* FAQ */}
              <FAQ
                category="locations"
                limit={5}
                title={`FAQs About Turf Care in ${location.name}`}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <LeadForm
                  formId={`location-${slug}`}
                  location={location.name}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
