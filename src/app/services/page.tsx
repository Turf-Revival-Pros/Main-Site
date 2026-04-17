import type { Metadata } from 'next';
import { services } from '@/data/services';
import ServiceCard from '@/components/cards/ServiceCard';
import CTABanner from '@/components/sections/CTABanner';
import { pageSEO } from '@/data/seo';

export const metadata: Metadata = {
  title: pageSEO.services.title,
  description: pageSEO.services.description,
  keywords: pageSEO.services.keywords,
};

export default function ServicesPage() {
  return (
    <>
      <section
        className="py-20 sm:py-28"
        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
              Our Services
            </h1>
            <p className="text-lg text-white/85 leading-relaxed">
              Professional Turf Care for Every Need. From putting green
              performance tuning to complete turf restoration, we keep your
              artificial turf looking and performing its best.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
