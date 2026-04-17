import Button from '@/components/ui/Button';
import GrassDivider from '@/components/ui/GrassDivider';
import { Phone } from 'lucide-react';
import { company } from '@/data/company';

export default function CTABanner() {
  return (
    <div>
      {/* Grass growing up from the green section into the white content above */}
      <GrassDivider baseColor="#1B5E20" />

      <section
        className="py-20 lg:py-24 -mt-px"
        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Breathe New Life Into Your Turf
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Contact Elite Turf Refresh today for a free, no-obligation quote.
            Serving the entire Denver metro area.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="inverse" size="lg">
              Get a Free Quote
            </Button>
            <a
              href={`tel:${company.phone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center gap-2 text-white font-heading font-semibold text-lg hover:text-etr-blue-light transition-colors"
            >
              <Phone className="w-5 h-5" />
              {company.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
