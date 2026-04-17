'use client';

import { useState, useRef } from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface LeadFormProps {
  formId: string;
  location?: string;
  service?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  turfSize: string;
  timeline: string;
  address: string;
  message: string;
  website: string; // honeypot
}

export default function LeadForm({ formId, location, service }: LeadFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    service: service || '',
    turfSize: '',
    timeline: '',
    address: '',
    message: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const loadTimeRef = useRef(Date.now());

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Honeypot check
    if (formData.website) return;

    // Timing protection
    if (Date.now() - loadTimeRef.current < 3000) {
      setError('Please take a moment to fill out the form.');
      return;
    }

    // Validate all required fields
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.service ||
      !formData.turfSize ||
      !formData.timeline ||
      !formData.message.trim()
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/.netlify/functions/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formId,
          location: location || '',
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Something went wrong.');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to submit. Please try again or call us.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-etr-green" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-etr-black mb-2">
          Thank You!
        </h3>
        <p className="text-etr-gray-light">
          We received your request and will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const inputClasses =
    'w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-body text-etr-black focus:ring-2 focus:ring-etr-green/40 focus:border-etr-green outline-none transition-all';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
      <h3 className="text-xl font-heading font-bold text-etr-black mb-1">
        Get Your Free Quote
      </h3>
      <p className="text-sm text-etr-gray-light mb-6">
        Tell us about your turf and we&apos;ll provide a custom estimate.
      </p>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 text-red-700 text-sm p-3 rounded-lg mb-4">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor={`${formId}-firstName`}
              className="block text-sm font-medium text-etr-gray mb-1"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`${formId}-firstName`}
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className={inputClasses}
              placeholder="John"
            />
          </div>
          <div>
            <label
              htmlFor={`${formId}-lastName`}
              className="block text-sm font-medium text-etr-gray mb-1"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`${formId}-lastName`}
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Contact Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor={`${formId}-phone`}
              className="block text-sm font-medium text-etr-gray mb-1"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id={`${formId}-phone`}
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
              placeholder="(720) 555-0123"
            />
          </div>
          <div>
            <label
              htmlFor={`${formId}-email`}
              className="block text-sm font-medium text-etr-gray mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id={`${formId}-email`}
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Service Dropdown */}
        <div>
          <label
            htmlFor={`${formId}-service`}
            className="block text-sm font-medium text-etr-gray mb-1"
          >
            Service Interested In <span className="text-red-500">*</span>
          </label>
          <select
            id={`${formId}-service`}
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select a service...</option>
            <option value="general-cleaning">General Cleaning (Debris, Disinfect &amp; Bloom)</option>
            <option value="putting-green-refresh">Putting Green Refresh &amp; Tuning</option>
            <option value="turf-cleaning">Pet Hair &amp; Debris Removal</option>
            <option value="turf-sanitization">Disinfect &amp; Deodorize</option>
            <option value="turf-restoration">Blooming &amp; De-Compacting</option>
            <option value="not-sure">Not Sure</option>
          </select>
        </div>

        {/* Turf Size + Timeline Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor={`${formId}-turfSize`}
              className="block text-sm font-medium text-etr-gray mb-1"
            >
              Approximate Turf Size <span className="text-red-500">*</span>
            </label>
            <select
              id={`${formId}-turfSize`}
              name="turfSize"
              required
              value={formData.turfSize}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select size...</option>
              <option value="under-500">Under 500 sq ft</option>
              <option value="500-1000">500 – 1,000 sq ft</option>
              <option value="1000-2000">1,000 – 2,000 sq ft</option>
              <option value="2000-plus">2,000+ sq ft</option>
              <option value="not-sure">Not sure</option>
            </select>
          </div>
          <div>
            <label
              htmlFor={`${formId}-timeline`}
              className="block text-sm font-medium text-etr-gray mb-1"
            >
              Timeline <span className="text-red-500">*</span>
            </label>
            <select
              id={`${formId}-timeline`}
              name="timeline"
              required
              value={formData.timeline}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select a timeline...</option>
              <option value="asap">ASAP</option>
              <option value="within-week">Within a week</option>
              <option value="within-month">Within a month</option>
              <option value="no-rush">No rush</option>
            </select>
          </div>
        </div>

        {/* Address — optional, full width, visually prominent */}
        <div>
          <label
            htmlFor={`${formId}-address`}
            className="block text-sm font-medium text-etr-gray mb-1"
          >
            Property Address <span className="text-etr-gray-light font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id={`${formId}-address`}
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-lg border-2 border-gray-200 text-base font-body text-etr-black focus:ring-2 focus:ring-etr-green/40 focus:border-etr-green outline-none transition-all"
            placeholder="123 Main St, Parker, CO 80134"
          />
          <p className="mt-1 text-xs text-etr-gray-light">
            We can use your address to provide a more accurate quote.
          </p>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor={`${formId}-message`}
            className="block text-sm font-medium text-etr-gray mb-1"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={3}
            required
            value={formData.message}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Tell us about your turf — condition, any issues, what you're looking for."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-etr-green text-white py-3 rounded-lg font-heading font-semibold text-base hover:bg-etr-green-dark transition-colors btn-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            'Get My Free Quote'
          )}
        </button>
      </form>
    </div>
  );
}
