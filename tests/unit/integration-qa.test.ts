import { describe, it, expect } from 'vitest';
import { getPractices, getArticles, getAudiences, getTeam, getPracticeBySlug, getArticleBySlug } from '@/lib/content';
import { siteConfig } from '@/content/site';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { constructMetadata, getBaseUrl } from '@/lib/seo';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';

describe('Phase 9 — Integral QA & Production Readiness Suite', () => {
  describe('1. Content & Route Integrity', () => {
    it('verifies all 5 confirmed practice areas resolve with valid data', async () => {
      const practices = await getPractices();
      expect(practices).toHaveLength(5);
      for (const p of practices) {
        const item = await getPracticeBySlug(p.slug);
        expect(item).not.toBeNull();
        expect(item?.slug).toBe(p.slug);
        expect(item?.title).toBeTruthy();
        expect(item?.services.length).toBeGreaterThan(0);
      }
    });

    it('verifies all confirmed articles resolve with valid data', async () => {
      const articles = await getArticles();
      expect(articles.length).toBeGreaterThanOrEqual(3);
      for (const a of articles) {
        const item = await getArticleBySlug(a.slug);
        expect(item).not.toBeNull();
        expect(item?.slug).toBe(a.slug);
        expect(item?.title).toBeTruthy();
        expect(item?.content).toBeTruthy();
      }
    });

    it('verifies all 3 audience tracks resolve with valid contexts', async () => {
      const audiences = await getAudiences();
      expect(audiences).toHaveLength(3);
      const contexts = audiences.map((a) => a.ctaContext);
      expect(contexts).toEqual(['general', 'business', 'foreigners']);
    });

    it('verifies team structure matches verified metrics (7 lawyers, 2 partners)', async () => {
      const team = await getTeam();
      expect(team).toHaveLength(7);
      const partners = team.filter((m) => m.role === 'partner');
      const associates = team.filter((m) => m.role === 'associate');
      expect(partners).toHaveLength(2);
      expect(associates).toHaveLength(5);
    });
  });

  describe('2. WhatsApp Contextual Routing & Phone Validation', () => {
    const verifiedPhone = '526563502916';

    it('generates syntactically valid WhatsApp URLs with verified phone for all contexts', () => {
      const contexts = [
        { context: 'general' as const, expected: '526563502916' },
        { context: 'practice' as const, detail: 'Derecho Civil', expected: 'Derecho%20Civil' },
        { context: 'business' as const, expected: 'corporativa' },
        { context: 'foreigners' as const, expected: 'Mexico' },
        { context: 'article' as const, detail: 'Amparo', expected: 'Amparo' },
        { context: 'booking-fallback' as const, expected: 'agendar' },
      ];

      for (const c of contexts) {
        const url = createWhatsAppLink({ context: c.context, detail: c.detail });
        expect(url).toContain(`https://wa.me/${verifiedPhone}?text=`);
        expect(url).toContain(c.expected);
      }
    });

    it('verifies siteConfig phone numbers adhere to verified contact data', () => {
      expect(siteConfig.contact.phoneDisplay).toBe('+52 656 350 2916');
      expect(siteConfig.contact.phoneHref).toBe('tel:+526563502916');
      expect(siteConfig.contact.whatsappNumber).toBe('526563502916');
    });
  });

  describe('3. SEO, Canonical, Sitemap & Robots Validation', () => {
    it('generates valid canonical metadata dynamically from base URL', () => {
      const meta = constructMetadata({ path: '/practicas/derecho-civil' });
      expect(meta.alternates?.canonical).toBe('http://localhost:3000/practicas/derecho-civil');
      expect(meta.openGraph?.url).toBe('http://localhost:3000/practicas/derecho-civil');
    });

    it('generates a comprehensive sitemap containing static, practice, and article routes', () => {
      const siteMapEntries = sitemap();
      expect(siteMapEntries.length).toBeGreaterThanOrEqual(19);
      const urls = siteMapEntries.map((e) => e.url);

      // Core pages
      expect(urls).toContain('http://localhost:3000');
      expect(urls).toContain('http://localhost:3000/practicas');
      expect(urls).toContain('http://localhost:3000/personas');
      expect(urls).toContain('http://localhost:3000/empresas');
      expect(urls).toContain('http://localhost:3000/extranjeros');
      expect(urls).toContain('http://localhost:3000/la-firma');
      expect(urls).toContain('http://localhost:3000/equipo');
      expect(urls).toContain('http://localhost:3000/conocimiento');
      expect(urls).toContain('http://localhost:3000/agenda');
      expect(urls).toContain('http://localhost:3000/contacto');
      expect(urls).toContain('http://localhost:3000/aviso-de-privacidad');

      // Dynamic practices
      expect(urls).toContain('http://localhost:3000/practicas/derecho-civil');
      expect(urls).toContain('http://localhost:3000/practicas/amparo');

      // Dynamic articles
      expect(urls).toContain('http://localhost:3000/conocimiento/guia-legal-extranjeros-litigios-mexico');
    });

    it('generates valid robots.txt pointing to the dynamic sitemap URL', () => {
      const robotsRules = robots();
      expect(robotsRules.rules).toBeDefined();
      expect(robotsRules.sitemap).toBe('http://localhost:3000/sitemap.xml');
    });
  });
});
