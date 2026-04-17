import Link from 'next/link';
import { type Location } from '@/types';

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 card-hover">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-heading font-bold text-etr-black">
          {location.name}
        </h3>
        <span className="text-xs font-medium bg-etr-bg-alt text-etr-green px-2 py-1 rounded-full whitespace-nowrap">
          {location.county}
        </span>
      </div>
      <p className="text-sm text-etr-gray-light leading-relaxed mb-4 line-clamp-2">
        {location.description}
      </p>
      <Link
        href={`/locations/${location.slug}`}
        className="inline-flex items-center text-sm font-semibold text-etr-blue hover:text-etr-blue-dark transition-colors"
      >
        View Services
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
}
