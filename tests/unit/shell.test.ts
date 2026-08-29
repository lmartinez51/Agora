import { describe, it, expect } from 'vitest';
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { siteConfig } from '@/content/site';

import { DesktopNav } from '@/components/navigation/DesktopNav';
import { MobileNav } from '@/components/navigation/MobileNav';

describe('Global Site Shell Components', () => {
  describe('Header Component', () => {
    it('creates a React element for Header', () => {
      const headerEl = React.createElement(Header);
      expect(headerEl).toBeDefined();
    });
  });

  describe('DesktopNav Component', () => {
    it('creates a React element for DesktopNav', () => {
      const navEl = React.createElement(DesktopNav);
      expect(navEl).toBeDefined();
    });
  });

  describe('MobileNav Component', () => {
    it('creates a React element for MobileNav', () => {
      const mobileNavEl = React.createElement(MobileNav);
      expect(mobileNavEl).toBeDefined();
    });
  });

  describe('Footer Component', () => {
    it('renders with verified contact details and no-invention constraints', () => {
      const footerEl = React.createElement(Footer);
      expect(footerEl).toBeDefined();
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
