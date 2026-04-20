import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Turf Revival Pros',
  description:
    'Terms of service for Turf Revival Pros. Review the terms and conditions governing your use of our website and services.',
};

export default function TermsOfServicePage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm prose-gray">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-etr-black mb-8">
          Terms of Service
        </h1>
        <p className="text-sm text-etr-gray-light mb-4">
          Last updated: January 1, 2025
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          Agreement to Terms
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          By accessing and using the website at turfrevivalpros.com, you agree
          to be bound by these Terms of Service. If you do not agree with any
          part of these terms, you may not use our website or services.
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          Services
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          Turf Revival Pros provides professional artificial turf cleaning,
          sanitization, restoration, and putting green maintenance services in
          the Denver metro area. All services are subject to availability and
          scheduling. Service descriptions on our website are for informational
          purposes. Specific scope, pricing, and timelines will be confirmed in
          your individual service agreement or estimate.
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          Estimates &amp; Pricing
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          All estimates provided through our website or by our team are
          non-binding until a formal service agreement is signed. Pricing may
          vary based on turf condition, area size, and scope of work. We reserve
          the right to adjust pricing based on on-site assessment.
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          Intellectual Property
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          All content on this website, including text, images, logos, and design,
          is the property of Turf Revival Pros and is protected by applicable
          intellectual property laws. You may not reproduce, distribute, or use
          any content from this website without our written permission.
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          Limitation of Liability
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          Turf Revival Pros shall not be liable for any indirect, incidental, or
          consequential damages arising from the use of our website or services.
          Our total liability shall not exceed the amount paid for the specific
          service giving rise to the claim.
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          User Conduct
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          You agree not to use our website for any unlawful purpose, to submit
          false or misleading information, or to attempt to interfere with the
          proper functioning of the website.
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          Changes to Terms
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          We reserve the right to update these Terms of Service at any time.
          Changes will be posted on this page with an updated revision date.
          Continued use of the website constitutes acceptance of the revised
          terms.
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          Contact
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          For questions about these Terms of Service, contact us at:
        </p>
        <ul className="text-etr-gray-light space-y-1 mb-4">
          <li>
            <strong>Turf Revival Pros</strong>
          </li>
          <li>
            Email:{' '}
            <a
              href="mailto:info@turfrevivalpros.com"
              className="text-etr-blue hover:text-etr-blue-dark"
            >
              info@turfrevivalpros.com
            </a>
          </li>
          <li>Phone: (719) 859-0314</li>
        </ul>
      </div>
    </section>
  );
}
