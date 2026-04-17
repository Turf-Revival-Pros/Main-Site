import type { Metadata } from 'next';
import { CheckCircle, MapPin, Wrench, Target } from 'lucide-react';
import Button from '@/components/ui/Button';
import CTABanner from '@/components/sections/CTABanner';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { pageSEO } from '@/data/seo';
import { company, owner } from '@/data/company';

export const metadata: Metadata = {
  title: pageSEO.about.title,
  description: pageSEO.about.description,
  keywords: pageSEO.about.keywords,
};

const serviceAreas = [
  'Parker',
  'Castle Rock',
  'Highlands Ranch',
  'Lone Tree',
  'Centennial',
  'Littleton',
  'Lakewood',
  'Arvada',
  'Westminster',
  'Broomfield',
  'Aurora',
  'Denver',
  'Thornton',
  'Greenwood Village',
  'Cherry Hills Village',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-20 sm:py-28"
        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
              About {company.name}
            </h1>
            <p className="text-lg text-white/85 leading-relaxed">
              {company.description}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <div>
                <h2 className="text-3xl font-heading font-bold text-etr-black mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-etr-gray-light leading-relaxed">
                  <p>
                    {company.name} was founded out of {owner.location} with a
                    simple observation: homeowners in the Denver metro area were
                    investing thousands of dollars in beautiful synthetic turf,
                    but had no one to properly maintain it.
                  </p>
                  <p>
                    What started as a passion for putting green performance
                    quickly grew into a full-service artificial turf care
                    company. Our team saw that most turf cleaning companies
                    treated every surface the same, but putting greens require
                    specialized knowledge of infill systems, fiber types, and
                    performance tuning.
                  </p>
                  <p>
                    Today, {company.name} is the Denver metro area&apos;s go-to
                    specialist for putting green maintenance and comprehensive
                    turf care. We use commercial-grade steel brush machines and
                    professional-grade cleaning solutions to deliver results that
                    homeowners can see and feel.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/images/etr/IMG_0444.jpg"
                  alt="Custom putting green designed and maintained by Elite Turf Refresh"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="bg-etr-bg-alt rounded-2xl p-8 mt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-etr-green mb-1">
                      30+
                    </div>
                    <p className="text-sm text-etr-gray-light">
                      Communities Served
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-etr-green mb-1">
                      4
                    </div>
                    <p className="text-sm text-etr-gray-light">
                      Core Services
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-etr-green mb-1">
                      100%
                    </div>
                    <p className="text-sm text-etr-gray-light">
                      Pet-Safe Products
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-etr-green mb-1">
                      5★
                    </div>
                    <p className="text-sm text-etr-gray-light">
                      Customer Rating
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-20 bg-etr-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-etr-black mb-10 text-center">
            Why We&apos;re Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <Target className="w-10 h-10 text-etr-green mb-4" />
              <h3 className="text-lg font-heading font-bold text-etr-black mb-2">
                Putting Green Focus
              </h3>
              <p className="text-sm text-etr-gray-light leading-relaxed">
                Most turf companies treat putting greens like regular turf. We
                understand the nuances of infill distribution, fiber performance,
                and how to restore consistent ball roll.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <img
                src="/images/etr/equip-IMG_5200.jpg"
                alt="Commercial steel brush machine in use on a putting green"
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-heading font-bold text-etr-black mb-2">
                Commercial-Grade Equipment
              </h3>
              <p className="text-sm text-etr-gray-light leading-relaxed">
                Our commercial steel brush machine provides deeper, more
                thorough cleaning than standard methods. We lift matted fibers,
                remove embedded debris, and restore your turf&apos;s original
                texture.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <MapPin className="w-10 h-10 text-etr-green mb-4" />
              <h3 className="text-lg font-heading font-bold text-etr-black mb-2">
                Colorado Expertise
              </h3>
              <p className="text-sm text-etr-gray-light leading-relaxed">
                Denver&apos;s altitude, intense UV exposure, and dry climate
                create unique challenges for synthetic turf. We understand these
                conditions and tailor our approach accordingly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-etr-black mb-4 text-center">
            Our Service Area
          </h2>
          <p className="text-etr-gray-light text-center mb-10 max-w-2xl mx-auto">
            We proudly serve homeowners across the Denver metro area, from Castle
            Rock to Broomfield.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {serviceAreas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 bg-etr-bg-alt rounded-lg px-3 py-2.5"
              >
                <CheckCircle className="w-4 h-4 text-etr-green shrink-0" />
                <span className="text-sm text-etr-black">{area}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button href="/locations" variant="secondary" size="md">
              View All Locations
            </Button>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
