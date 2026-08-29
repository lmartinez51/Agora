import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { DesktopNav } from '@/components/navigation/DesktopNav';
import { MobileNav } from '@/components/navigation/MobileNav';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { siteConfig } from '@/content/site';

export function Header(): React.ReactElement {
  return (
    <header className="sticky top-0 z-30 w-full bg-brand-canvas/95 backdrop-blur-xs border-b border-brand-border transition-colors">
      <Container size="xl">
        <div className="flex items-center justify-between h-24 gap-3 sm:gap-6">
          {/* Brand Identity / Monogram Placeholder */}
          <Link
            href="/"
            className="flex flex-col group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm py-1 flex-shrink-0"
            aria-label={`${siteConfig.name} — ${siteConfig.descriptor}`}
          >
            <span className="text-xl sm:text-2xl xl:text-3xl font-serif font-bold text-brand-primary tracking-tight group-hover:text-black transition-colors leading-none">
              {siteConfig.name}
            </span>
            <span className="text-[10px] sm:text-[11px] xl:text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold mt-1.5">
              {siteConfig.descriptor}
            </span>
          </Link>

          {/* Desktop Navigation (Rendered on xl >= 1280px) */}
          <DesktopNav />

          {/* Header Action & Mobile Menu */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 flex-shrink-0">
            {/* Desktop Full WhatsApp CTA */}
            <div className="hidden xl:block">
              <WhatsAppCTA
                context="general"
                size="md"
                label="Consultar por WhatsApp"
                className="text-xs px-4 py-2.5 font-semibold shadow-subtle"
              />
            </div>

            {/* Mobile / Tablet Compact WhatsApp CTA */}
            <div className="block xl:hidden">
              <WhatsAppCTA
                context="general"
                size="sm"
                label="WhatsApp"
                className="text-xs px-3 py-2 font-semibold shadow-subtle"
              />
            </div>

            {/* Mobile Navigation Trigger */}
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
