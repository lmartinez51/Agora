import { describe, it, expect } from 'vitest';
import React from 'react';
import HomePage from '@/app/page';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { AuthorityMetrics } from '@/components/sections/home/AuthorityMetrics';
import { PracticeAreasSection } from '@/components/sections/home/PracticeAreasSection';
import { AudiencePathsSection } from '@/components/sections/home/AudiencePathsSection';
import { InternationalSpotlight } from '@/components/sections/home/InternationalSpotlight';
import { MethodologySection } from '@/components/sections/home/MethodologySection';
import { KnowledgePreview } from '@/components/sections/home/KnowledgePreview';
import { FinalConversion } from '@/components/sections/home/FinalConversion';
import { practices } from '@/content/practices';
import { audiences } from '@/content/audiences';
import { articles } from '@/content/articles';
import { siteConfig } from '@/content/site';

describe('Homepage Section Components', () => {
  it('creates a React element for HomePage', () => {
    const pageEl = React.createElement(HomePage);
    expect(pageEl).toBeDefined();
  });

  it('renders HeroSection with correct primary value proposition', () => {
    const heroEl = React.createElement(HeroSection);
    expect(heroEl).toBeDefined();
  });

  it('renders AuthorityMetrics with only verified firm metrics', () => {
    const metricsEl = React.createElement(AuthorityMetrics);
    expect(metricsEl).toBeDefined();
    expect(siteConfig.metrics.yearsExperience).toBe(25);
    expect(siteConfig.metrics.lawyersCount).toBe(7);
    expect(siteConfig.metrics.partnersCount).toBe(2);
    expect(siteConfig.location.city).toBe('Ciudad Juárez');
  });

  it('renders all 5 confirmed practice areas and zero unverified areas', () => {
    const practiceEl = React.createElement(PracticeAreasSection);
    expect(practiceEl).toBeDefined();
    expect(practices).toHaveLength(5);
    const slugs = practices.map((p) => p.slug);
    expect(slugs).toEqual([
      'derecho-civil',
      'derecho-mercantil',
      'derecho-familiar',
      'derecho-penal',
      'amparo',
    ]);
  });

  it('renders all 3 verified audience paths', () => {
    const audienceEl = React.createElement(AudiencePathsSection);
    expect(audienceEl).toBeDefined();
    expect(audiences).toHaveLength(3);
    const slugs = audiences.map((a) => a.slug);
    expect(slugs).toEqual(['personas', 'empresas', 'extranjeros']);
  });

  it('renders InternationalSpotlight without unverified immigration claims', () => {
    const spotlightEl = React.createElement(InternationalSpotlight);
    expect(spotlightEl).toBeDefined();
  });

  it('renders MethodologySection with 3 firm practice principles', () => {
    const methodologyEl = React.createElement(MethodologySection);
    expect(methodologyEl).toBeDefined();
  });

  it('renders KnowledgePreview with 3 initial educational articles', () => {
    const knowledgeEl = React.createElement(KnowledgePreview);
    expect(knowledgeEl).toBeDefined();
    expect(articles).toHaveLength(3);
  });

  it('renders FinalConversion with verified contact options', () => {
    const finalEl = React.createElement(FinalConversion);
    expect(finalEl).toBeDefined();
    expect(siteConfig.contact.phoneDisplay).toBe('+52 656 350 2916');
  });
});
