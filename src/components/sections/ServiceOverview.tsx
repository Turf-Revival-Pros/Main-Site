import { services } from '@/data/services';
import ServiceCard from '@/components/cards/ServiceCard';
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/AnimateOnScroll';

/**
 * Homepage service overview — Murphy's-style image-top cards.
 * Uses the shared ServiceCard component so all service grids on the site stay
 * visually consistent (homepage, /services, related services on detail pages).
 */
export default function ServiceOverview() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block font-body font-semibold text-etr-green text-sm uppercase tracking-widest mb-3">
            What We Offer
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-etr-black">
            Our Services
          </h2>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
