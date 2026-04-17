import type { Context } from '@netlify/functions';

interface LeadPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service?: string;
  timeline?: string;
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

export default async function handler(req: Request, _context: Context) {
  // CORS headers
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

    // Honeypot check
    if (body.website) {
      // Silently reject bot submissions
      return new Response(
        JSON.stringify({ success: true, message: 'Thank you!' }),
        { status: 200, headers }
      );
    }

    // Required field validation
    const firstName = sanitize(body.firstName || '');
    const lastName = sanitize(body.lastName || '');
    const phone = sanitize(body.phone || '');
    const email = sanitize(body.email || '');

    if (!firstName || !lastName || !phone || !email) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Please fill in all required fields.',
        }),
        { status: 400, headers }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Please provide a valid email address.',
        }),
        { status: 400, headers }
      );
    }

    if (!isValidPhone(phone)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Please provide a valid phone number.',
        }),
        { status: 400, headers }
      );
    }

    const leadData = {
      firstName,
      lastName,
      phone,
      email,
      service: sanitize(body.service || ''),
      timeline: sanitize(body.timeline || ''),
      message: sanitize(body.message || ''),
      formId: sanitize(body.formId || ''),
      location: sanitize(body.location || ''),
      sourceUrl: sanitize(body.sourceUrl || '', 2000),
      submittedAt: new Date().toISOString(),
    };

    // Log for now — GHL integration will be added later
    console.log('[LEAD]', JSON.stringify(leadData));

    return new Response(
      JSON.stringify({
        success: true,
        message:
          'Thank you! We received your request and will be in touch within 24 hours.',
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
