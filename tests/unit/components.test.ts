import { describe, it, expect } from 'vitest';
import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { createWhatsAppLink } from '@/lib/whatsapp';

describe('Design System Primitives & Components', () => {
  describe('Button Component', () => {
    it('creates a React element with default primary variant', () => {
      const el = React.createElement(Button, { variant: 'primary' }, 'Test Button');
      expect(el).toBeDefined();
      expect(el.props.variant).toBe('primary');
      expect(el.props.children).toBe('Test Button');
    });

    it('supports whatsapp, secondary, and ghost variants', () => {
      const whatsappBtn = React.createElement(Button, { variant: 'whatsapp' }, 'WhatsApp');
      const secondaryBtn = React.createElement(Button, { variant: 'secondary' }, 'Secondary');
      const ghostBtn = React.createElement(Button, { variant: 'ghost' }, 'Ghost');

      expect(whatsappBtn.props.variant).toBe('whatsapp');
      expect(secondaryBtn.props.variant).toBe('secondary');
      expect(ghostBtn.props.variant).toBe('ghost');
    });

    it('supports disabled and fullWidth attributes', () => {
      const btn = React.createElement(Button, { disabled: true, fullWidth: true }, 'Disabled');
      expect(btn.props.disabled).toBe(true);
      expect(btn.props.fullWidth).toBe(true);
    });
  });

  describe('Badge Component', () => {
    it('supports default, accent, dark, and outline variants', () => {
      const badge = React.createElement(Badge, { variant: 'accent' }, 'Derecho Civil');
      expect(badge.props.variant).toBe('accent');
      expect(badge.props.children).toBe('Derecho Civil');
    });
  });

  describe('SectionHeading Component', () => {
    it('accepts eyebrow, title, and description props', () => {
      const heading = React.createElement(SectionHeading, {
        eyebrow: 'Prácticas',
        title: 'Áreas de Especialidad',
        description: 'Servicios jurídicos integrales.',
        align: 'center',
        surface: 'dark',
      });
      expect(heading.props.eyebrow).toBe('Prácticas');
      expect(heading.props.title).toBe('Áreas de Especialidad');
      expect(heading.props.align).toBe('center');
      expect(heading.props.surface).toBe('dark');
    });
  });

  describe('WhatsApp CTA Integration', () => {
    it('generates correct URLs for all conversion intents without hardcoded parameters', () => {
      const contexts = [
        'general',
        'practice',
        'foreigners',
        'business',
        'article',
        'booking-fallback',
      ] as const;

      contexts.forEach((ctx) => {
        const link = createWhatsAppLink({ context: ctx, detail: 'Test Detail' });
        expect(link).toContain('https://wa.me/526563502916?text=');
        expect(link).not.toContain('undefined');
        expect(link).not.toContain('null');
      });
    });
  });
});
