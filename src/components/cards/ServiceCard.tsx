import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { type Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

/**
 * Unified service card — Murphy's-style image-on-top layout.
 * Used on homepage, /services overview, and related-services sections on
 * service detail + location+service combo pages.
 */
export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-etr-green/30 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="aspect-[5/4] relative overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-lg text-etr-black group-hover:text-etr-green transition-colors">
          {service.name}
        </h3>
        <p className="mt-2 font-body text-etr-gray-light leading-relaxed text-sm flex-1">
          {service.shortDescription}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 font-body font-semibold text-etr-green group-hover:text-etr-green-dark transition-colors text-sm">
          Learn More
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
