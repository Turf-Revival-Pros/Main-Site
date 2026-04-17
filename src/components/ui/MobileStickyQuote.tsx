'use client';

import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

export default function MobileStickyQuote() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden py-2 px-4 shadow-[0_-2px_10px_rgba(0,0,0,0.15)]"
      style={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className="flex gap-3">
        <a
          href="tel:7204501653"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-etr-green-dark py-3 rounded-lg font-heading font-semibold text-sm min-h-[44px] transition-colors hover:bg-gray-50"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-2 text-etr-green-dark py-3 rounded-lg font-heading font-semibold text-sm min-h-[44px] transition-opacity hover:opacity-90"
          style={{ background: '#8BC34A' }}
        >
          Free Quote
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
