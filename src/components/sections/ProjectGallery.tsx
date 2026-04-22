'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  { src: '/images/ken/putting-green-mountain-view-finished.webp', alt: 'Finished backyard putting green with Colorado mountain views', label: 'Custom Putting Green' },
  { src: '/images/ken/putting-green-power-broom-grooming.webp', alt: 'Power broom grooming a putting green during a tune-up service', label: 'Precision Tune-Up' },
  { src: '/images/ken/putting-green-with-sand-bunker.webp', alt: 'Custom putting green with sand bunker feature in Denver backyard', label: 'Green with Bunker' },
  { src: '/images/ken/putting-green-roller-compaction.webp', alt: 'Technician rolling a putting green with a steel roller for compaction', label: 'Roll & Refresh' },
  { src: '/images/ken/putting-green-finished-two-cups.webp', alt: 'Finished residential putting green with two cups in Colorado backyard', label: 'Family Green' },
  { src: '/images/ken/putting-green-edge-seaming.webp', alt: 'Technician seaming the curved edge of a residential putting green', label: 'Precision Installation' },
  { src: '/images/ken/putting-green-playground-backyard.webp', alt: 'Family-friendly backyard artificial turf beside a playground in Colorado', label: 'Family Backyard' },
  { src: '/images/ken/putting-green-seam-detail.webp', alt: 'Close-up detail of a precision seam between putting surface and fringe turf', label: 'Craftsmanship' },
];

export default function ProjectGallery() {
  return (
    <section className="py-16 lg:py-24 bg-etr-bg-alt">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-etr-black">
            Our Work
          </h2>
          <p className="mt-3 font-body text-etr-gray-light text-lg">
            Real results from real Denver metro projects
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
            >
              <Image
                src={project.src}
                alt={project.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-etr-green-dark/0 group-hover:bg-etr-green-dark/60 transition-colors duration-300 flex items-center justify-center">
                <span className="font-heading font-bold text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                  {project.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inline CTA after gallery — user just saw proof of work, prime conversion moment */}
        <div className="mt-12 text-center">
          <p className="text-etr-gray-light mb-5">
            Ready to see your own turf transformed?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-etr-green hover:bg-etr-green-dark text-white font-heading font-semibold px-8 py-3.5 rounded-lg transition-colors"
          >
            Get Your Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
