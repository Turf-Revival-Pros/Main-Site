import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Turf Revival Pros',
  description:
    'Privacy policy for Turf Revival Pros. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm prose-gray">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-etr-black mb-8">
          Privacy Policy
        </h1>
        <p className="text-sm text-etr-gray-light mb-4">
          Last updated: January 1, 2025
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          Information We Collect
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          Turf Revival Pros (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) collects information you voluntarily provide when
          you fill out our contact or quote request forms, including your name,
          email address, phone number, and details about your turf care needs. We
          may also collect usage data through cookies and analytics tools to
          understand how visitors interact with our website at
          turfrevivalpros.com.
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          How We Use Your Information
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          We use the information collected to respond to your inquiries, provide
          service estimates, schedule appointments, and communicate about our
          services. We may also use analytics data to improve our website and
          marketing efforts.
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          Information Sharing
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          We do not sell, trade, or otherwise transfer your personal information
          to third parties. We may share information with trusted service
          providers who assist us in operating our website and conducting
          business, so long as those parties agree to keep this information
          confidential.
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          Cookies
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          Our website may use cookies and similar tracking technologies to
          enhance your browsing experience and analyze site traffic. You can
          choose to disable cookies through your browser settings, though some
          features of the website may not function properly.
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          Data Retention
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          We retain your personal information only for as long as necessary to
          fulfill the purposes for which it was collected, or as required by law.
          Lead and contact form submissions are retained for up to 24 months
          unless you request deletion.
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          Your Rights
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          You have the right to request access to, correction of, or deletion of
          your personal information. You may also request that we cease
          processing your data. To exercise any of these rights, please contact
          us using the information below.
        </p>

        <h2 className="text-xl font-heading font-bold text-etr-black mt-8 mb-3">
          Contact Us
        </h2>
        <p className="text-etr-gray-light leading-relaxed mb-4">
          If you have questions about this Privacy Policy or how we handle your
          data, please contact us at:
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
