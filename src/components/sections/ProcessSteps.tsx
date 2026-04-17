import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/AnimateOnScroll';

const steps = [
  {
    image: '/images/services/process-contact.png',
    title: 'Contact Us',
    description: 'Get a free quote for your putting green or artificial turf.',
  },
  {
    image: '/images/services/process-schedule.png',
    title: 'Schedule Your Service',
    description:
      'Pick a day that works — we confirm your appointment within 24 hours.',
  },
  {
    image: '/images/services/process-done.png',
    title: 'Get The Job Done',
    description: 'Sit back and enjoy your fresh, refreshed turf.',
  },
];

export default function ProcessSteps() {
  return (
    <section className="bg-etr-bg-alt py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block font-body font-semibold text-etr-green text-sm uppercase tracking-widest mb-3">
            How It Works
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-etr-black">
            Our Simple 3-Step Process
          </h2>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-5">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-etr-green text-white rounded-full flex items-center justify-center font-heading font-bold text-sm shadow-md">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-heading font-bold text-xl text-etr-black">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-etr-gray-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-etr-green hover:bg-etr-green-dark text-white font-heading font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Get Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
