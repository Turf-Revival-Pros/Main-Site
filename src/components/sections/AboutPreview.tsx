import Image from 'next/image';
import Link from 'next/link';
import { Target, PawPrint, Wrench, MapPin, ArrowRight } from 'lucide-react';

const trustPoints = [
  { icon: Wrench, label: 'Commercial-Grade Equipment' },
  { icon: PawPrint, label: 'Pet & Child Safe' },
  { icon: Target, label: 'Full-Service Turf Care' },
  { icon: MapPin, label: 'Denver Metro Local' },
];

/**
 * Inline About preview on the homepage.
 * Pattern inspired by Murphy's Turf: 2-column image + content + trust badges.
 * Gives visitors a taste of who the business is without leaving the homepage.
 */
export default function AboutPreview() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[5/4] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/ken/putting-green-power-broom-grooming.webp"
              alt="Turf Revival Pros technician grooming a backyard putting green with a commercial power broom in Colorado"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <span className="inline-block font-body font-semibold text-etr-green text-sm uppercase tracking-widest mb-3">
              About Turf Revival Pros
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-etr-black leading-tight">
              Denver&apos;s Putting Green &amp; Artificial Turf Care Specialist
            </h2>
            <p className="mt-5 font-body text-etr-gray-light text-lg leading-relaxed">
              Owner-operated in Aurora, Colorado, Turf Revival Pros delivers
              commercial-grade{' '}
              <Link
                href="/services/turf-cleaning"
                className="text-etr-green font-semibold hover:text-etr-green-dark underline decoration-etr-green/30 hover:decoration-etr-green-dark underline-offset-2"
              >
                artificial turf cleaning
              </Link>
              , pet odor remediation, and fiber restoration for homes across
              the Denver metro — plus specialty{' '}
              <Link
                href="/services/putting-green-refresh"
                className="text-etr-green font-semibold hover:text-etr-green-dark underline decoration-etr-green/30 hover:decoration-etr-green-dark underline-offset-2"
              >
                putting green tune-ups
              </Link>{' '}
              when the job calls for it. We keep your turf performing
              year-round at altitude, across{' '}
              <Link
                href="/locations"
                className="text-etr-green font-semibold hover:text-etr-green-dark underline decoration-etr-green/30 hover:decoration-etr-green-dark underline-offset-2"
              >
                40+ Denver metro communities
              </Link>
              .
            </p>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <li key={point.label} className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-etr-green/15 rounded-full flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-etr-green" />
                    </div>
                    <span className="font-heading font-semibold text-etr-black">
                      {point.label}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-etr-green hover:bg-etr-green-dark text-white font-heading font-semibold px-8 py-3.5 rounded-lg transition-colors"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-etr-green hover:text-etr-green-dark font-heading font-semibold"
              >
                See All Service Areas
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
