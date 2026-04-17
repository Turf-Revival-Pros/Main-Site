import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ChevronRight, Phone, ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import LeadForm from '@/components/forms/LeadForm';
import FAQ from '@/components/sections/FAQ';
import GrassDivider from '@/components/ui/GrassDivider';
import JsonLd from '@/components/seo/JsonLd';
import ServiceCard from '@/components/cards/ServiceCard';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Secondary photos for the "How It Works" 2-column section on each service detail page.
// Primary hero images are sourced from services.ts (service.image).
const secondaryPhotos: Record<string, string> = {
  'putting-green-refresh': '/images/etr/IMG_0496.jpg',
  'turf-cleaning': '/images/etr/IMG_3059.jpg',
  'turf-sanitization': '/images/etr/IMG_1982.jpg',
  'turf-restoration': '/images/etr/IMG_0444.jpg',
};

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter((s) => s.slug !== slug);
  const heroPhoto = service.image;
  const secondaryPhoto = secondaryPhotos[slug] || service.image;

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Elite Turf Refresh',
      url: 'https://eliteturfrefresh.com',
    },
    url: `https://eliteturfrefresh.com/services/${slug}`,
  };

  return (
    <>
      <JsonLd data={serviceLd} />

      {/* ── Hero ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <Image
          src={heroPhoto}
          alt={service.name}
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(27, 94, 32, 0.92) 0%, rgba(46, 125, 50, 0.85) 50%, rgba(25, 118, 210, 0.75) 100%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">{service.name}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            {service.name}
          </h1>
          <p className="text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed mb-8">
            {service.shortDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-etr-bg-alt text-etr-green-dark font-heading font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg shadow-lg"
            >
              Get a Free Quote
            </a>
            <a
              href="tel:7204501653"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-heading font-semibold px-8 py-3.5 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              (720) 450-1653
            </a>
          </div>
        </div>
      </section>

      {/* ── About + Photo ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-etr-black mb-6">
                How It Works
              </h2>
              <p className="text-etr-gray-light leading-relaxed text-lg mb-6">
                {service.shortDescription}
              </p>
              <div
                className="rounded-xl p-5 border-l-4 border-etr-blue"
                style={{ background: 'rgba(25, 118, 210, 0.05)' }}
              >
                <p className="text-etr-black font-medium text-sm leading-relaxed">
                  Serving 40+ communities across the Denver metro — from Castle Rock to Broomfield. Call <a href="tel:7204501653" className="text-etr-blue font-semibold">(720) 450-1653</a> or fill out the form below for a free estimate.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={secondaryPhoto}
                alt={`${service.name} — professional turf service`}
                width={600}
                height={400}
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── What's Included — numbered steps ── */}
      <section className="py-16 sm:py-20 bg-etr-bg-alt">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-etr-black mb-3 text-center">
            What&apos;s Included
          </h2>
          <p className="text-etr-gray-light text-center mb-10">
            Every {service.name.toLowerCase()} service includes:
          </p>
          <div className="space-y-4">
            {service.whatIncludes.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-sm"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-etr-green text-white font-heading font-bold text-sm shrink-0">
                  {i + 1}
                </span>
                <span className="text-etr-black">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits — horizontal highlight cards ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-etr-black mb-3 text-center">
            Why It Matters
          </h2>
          <p className="text-etr-gray-light text-center mb-10">
            Real results you&apos;ll see and feel
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl border-l-4 border-etr-green bg-etr-bg-alt"
              >
                <span className="text-2xl font-heading font-black text-etr-green/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-etr-black font-medium leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mid-page CTA ── */}
      <GrassDivider baseColor="#1B5E20" />
      <section
        className="py-16 sm:py-20 -mt-px"
        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">
            Interested in {service.name}?
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-xl mx-auto">
            Get a free, no-obligation quote for your Denver metro property. We&apos;ll assess your turf and recommend the best approach.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 bg-white hover:bg-etr-bg-alt text-etr-green-dark font-heading font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg shadow-lg"
            >
              Get Your Free Quote
            </a>
            <a
              href="tel:7204501653"
              className="inline-flex items-center gap-2 text-white font-heading font-semibold text-lg hover:text-etr-blue-light transition-colors"
            >
              <Phone className="w-5 h-5" />
              (720) 450-1653
            </a>
          </div>
        </div>
      </section>
      {/* ── FAQs ── */}
      {service.faqs.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQ
              title={`${service.name} FAQs`}
              items={service.faqs.map((faq) => ({
                question: faq.question,
                answer: faq.answer,
                category: 'services' as const,
              }))}
            />
          </div>
        </section>
      )}

      {/* ── Lead Form ── */}
      <section id="quote" className="py-16 sm:py-20 bg-etr-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-etr-black mb-4">
                Get Your Free Quote
              </h2>
              <p className="text-etr-gray-light leading-relaxed mb-6">
                Tell us about your turf and we&apos;ll provide a custom estimate for {service.name.toLowerCase()} at your property.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-etr-green" />
                  <span className="text-etr-gray">Free, no-obligation estimate</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-etr-green" />
                  <span className="text-etr-gray">Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-etr-green" />
                  <span className="text-etr-gray">Serving 40+ Denver metro communities</span>
                </div>
              </div>
              <a
                href="tel:7204501653"
                className="inline-flex items-center gap-2 text-etr-blue font-heading font-semibold text-lg hover:text-etr-blue-dark transition-colors"
              >
                <Phone className="w-5 h-5" />
                Prefer to call? (720) 450-1653
              </a>
            </div>
            <div>
              <LeadForm formId={`service-${slug}`} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Services ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-etr-black mb-8 text-center">
            Our Other Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
