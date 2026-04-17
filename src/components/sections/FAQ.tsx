'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/data/faqs';
import type { FAQItem } from '@/types';

interface FAQProps {
  category?: FAQItem['category'];
  limit?: number;
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
}

export default function FAQ({
  category,
  limit,
  title = 'Frequently Asked Questions',
  subtitle,
  items: providedItems,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  let filteredFaqs: FAQItem[] = providedItems || faqs;
  if (!providedItems && category) {
    filteredFaqs = faqs.filter((faq) => faq.category === category);
  }
  if (limit) {
    filteredFaqs = filteredFaqs.slice(0, limit);
  }

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (filteredFaqs.length === 0) return null;

  // FAQPage schema for search engines
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: filteredFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-etr-black mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-etr-gray-light">{subtitle}</p>
          )}
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="flex items-center justify-between w-full px-6 py-4 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-sm font-heading font-semibold text-etr-black pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-etr-gray-light shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-4">
                      <p className="text-sm text-etr-gray-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
