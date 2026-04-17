'use client';

import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import TestimonialCard from '@/components/cards/TestimonialCard';
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/AnimateOnScroll';

export default function TestimonialSection() {
  const featured = testimonials.slice(0, 3);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-etr-black mb-4">
            What Our Customers Say
          </h2>
          <p className="text-etr-gray-light max-w-2xl mx-auto">
            Real results from real Denver homeowners. See why they trust Elite
            Turf Refresh.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((testimonial, index) => (
            <StaggerItem key={index}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Inline CTA after social proof — strong conversion moment */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-etr-green hover:bg-etr-green-dark text-white font-heading font-semibold px-8 py-3.5 rounded-lg transition-colors"
            >
              Start Your Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:7204501653"
              className="inline-flex items-center gap-2 text-etr-green font-heading font-semibold hover:text-etr-green-dark transition-colors"
            >
              <Phone className="w-5 h-5" />
              (720) 450-1653
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
