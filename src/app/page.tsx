import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import GrassDivider from '@/components/ui/GrassDivider';
import ServiceOverview from '@/components/sections/ServiceOverview';
import ProcessSteps from '@/components/sections/ProcessSteps';
import AboutPreview from '@/components/sections/AboutPreview';
import ProjectGallery from '@/components/sections/ProjectGallery';
import TestimonialSection from '@/components/sections/TestimonialSection';
import LocationsPreview from '@/components/sections/LocationsPreview';
import FAQ from '@/components/sections/FAQ';
import CTABanner from '@/components/sections/CTABanner';
import { pageSEO } from '@/data/seo';

export const metadata: Metadata = {
  title: pageSEO.home.title,
  description: pageSEO.home.description,
  keywords: pageSEO.home.keywords,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <GrassDivider baseColor="#1B5E20" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }} />
      <ServiceOverview />
      <ProcessSteps />
      <AboutPreview />
      <ProjectGallery />
      <TestimonialSection />
      <LocationsPreview />
      <FAQ category="general" limit={6} />
      <CTABanner />
    </>
  );
}
