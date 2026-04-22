'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Phone } from 'lucide-react';
import { company } from '@/data/company';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center">
      {/* Background Image — Real putting green photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/ken/putting-green-with-sand-bunker.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black text-white leading-[1.1] mb-6">
            Make Your Turf
            <br />
            Look &amp; Feel
            <br />
            <span style={{ color: '#8BC34A' }}>Brand New</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-lg sm:text-xl text-white/90 leading-relaxed mb-10 max-w-2xl"
          >
            Professional Artificial Turf Cleaning, Putting Green Refresh, and
            Restoration for Denver Metro Homeowners.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button href="/contact" variant="inverse" size="lg">
              Get a Free Quote
            </Button>
            <Button
              href={`tel:${company.phone.replace(/[^0-9]/g, '')}`}
              variant="outline"
              size="lg"
            >
              <Phone className="w-5 h-5" />
              {company.phone}
            </Button>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
