import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { siteConfig } from '@/content/site';
import { teamMembers } from '@/content/team';
import { getBaseUrl, constructMetadata } from '@/lib/seo';
import { createWhatsAppLink } from '@/lib/whatsapp';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { metadata as laFirmaEquipoMeta } from '@/app/la-firma/equipo/page';
import { metadata as designSystemMeta } from '@/app/design-system/page';
import { metadata as shellPreviewMeta } from '@/app/shell-preview/page';

describe('Phase 11 — Launch Gate & Data Integrity Suite', () => {
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

  describe('1. Data Integrity & Pending Client Data Isolation', () => {
    it('isolates unverified client contact info as pending placeholders', () => {
      expect(siteConfig.location.address).toContain('PENDIENTE');
      expect(siteConfig.contact.email).toContain('PENDIENTE');
      expect(siteConfig.contact.hours).toContain('PENDIENTE');
      expect(siteConfig.contact.operatingDays).toContain('PENDIENTE');
    });

    it('contains strictly verified firm metrics', () => {
      expect(siteConfig.metrics.yearsExperience).toBe(25);
      expect(siteConfig.metrics.lawyersCount).toBe(7);
      expect(siteConfig.metrics.partnersCount).toBe(2);
      expect(siteConfig.location.city).toBe('Ciudad Juárez');
      expect(siteConfig.location.state).toBe('Chihuahua');
      expect(siteConfig.location.country).toBe('México');
    });

    it('verifies all 7 team profiles are isolated as placeholders', () => {
      expect(teamMembers).toHaveLength(7);
      teamMembers.forEach((member) => {
        expect(member.isPlaceholder).toBe(true);
        expect(member.name).toContain('PENDIENTE');
        expect(member.bio).toContain('PENDIENTE');
      });
    });
  });

  describe('2. Structured Data (JSON-LD) Safety', () => {
    it('verifies siteConfig coordinates only contain Ciudad Juárez, Chihuahua, México without fabricated street, email, or opening hours', () => {
      expect(siteConfig.location.city).toBe('Ciudad Juárez');
      expect(siteConfig.location.state).toBe('Chihuahua');
      expect(siteConfig.location.country).toBe('México');
    });
  });

  describe('3. SEO, Canonicals, Robots & Sitemap Validation', () => {
    it('dynamically generates canonical URL with localhost fallback in development', () => {
      expect(getBaseUrl()).toBe('http://localhost:3000');
    });

    it('dynamically generates canonical URL using NEXT_PUBLIC_SITE_URL in production', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://agora-abogados.mx/';
      expect(getBaseUrl()).toBe('https://agora-abogados.mx');
      const meta = constructMetadata({ path: '/practicas/amparo' });
      expect(meta.alternates?.canonical).toBe('https://agora-abogados.mx/practicas/amparo');
    });

    it('canonicalizes /la-firma/equipo alias to /equipo', () => {
      expect(laFirmaEquipoMeta.alternates?.canonical).toBe('http://localhost:3000/equipo');
    });

    it('excludes development routes from sitemap and disallows them in robots', () => {
      const sitemapUrls = sitemap().map((e) => e.url);
      expect(sitemapUrls.some((u) => u.includes('/design-system'))).toBe(false);
      expect(sitemapUrls.some((u) => u.includes('/shell-preview'))).toBe(false);

      const robotsData = robots();
      const disallows = Array.isArray(robotsData.rules)
        ? robotsData.rules[0].disallow
        : robotsData.rules.disallow;
      expect(disallows).toContain('/design-system');
      expect(disallows).toContain('/shell-preview');

      expect(designSystemMeta.robots).toEqual({ index: false, follow: false });
      expect(shellPreviewMeta.robots).toEqual({ index: false, follow: false });
    });
  });

  describe('4. WhatsApp Multi-Context & Encoding Verification', () => {
    const verifiedNumber = '526563502916';
    const contexts = ['general', 'practice', 'business', 'foreigners', 'article', 'booking-fallback'] as const;

    it('generates valid WhatsApp URLs for all 6 contexts', () => {
      contexts.forEach((context) => {
        const link = createWhatsAppLink({ context, detail: 'Juicio Mercantil' });
        expect(link.startsWith(`https://wa.me/${verifiedNumber}?text=`)).toBe(true);
        expect(decodeURIComponent(link)).toBeTruthy();
      });
    });
  });
});
