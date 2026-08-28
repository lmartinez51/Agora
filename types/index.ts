export interface FirmLocation {
  city: string;
  state: string;
  country: string;
  address: string; // PENDING CLIENT DATA
}

export interface FirmContact {
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string; // PENDING CLIENT DATA
  hours: string;
  operatingDays: string; // PENDING CLIENT DATA
}

export interface FirmMetrics {
  yearsExperience: number;
  lawyersCount: number;
  partnersCount: number;
}

export interface FirmConfig {
  name: string;
  descriptor: string;
  tagline: string;
  location: FirmLocation;
  contact: FirmContact;
  metrics: FirmMetrics;
  languages: string[];
}

export interface PracticeArea {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  services: string[];
  faqs: FAQItem[];
}

export interface AudienceTrack {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  ctaContext: WhatsAppContext;
}

export interface TeamMember {
  id: string;
  slug: string;
  role: 'partner' | 'associate';
  title: string;
  name: string; // PENDING CLIENT DATA
  bio: string; // PENDING CLIENT DATA
  practiceAreas: string[];
  isPlaceholder: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  readingTimeMinutes: number;
  content: string;
  relatedPractices: string[];
}

export type WhatsAppContext =
  | 'general'
  | 'practice'
  | 'foreigners'
  | 'business'
  | 'article'
  | 'booking-fallback';

export interface WhatsAppOptions {
  context: WhatsAppContext;
  detail?: string;
}
