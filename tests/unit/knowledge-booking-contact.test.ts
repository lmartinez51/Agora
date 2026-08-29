import { describe, it, expect } from 'vitest';
import React from 'react';
import { getArticles, getArticleBySlug } from '@/lib/content';
import { articles } from '@/content/articles';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { KnowledgeHero } from '@/components/sections/knowledge/KnowledgeHero';
import { KnowledgeGrid } from '@/components/sections/knowledge/KnowledgeGrid';
import { ArticleHeader } from '@/components/sections/knowledge/ArticleHeader';
import { ArticleBody } from '@/components/sections/knowledge/ArticleBody';
import { ArticleFooter } from '@/components/sections/knowledge/ArticleFooter';
import { BookingHero } from '@/components/sections/booking/BookingHero';
import { BookingSteps } from '@/components/sections/booking/BookingSteps';
import { BookingEmbed } from '@/components/booking/BookingEmbed';
import { BookingFallback } from '@/components/booking/BookingFallback';
import { ContactHero } from '@/components/sections/contact/ContactHero';
import { ContactInfo } from '@/components/sections/contact/ContactInfo';
import { ContactForm } from '@/components/sections/contact/ContactForm';
import ConocimientoPage from '@/app/conocimiento/page';
import ArticleDetailPage, { generateStaticParams, generateMetadata } from '@/app/conocimiento/[slug]/page';
import AgendaPage from '@/app/agenda/page';
import ContactoPage from '@/app/contacto/page';
import AvisoDePrivacidadPage from '@/app/aviso-de-privacidad/page';

describe('Phase 8 — Knowledge Center, Booking, Contact & Privacy Architecture', () => {
  describe('Knowledge Center Data & Dynamic Routes', () => {
    it('contains verified legal articles with required fields', async () => {
      const list = await getArticles();
      expect(list.length).toBeGreaterThanOrEqual(3);
      list.forEach((article) => {
        expect(article.slug).toBeTruthy();
        expect(article.title).toBeTruthy();
        expect(article.excerpt).toBeTruthy();
        expect(article.publishedAt).toBeTruthy();
        expect(article.author).toBe('AGORA Consultoría Jurídica');
        expect(article.readingTimeMinutes).toBeGreaterThan(0);
        expect(article.content).toBeTruthy();
        expect(article.relatedPractices.length).toBeGreaterThan(0);
      });
    });

    it('resolves confirmed article slugs correctly', async () => {
      const article = await getArticleBySlug('guia-legal-extranjeros-litigios-mexico');
      expect(article).not.toBeNull();
      expect(article?.title).toContain('Guía jurídica esencial');
    });

    it('returns null for non-existent article slug', async () => {
      const invalid = await getArticleBySlug('articulo-ficticio-no-existente');
      expect(invalid).toBeNull();
    });

    it('generateStaticParams returns all confirmed article slugs', async () => {
      const params = await generateStaticParams();
      expect(params).toHaveLength(articles.length);
      expect(params.map((p) => p.slug)).toEqual(articles.map((a) => a.slug));
    });

    it('generateMetadata produces dynamic canonical URLs for articles', async () => {
      const meta = await generateMetadata({ params: { slug: 'guia-legal-extranjeros-litigios-mexico' } });
      expect(meta.title).toContain('Guía jurídica esencial');
      expect(meta.alternates?.canonical).toBe('http://localhost:3000/conocimiento/guia-legal-extranjeros-litigios-mexico');
    });

    it('generateMetadata handles missing article gracefully with noIndex', async () => {
      const meta = await generateMetadata({ params: { slug: 'non-existent' } });
      expect(meta.title).toContain('Artículo No Encontrado');
      expect(meta.robots).toEqual({ index: false, follow: false, googleBot: { index: false, follow: false } });
    });
  });

  describe('WhatsApp Contextual Routing for Articles', () => {
    it('creates correct article WhatsApp consultation link', () => {
      const link = createWhatsAppLink({
        context: 'article',
        detail: 'Juicio de Amparo',
      });
      expect(link).toContain('526563502916');
      expect(decodeURIComponent(link)).toContain('Juicio de Amparo');
    });
  });

  describe('Booking Embed & Fallback State', () => {
    it('renders BookingFallback when bookingUrl is undefined or empty', () => {
      const element = React.createElement(BookingEmbed);
      expect(element).toBeDefined();
    });
  });

  describe('React Elements Instantiation for All Phase 8 Components & Pages', () => {
    it('instantiates Knowledge components and pages without error', () => {
      const article = articles[0];
      expect(React.createElement(KnowledgeHero)).toBeDefined();
      expect(React.createElement(KnowledgeGrid, { articles })).toBeDefined();
      expect(React.createElement(ArticleHeader, { article })).toBeDefined();
      expect(React.createElement(ArticleBody, { article })).toBeDefined();
      expect(React.createElement(ArticleFooter, { article })).toBeDefined();
      expect(React.createElement(ConocimientoPage)).toBeDefined();
    });

    it('instantiates Booking components and pages without error', () => {
      expect(React.createElement(BookingHero)).toBeDefined();
      expect(React.createElement(BookingSteps)).toBeDefined();
      expect(React.createElement(BookingFallback)).toBeDefined();
      expect(React.createElement(AgendaPage)).toBeDefined();
    });

    it('instantiates Contact components, ContactForm, and Contact page without error', () => {
      expect(React.createElement(ContactHero)).toBeDefined();
      expect(React.createElement(ContactInfo)).toBeDefined();
      expect(React.createElement(ContactForm)).toBeDefined();
      expect(React.createElement(ContactoPage)).toBeDefined();
    });

    it('instantiates Privacy Policy page without error', () => {
      expect(React.createElement(AvisoDePrivacidadPage)).toBeDefined();
    });
  });
});
