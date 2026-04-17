export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  message?: string;
  sourceUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  status: LeadStatus;
  createdAt: string;
}

export type ServiceType =
  | 'putting-green-refresh'
  | 'turf-cleaning'
  | 'turf-sanitization'
  | 'turf-restoration'
  | 'not-sure';

export type LeadStatus = 'new' | 'contacted' | 'quoted' | 'won' | 'lost';

export interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  category: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  whatIncludes: string[];
  iconName: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  faqs: ServiceFAQ[];
}

export interface Location {
  slug: string;
  name: string;
  county: string;
  description: string;
  serviceAreaDescription: string;
  neighborhoods: string[];
  metaTitle: string;
  metaDescription: string;
  localContext: string;
}

export interface Testimonial {
  customerName: string;
  customerLocation: string;
  rating: number;
  reviewText: string;
  serviceType: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'services' | 'putting-greens' | 'locations';
  serviceSlug?: string;
  locationSlug?: string;
}

export interface Company {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  serviceArea: string;
  description: string;
  mission: string;
  differentiators: string[];
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
