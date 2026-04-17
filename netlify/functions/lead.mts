import type { Context } from '@netlify/functions';

interface LeadPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service?: string;
  turfSize?: string;
  timeline?: string;
  address?: string;
  message?: string;
  formId?: string;
  location?: string;
  sourceUrl?: string;
  website?: string; // honeypot
}

function sanitize(input: string, maxLength = 500): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"']/g, '')
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

const SERVICE_LABELS: Record<string, string> = {
  'general-cleaning': 'General Cleaning (Debris, Disinfect & Bloom)',
  'putting-green-refresh': 'Putting Green Refresh & Tuning',
  'turf-cleaning': 'Pet Hair & Debris Removal',
  'turf-sanitization': 'Disinfect & Deodorize',
  'turf-restoration': 'Blooming & De-Compacting',
  'not-sure': 'Not Sure Yet',
};

const TURF_SIZE_LABELS: Record<string, string> = {
  'under-500': 'Under 500 sq ft',
  '500-1000': '500 – 1,000 sq ft',
  '1000-2000': '1,000 – 2,000 sq ft',
  '2000-plus': '2,000+ sq ft',
  'not-sure': 'Not sure',
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: 'ASAP',
  'within-week': 'Within a Week',
  'within-month': 'Within a Month',
  'no-rush': 'No Rush',
};

const WEBHOOK_URL = 'https://hook.us2.make.com/amzhwdum1uaftr6k995yl624ete6bq37';

export default async function handler(req: Request, _context: Context) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, message: 'Method not allowed' }),
      { status: 405, headers }
    );
  }

  try {
    const body: LeadPayload = await req.json();

    // Honeypot — silently accept to not tip off bots
    if (body.website) {
      return new Response(
        JSON.stringify({ success: true, message: 'Thank you!' }),
        { status: 200, headers }
      );
    }

    const firstName = sanitize(body.firstName || '');
    const lastName = sanitize(body.lastName || '');
    const phone = sanitize(body.phone || '');
    const email = sanitize(body.email || '');

    if (!firstName || !lastName || !phone || !email) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please fill in all required fields.' }),
        { status: 400, headers }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please provide a valid email address.' }),
        { status: 400, headers }
      );
    }

    if (!isValidPhone(phone)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please provide a valid phone number.' }),
        { status: 400, headers }
      );
    }

    const serviceKey = sanitize(body.service || '');
    const turfSizeKey = sanitize(body.turfSize || '');
    const timelineKey = sanitize(body.timeline || '');

    const leadData = {
      firstName,
      lastName,
      phone,
      email,
      service: serviceKey,
      serviceLabel: SERVICE_LABELS[serviceKey] || serviceKey || 'Not specified',
      turfSize: turfSizeKey,
      turfSizeLabel: TURF_SIZE_LABELS[turfSizeKey] || turfSizeKey || 'Not specified',
      timeline: timelineKey,
      timelineLabel: TIMELINE_LABELS[timelineKey] || timelineKey || 'Not specified',
      address: sanitize(body.address || '', 300),
      message: sanitize(body.message || ''),
      formId: sanitize(body.formId || ''),
      location: sanitize(body.location || ''),
      sourceUrl: sanitize(body.sourceUrl || '', 2000),
      submittedAt: new Date().toISOString(),
    };

    console.log('[LEAD]', JSON.stringify(leadData));

    // Forward to Make.com webhook
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
      console.log('[LEAD] Forwarded to webhook');
    } catch (err) {
      console.error('[LEAD WEBHOOK ERROR]', err);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you! We received your request and will be in touch within 24 hours.',
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('[LEAD ERROR]', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Something went wrong. Please try again or call us directly.',
      }),
      { status: 500, headers }
    );
  }
}
