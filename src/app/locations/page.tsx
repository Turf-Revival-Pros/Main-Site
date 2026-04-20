import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { locations } from '@/data/locations';
import { pageSEO } from '@/data/seo';

export const metadata: Metadata = {
  title: pageSEO.locations.title,
  description: pageSEO.locations.description,
  keywords: pageSEO.locations.keywords,
};

const regionOrder = [
  'Douglas County',
  'Arapahoe County',
  'Jefferson County',
  'Denver',
  'North Metro',
  'Other',
];

const regionDescriptions: Record<string, string> = {
  'Douglas County': 'Our home base. One of the 10 wealthiest counties in the US, with a strong golf culture and premium turf installations.',
  'Arapahoe County': 'Serving communities from Cherry Hills Village to Centennial with professional turf care.',
  'Jefferson County': 'From Lakewood to Golden, we keep Jefferson County turf looking its best.',
  'Denver': 'Covering Denver\'s most prestigious neighborhoods with specialized turf services.',
  'North Metro': 'Professional turf cleaning for Broomfield, Westminster, and the north metro area.',
  'Other': 'Additional communities we proudly serve across the Denver metro.',
};

export default function LocationsPage() {
  // Group locations by county
  const grouped = locations.reduce<Record<string, typeof locations>>((acc, loc) => {
    const region = regionOrder.includes(loc.county) ? loc.county : 'Other';
    if (!acc[region]) acc[region] = [];
    acc[region].push(loc);
    return acc;
  }, {});

  return (
    <>
      {/* Green gradient hero */}
      <section
        className="relative py-20 sm:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)' }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_25%_25%,white_1px,transparent_1px)] bg-[length:40px_40px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm px-4 py-2 rounded-full mb-6">
            <MapPin className="w-4 h-4" />
            Serving 40+ Denver Metro Communities
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-5">
            Service Areas
          </h1>
          <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            From Castle Rock to Broomfield, Turf Revival Pros brings professional
            turf cleaning and putting green maintenance to the entire Denver metro.
          </p>
        </div>
      </section>

      {/* County-grouped locations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {regionOrder.map((region) => {
            const regionLocations = grouped[region];
            if (!regionLocations || regionLocations.length === 0) return null;

            return (
              <div key={region} className="mb-14 last:mb-0">
                {/* Region header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-heading font-bold text-etr-black mb-2">
                    {region}
                  </h2>
                  <p className="text-etr-gray-light text-sm max-w-2xl">
                    {regionDescriptions[region]}
                  </p>
                </div>

                {/* Location grid — compact cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {regionLocations.map((location) => (
                    <Link
                      key={location.slug}
                      href={`/locations/${location.slug}`}
                      className="group bg-white rounded-xl border border-gray-100 p-4 hover:border-etr-green/30 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-etr-green shrink-0" />
                        <h3 className="text-sm font-heading font-semibold text-etr-black group-hover:text-etr-green transition-colors truncate">
                          {location.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 text-etr-blue text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        View services <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-etr-bg-alt">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-etr-black mb-4">
            Don&apos;t See Your Area?
          </h2>
          <p className="text-etr-gray-light mb-6">
            We&apos;re constantly expanding across the Denver metro. If your community
            isn&apos;t listed, reach out — we may already serve your area.
          </p>
          <a
            href="tel:7198590314"
            className="inline-flex items-center gap-2 bg-etr-green hover:bg-etr-green-dark text-white font-heading font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg"
          >
            Call (719) 859-0314
          </a>
        </div>
      </section>
    </>
  );
}
