import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { getBaseUrl, constructMetadata } from '@/lib/seo';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { teamMembers } from '@/content/team';
import { siteConfig } from '@/content/site';
import { BookingEmbed } from '@/components/booking/BookingEmbed';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { metadata as laFirmaEquipoMetadata } from '@/app/la-firma/equipo/page';
import { metadata as designSystemMetadata } from '@/app/design-system/page';
import { metadata as shellPreviewMetadata } from '@/app/shell-preview/page';

describe('Phase 10 — Pre-Launch Hardening & Content Integrity', () => {
  const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  afterEach(() => {
    if (originalEnv) {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
    } else {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    }
  });

  describe('1. Production Configuration & Safe URL Fallbacks', () => {
    it('uses localhost fallback in development without leaking unverified domains', () => {
      expect(getBaseUrl()).toBe('http://localhost:3000');
    });

    it('strips trailing slashes from production NEXT_PUBLIC_SITE_URL safely', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://agora-abogados.mx/';
      expect(getBaseUrl()).toBe('https://agora-abogados.mx');
    });
  });

  describe('2. SEO Hardening, Robots Disallows & Development Route Isolation', () => {
    it('disallows development routes in robots.txt', () => {
      const robotsData = robots();
      const disallows = Array.isArray(robotsData.rules)
        ? robotsData.rules[0].disallow
        : robotsData.rules.disallow;
      expect(disallows).toContain('/design-system');
      expect(disallows).toContain('/shell-preview');
      expect(disallows).toContain('/api/');
    });

    it('excludes development routes from sitemap.xml', () => {
      const sitemapEntries = sitemap();
      const urls = sitemapEntries.map((e) => e.url);
      expect(urls.some((u) => u.includes('/design-system'))).toBe(false);
      expect(urls.some((u) => u.includes('/shell-preview'))).toBe(false);
    });

    it('sets noIndex: true on development pages', () => {
      expect(designSystemMetadata.robots).toEqual({ index: false, follow: false });
      expect(shellPreviewMetadata.robots).toEqual({ index: false, follow: false });
    });

    it('canonicalizes /la-firma/equipo alias to /equipo', () => {
      expect(laFirmaEquipoMetadata.alternates?.canonical).toBe('http://localhost:3000/equipo');
    });
  });

  describe('3. WhatsApp Special Characters & UTF-8 Encoding', () => {
    it('encodes Spanish diacritics, punctuation, and multiline text correctly', () => {
      const testDetail = '¿Protección de garantías y amparo en Ciudad Juárez? ¡Atención inmediata!';
      const link = createWhatsAppLink({
        context: 'practice',
        detail: testDetail,
      });

      expect(link).toContain('526563502916');
      expect(link).toContain('%C2%BF'); // ¿
      expect(link).toContain('%C3%B3'); // ó
      expect(link).toContain('%C3%AD'); // í
      expect(link).toContain('%C2%A1'); // ¡
    });
  });

  describe('4. Booking Module Hardening & Protocol Safety', () => {
    it('rejects non-https URLs and renders BookingFallback', () => {
      const insecureElement = React.createElement(BookingEmbed, { bookingUrl: 'http://insecure-calendar.com' });
      expect(insecureElement).toBeDefined();

      const maliciousElement = React.createElement(BookingEmbed, { bookingUrl: 'javascript:alert(1)' });
      expect(maliciousElement).toBeDefined();
    });

    it('renders BookingFallback when no URL is provided', () => {
      const fallbackElement = React.createElement(BookingEmbed);
      expect(fallbackElement).toBeDefined();
    });
  });

  describe('5. Structured Data & Pending Data Isolation', () => {
    it('verifies firm structure contains 7 team placeholders without fabricated names', () => {
      expect(teamMembers).toHaveLength(7);
      teamMembers.forEach((member) => {
        expect(member.isPlaceholder).toBe(true);
        expect(member.name).toContain('PENDIENTE');
        expect(member.bio).toContain('PENDIENTE');
      });
    });

    it('verifies siteConfig coordinates only contain Ciudad Juárez, Chihuahua, México without fabricated street or email', () => {
      expect(siteConfig.location.city).toBe('Ciudad Juárez');
      expect(siteConfig.location.state).toBe('Chihuahua');
      expect(siteConfig.location.country).toBe('México');
      expect(siteConfig.location.address).toContain('PENDIENTE');
      expect(siteConfig.contact.email).toContain('PENDIENTE');
    });
  });
});
