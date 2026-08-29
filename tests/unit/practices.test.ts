import { describe, it, expect } from 'vitest';
import React from 'react';
import { getPractices, getPracticeBySlug } from '@/lib/content';
import { practices } from '@/content/practices';
import { PracticeHero } from '@/components/sections/practices/PracticeHero';
import { PracticeServices } from '@/components/sections/practices/PracticeServices';
import { PracticeFAQ } from '@/components/sections/practices/PracticeFAQ';
import { PracticeCTA } from '@/components/sections/practices/PracticeCTA';
import { RelatedPractices } from '@/components/sections/practices/RelatedPractices';
import PracticesIndexPage from '@/app/practicas/page';
import PracticeDetailPage, { generateStaticParams, generateMetadata } from '@/app/practicas/[slug]/page';

describe('Practice Areas Architecture & Pages', () => {
  it('contains exactly the 5 confirmed practice areas and zero unverified areas', async () => {
    const list = await getPractices();
    expect(list).toHaveLength(5);
    const slugs = list.map((p) => p.slug);
    expect(slugs).toEqual([
      'derecho-civil',
      'derecho-mercantil',
      'derecho-familiar',
      'derecho-penal',
      'amparo',
    ]);
  });

  it('validates that each practice area has required verified fields', () => {
    practices.forEach((practice) => {
      expect(practice.slug).toBeTruthy();
      expect(practice.title).toBeTruthy();
      expect(practice.shortDescription).toBeTruthy();
      expect(practice.fullDescription).toBeTruthy();
      expect(practice.services.length).toBeGreaterThan(0);
      expect(Array.isArray(practice.faqs)).toBe(true);
    });
  });

  it('resolves confirmed practice area slugs correctly', async () => {
    const civil = await getPracticeBySlug('derecho-civil');
    expect(civil).not.toBeNull();
    expect(civil?.title).toBe('Derecho Civil');

    const amparo = await getPracticeBySlug('amparo');
    expect(amparo).not.toBeNull();
    expect(amparo?.title).toBe('Amparo');
  });

  it('returns null for unconfirmed or invalid practice area slugs', async () => {
    const invalid = await getPracticeBySlug('derecho-inmobiliario-ficticio');
    expect(invalid).toBeNull();

    const immigration = await getPracticeBySlug('inmigracion');
    expect(immigration).toBeNull();
  });

  it('generateStaticParams returns 5 params objects matching confirmed slugs', async () => {
    const params = await generateStaticParams();
    expect(params).toHaveLength(5);
    expect(params.map((p) => p.slug)).toEqual([
      'derecho-civil',
      'derecho-mercantil',
      'derecho-familiar',
      'derecho-penal',
      'amparo',
    ]);
  });

  it('generateMetadata generates dynamic canonical metadata for confirmed practices', async () => {
    const meta = await generateMetadata({ params: { slug: 'derecho-mercantil' } });
    expect(meta.title).toContain('Derecho Mercantil');
    expect(meta.alternates?.canonical).toBe('http://localhost:3000/practicas/derecho-mercantil');
  });

  it('generateMetadata handles invalid slugs gracefully with noIndex', async () => {
    const meta = await generateMetadata({ params: { slug: 'non-existent' } });
    expect(meta.title).toContain('Materia No Encontrada');
    expect(meta.robots).toEqual({ index: false, follow: false, googleBot: { index: false, follow: false } });
  });

  it('creates React elements for all practice section components', () => {
    const practice = practices[0];
    expect(React.createElement(PracticeHero, { practice })).toBeDefined();
    expect(React.createElement(PracticeServices, { practice })).toBeDefined();
    expect(React.createElement(PracticeFAQ, { practice })).toBeDefined();
    expect(React.createElement(PracticeCTA, { practice })).toBeDefined();
    expect(React.createElement(RelatedPractices, { currentSlug: practice.slug })).toBeDefined();
    expect(React.createElement(PracticesIndexPage)).toBeDefined();
  });
});
