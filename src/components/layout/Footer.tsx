import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';
import { company } from '@/data/company';

const serviceLinks = [
  { label: 'Putting Green Refresh & Tuning', href: '/services/putting-green-refresh' },
  { label: 'Pet Hair & Debris Removal', href: '/services/turf-cleaning' },
  { label: 'Disinfect & Deodorize', href: '/services/turf-sanitization' },
  { label: 'Blooming & De-Compacting', href: '/services/turf-restoration' },
];

const topLocations = [
  { label: 'Parker', href: '/locations/parker' },
  { label: 'Castle Rock', href: '/locations/castle-rock' },
  { label: 'Highlands Ranch', href: '/locations/highlands-ranch' },
  { label: 'Lone Tree', href: '/locations/lone-tree' },
  { label: 'Centennial', href: '/locations/centennial' },
  { label: 'Littleton', href: '/locations/littleton' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];

export default function Footer() {
  return (
    <footer className="text-white" style={{ background: 'linear-gradient(180deg, #0A1F0C 0%, #1B5E20 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Logo & Description */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/etr-logo-wide.png"
                alt="Elite Turf Refresh"
                width={600}
                height={338}
                className="h-24 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Professional artificial turf cleaning, sanitization, and putting
              green restoration serving the Denver metro area.
            </p>
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-etr-green-light transition-colors"
            >
              <Mail className="w-4 h-4" />
              {company.email}
            </a>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="font-heading font-semibold text-base mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-etr-green-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Locations */}
          <div>
            <h3 className="font-heading font-semibold text-base mb-4">
              Popular Locations
            </h3>
            <ul className="space-y-2.5">
              {topLocations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-etr-green-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-base mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-etr-green-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-etr-green/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {company.name}. All rights
            reserved.
          </p>
          <a
            href={`tel:${company.phone.replace(/[^0-9]/g, '')}`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-etr-green-light transition-colors"
          >
            <Phone className="w-4 h-4" />
            {company.phone}
          </a>
        </div>
      </div>
    </footer>
  );
}
