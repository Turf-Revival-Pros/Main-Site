'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { company } from '@/data/company';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
          : 'bg-white py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/trp-logo-wide.png"
              alt="Turf Revival Pros"
              width={1000}
              height={250}
              className={`w-auto transition-all duration-300 ${
                isScrolled ? 'h-11' : 'h-12 lg:h-16'
              }`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-etr-black hover:text-etr-green transition-colors rounded-md"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {/* Desktop Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-64">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-etr-gray hover:text-etr-green hover:bg-etr-bg-alt transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${company.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-1.5 text-sm font-medium text-etr-gray hover:text-etr-green transition-colors"
              aria-label={`Call us at ${company.phone}`}
            >
              <Phone className="w-4 h-4" />
              {company.phone}
            </a>
            <Link
              href="/contact"
              className="bg-etr-green text-white px-5 py-2.5 rounded-lg text-sm font-heading font-semibold hover:bg-etr-green-dark transition-colors btn-hover"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-etr-black"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer — uses CSS transitions instead of framer-motion for reliable mobile behavior */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl overflow-y-auto lg:hidden transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <Image
              src="/images/trp-logo-wide.png"
              alt="Turf Revival Pros"
              width={1000}
              height={250}
              className="h-10 w-auto"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-etr-black"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-1" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => !item.children && setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-etr-black hover:text-etr-green hover:bg-etr-bg-alt rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-etr-green/20 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-sm text-etr-gray-light hover:text-etr-green transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
            <a
              href={`tel:${company.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-2 px-3 py-3 text-base font-medium text-etr-green"
            >
              <Phone className="w-5 h-5" />
              {company.phone}
            </a>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-etr-green text-white px-5 py-3 rounded-lg font-heading font-semibold hover:bg-etr-green-dark transition-colors"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
