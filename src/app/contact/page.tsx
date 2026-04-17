import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import LeadForm from '@/components/forms/LeadForm';
import { pageSEO } from '@/data/seo';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: pageSEO.contact.title,
  description: pageSEO.contact.description,
  keywords: pageSEO.contact.keywords,
};

export default function ContactPage() {
  return (
    <>
      <section className="py-16 sm:py-20" style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Ready to refresh your turf? Get in touch for a free, no-obligation
            estimate.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Lead Form */}
            <div className="lg:col-span-3">
              <LeadForm formId="contact-page" />
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-heading font-bold text-etr-black mb-6">
                  Get In Touch
                </h2>
                <div className="space-y-5">
                  <a
                    href={`tel:${company.phone.replace(/[^0-9]/g, '')}`}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-etr-green/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-etr-green" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-etr-gray">Phone</p>
                      <p className="text-base font-semibold text-etr-blue group-hover:text-etr-blue-dark transition-colors">
                        {company.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-etr-green/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-etr-green" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-etr-gray">Email</p>
                      <p className="text-base font-semibold text-etr-blue group-hover:text-etr-blue-dark transition-colors">
                        {company.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-etr-green/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-etr-green" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-etr-gray">
                        Service Area
                      </p>
                      <p className="text-base text-etr-black">
                        {company.serviceArea}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-etr-green/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-etr-green" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-etr-gray">
                        Business Hours
                      </p>
                      <p className="text-base text-etr-black">
                        Mon-Fri: 7am &ndash; 6pm
                      </p>
                      <p className="text-base text-etr-black">
                        Sat: 8am &ndash; 4pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-etr-bg-alt rounded-2xl p-6">
                <h3 className="text-base font-heading font-bold text-etr-black mb-2">
                  What happens next?
                </h3>
                <ol className="space-y-2 text-sm text-etr-gray-light">
                  <li className="flex gap-2">
                    <span className="font-semibold text-etr-green">1.</span>
                    We&apos;ll review your request within 24 hours
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-etr-green">2.</span>
                    We&apos;ll call to discuss your turf and needs
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-etr-green">3.</span>
                    We&apos;ll provide a custom estimate with no obligation
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
