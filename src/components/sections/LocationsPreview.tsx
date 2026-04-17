'use client';

import { locations } from '@/data/locations';
import LocationCard from '@/components/cards/LocationCard';
import Button from '@/components/ui/Button';
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/AnimateOnScroll';

export default function LocationsPreview() {
  const topLocations = locations.slice(0, 6);

  return (
    <section className="py-20 bg-etr-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-etr-black mb-4">
            Serving the Denver Metro Area
          </h2>
          <p className="text-etr-gray-light max-w-2xl mx-auto">
            From Castle Rock to Broomfield, we bring professional turf care to
            your neighborhood.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {topLocations.map((location) => (
            <StaggerItem key={location.slug}>
              <LocationCard location={location} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center">
          <Button href="/locations" variant="secondary" size="md">
            View All Service Areas
          </Button>
        </div>
      </div>
    </section>
  );
}
