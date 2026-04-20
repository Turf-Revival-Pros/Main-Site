import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ChevronRight, Phone } from 'lucide-react';
import { locations } from '@/data/locations';
import { services } from '@/data/services';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import LeadForm from '@/components/forms/LeadForm';
import FAQ from '@/components/sections/FAQ';
import GrassDivider from '@/components/ui/GrassDivider';
import JsonLd from '@/components/seo/JsonLd';

interface ComboPageProps {
  params: Promise<{ combo: string }>;
}

/**
 * Generate all valid combo slugs in the format `${service-slug}-in-${location-slug}`.
 * Example: "turf-cleaning-in-parker"
 */
export async function generateStaticParams() {
  const params: { combo: string }[] = [];
  for (const location of locations) {
    for (const service of services) {
      params.push({ combo: `${service.slug}-in-${location.slug}` });
    }
  }
  return params;
}

/**
 * Parse a combo slug into its service + location parts.
 * Returns null if the slug doesn't match a known service+location pair.
 */
function parseCombo(combo: string) {
  for (const service of services) {
    const prefix = `${service.slug}-in-`;
    if (combo.startsWith(prefix)) {
      const locationSlug = combo.slice(prefix.length);
      const location = locations.find((l) => l.slug === locationSlug);
      if (location) return { service, location };
    }
  }
  return null;
}

export async function generateMetadata({ params }: ComboPageProps): Promise<Metadata> {
  const { combo } = await params;
  const parsed = parseCombo(combo);
  if (!parsed) return {};
  const { service, location } = parsed;

  return {
    title: `${service.name} in ${location.name}, CO | Turf Revival Pros`,
    description: `Professional ${service.name.toLowerCase()} services in ${location.name}, ${location.county}. ${service.shortDescription} Call (719) 859-0314 for a free estimate.`,
    alternates: {
      canonical: `https://turfrevivalpros.com/${combo}`,
    },
  };
}

export default async function ComboPage({ params }: ComboPageProps) {
  const { combo } = await params;
  const parsed = parseCombo(combo);

  if (!parsed) {
    notFound();
  }

  const { service, location } = parsed;
  const otherServices = services.filter((s) => s.slug !== service.slug);
  const heroPhoto = service.image;

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} in ${location.name}`,
    description: `Professional ${service.name.toLowerCase()} for homeowners in ${location.name}, ${location.county}.`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Turf Revival Pros',
      url: 'https://turfrevivalpros.com',
      telephone: '(719) 859-0314',
    },
    areaServed: {
      '@type': 'City',
      name: location.name,
    },
    url: `https://turfrevivalpros.com/${combo}`,
  };

  return (
    <>
      <JsonLd data={serviceLd} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: service.name, href: `/services/${service.slug}` },
            { label: location.name, href: `/${combo}` },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <Image
          src={heroPhoto}
          alt={`${service.name} in ${location.name}`}
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(27, 94, 32, 0.92) 0%, rgba(46, 125, 50, 0.85) 50%, rgba(25, 118, 210, 0.75) 100%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-white/80 uppercase tracking-wider mb-3">
            {location.county}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            {service.name} in {location.name}
          </h1>
          <p className="text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed mb-8">
            Professional {service.name.toLowerCase()} for homeowners in{' '}
            {location.name}, {location.county}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-etr-bg-alt text-etr-green-dark font-heading font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg shadow-lg"
            >
              Get a Free Quote
            </a>
            <a
              href="tel:7198590314"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-heading font-semibold px-8 py-3.5 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              (719) 859-0314
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-heading font-bold text-etr-black mb-4">
                {service.name} for {location.name} Homeowners
              </h2>
              <p className="text-etr-gray-light leading-relaxed mb-6">
                {service.fullDescription}
              </p>

              {/* Local context */}
              <div className="bg-etr-bg-alt rounded-2xl p-6 mb-8 border-l-4 border-etr-green">
                <h3 className="text-lg font-heading font-bold text-etr-black mb-2">
                  Why {location.name} Homeowners Choose Us
                </h3>
                <p className="text-sm text-etr-gray-light leading-relaxed">
                  {location.localContext}
                </p>
              </div>

              {/* What's Included — numbered */}
              <h3 className="text-xl font-heading font-bold text-etr-black mb-4">
                What&apos;s Included
              </h3>
              <div className="space-y-3 mb-10">
                {service.whatIncludes.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-etr-green text-white font-heading font-bold text-sm shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-etr-black">{item}</span>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <h3 className="text-xl font-heading font-bold text-etr-black mb-4">
                Why It Matters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {service.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl border-l-4 border-etr-green bg-etr-bg-alt"
                  >
                    <span className="text-xl font-heading font-black text-etr-green/30">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm text-etr-black font-medium leading-relaxed">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              {/* Service FAQs */}
              {service.faqs.length > 0 && (
                <FAQ
                  title={`${service.name} FAQs`}
                  items={service.faqs.map((faq) => ({
                    question: faq.question,
                    answer: faq.answer,
                    category: 'services' as const,
                  }))}
                />
              )}

              {/* Other services in this location */}
              <div className="mt-12">
                <h3 className="text-xl font-heading font-bold text-etr-black mb-4">
                  Other Services in {location.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {otherServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/${s.slug}-in-${location.slug}`}
                      className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm card-hover block"
                    >
                      <h4 className="text-sm font-heading font-bold text-etr-black mb-1">
                        {s.name}
                      </h4>
                      <p className="text-xs text-etr-gray-light line-clamp-2">
                        {s.shortDescription}
                      </p>
                      <span className="inline-flex items-center text-xs font-semibold text-etr-green mt-2">
                        Learn more <ChevronRight className="w-3 h-3 ml-0.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div id="quote" className="lg:col-span-1">
              <div className="sticky top-28">
                <LeadForm
                  formId={`combo-${combo}`}
                  location={location.name}
                  service={service.slug}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <GrassDivider baseColor="#1B5E20" />
      <section
        className="py-14 -mt-px"
        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">
            Serving {location.name} &amp; the Surrounding Area
          </h2>
          <p className="text-lg text-white/85 mb-6">
            Free estimates. 24-hour response. Pet-safe products.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 bg-white hover:bg-etr-bg-alt text-etr-green-dark font-heading font-semibold px-8 py-3.5 rounded-lg transition-colors shadow-lg"
            >
              Get Your Free Quote
            </a>
            <a
              href="tel:7198590314"
              className="inline-flex items-center gap-2 text-white font-heading font-semibold hover:text-etr-blue-light transition-colors"
            >
              <Phone className="w-5 h-5" />
              (719) 859-0314
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
