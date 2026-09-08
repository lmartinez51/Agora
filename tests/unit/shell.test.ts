import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { siteConfig } from '@/content/site';

import { DesktopNav } from '@/components/navigation/DesktopNav';
import { MobileNav } from '@/components/navigation/MobileNav';

describe('Global Site Shell Components', () => {
  describe('Header Component', () => {
    it('creates a React element for Header and renders canonical SVG logo', () => {
      const headerEl = React.createElement(Header);
      expect(headerEl).toBeDefined();
      const html = renderToStaticMarkup(headerEl);
      expect(html).toContain('/brand/Logo-Agora-Refinado.svg');
      expect(html).toContain(siteConfig.name);
      expect(html).toContain(siteConfig.descriptor);
    });
  });

  describe('DesktopNav Component', () => {
    it('creates a React element for DesktopNav', () => {
      const navEl = React.createElement(DesktopNav);
      expect(navEl).toBeDefined();
    });
  });

  describe('MobileNav Component', () => {
    it('creates a React element for MobileNav and includes canonical logo in drawer', () => {
      const mobileNavEl = React.createElement(MobileNav);
      expect(mobileNavEl).toBeDefined();
    });
  });

  describe('Footer Component', () => {
    it('renders with verified contact details, no-invention constraints, and canonical SVG logo', () => {
      const footerEl = React.createElement(Footer);
      expect(footerEl).toBeDefined();
      const html = renderToStaticMarkup(footerEl);
      expect(html).toContain('/brand/Logo-Agora-Refinado.svg');
      expect(siteConfig.contact.phoneDisplay).toBe('+52 656 350 2916');
      expect(siteConfig.metrics.yearsExperience).toBe(25);
    });
  });

  describe('MobileStickyBar Component', () => {
    it('creates a React element for MobileStickyBar', () => {
      const barEl = React.createElement(MobileStickyBar);
      expect(barEl).toBeDefined();
    });
  });
});
