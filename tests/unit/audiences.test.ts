import { describe, it, expect } from 'vitest';
import React from 'react';
import { getAudiences, getAudienceBySlug } from '@/lib/content';
import { audiences } from '@/content/audiences';
import { AudienceHero } from '@/components/sections/audiences/AudienceHero';
import { AudienceHighlights } from '@/components/sections/audiences/AudienceHighlights';
import { AudiencePractices } from '@/components/sections/audiences/AudiencePractices';
import { AudienceCTA } from '@/components/sections/audiences/AudienceCTA';
import { OtherAudiences } from '@/components/sections/audiences/OtherAudiences';
import PersonasPage from '@/app/personas/page';
import EmpresasPage from '@/app/empresas/page';
import ExtranjerosPage from '@/app/extranjeros/page';

describe('Audience Tracks Architecture & Pages', () => {
  it('contains exactly the 3 confirmed audience tracks', async () => {
    const list = await getAudiences();
    expect(list).toHaveLength(3);
    const slugs = list.map((a) => a.slug);
    expect(slugs).toEqual(['personas', 'empresas', 'extranjeros']);
  });

  it('validates required fields for each audience track', () => {
    audiences.forEach((audience) => {
      expect(audience.slug).toBeTruthy();
      expect(audience.title).toBeTruthy();
      expect(audience.subtitle).toBeTruthy();
      expect(audience.description).toBeTruthy();
      expect(audience.highlights.length).toBeGreaterThan(0);
      expect(['general', 'business', 'foreigners']).toContain(audience.ctaContext);
    });
  });

  it('resolves confirmed audience slugs correctly', async () => {
    const personas = await getAudienceBySlug('personas');
    expect(personas).not.toBeNull();
    expect(personas?.ctaContext).toBe('general');

    const empresas = await getAudienceBySlug('empresas');
    expect(empresas).not.toBeNull();
    expect(empresas?.ctaContext).toBe('business');

    const extranjeros = await getAudienceBySlug('extranjeros');
    expect(extranjeros).not.toBeNull();
    expect(extranjeros?.ctaContext).toBe('foreigners');
  });

  it('returns null for non-existent audience slug', async () => {
    const invalid = await getAudienceBySlug('inversionistas-ficticios');
    expect(invalid).toBeNull();
  });

  it('creates React elements for all audience section components', () => {
    const audience = audiences[0];
    expect(React.createElement(AudienceHero, { audience })).toBeDefined();
    expect(
      React.createElement(AudienceHighlights, {
        audience,
        detailedText: 'Test text',
        imageCaption: 'Test caption',
        imagePlaceholder: 'Test placeholder',
      })
    ).toBeDefined();
    expect(
      React.createElement(AudiencePractices, {
        practiceSlugs: ['derecho-civil', 'derecho-familiar'],
      })
    ).toBeDefined();
    expect(React.createElement(AudienceCTA, { audience })).toBeDefined();
    expect(React.createElement(OtherAudiences, { currentSlug: audience.slug })).toBeDefined();
  });

  it('creates React elements for /personas, /empresas, and /extranjeros pages', () => {
    expect(React.createElement(PersonasPage)).toBeDefined();
    expect(React.createElement(EmpresasPage)).toBeDefined();
    expect(React.createElement(ExtranjerosPage)).toBeDefined();
  });
});
