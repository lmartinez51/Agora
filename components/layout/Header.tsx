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
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Identity / Monogram Placeholder */}
          <Link
            href="/"
            className="flex flex-col group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm py-1"
            aria-label={`${siteConfig.name} — ${siteConfig.descriptor}`}
          >
            <span className="text-xl sm:text-2xl font-serif font-bold text-brand-primary tracking-tight group-hover:text-black transition-colors leading-none">
              {siteConfig.name}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-brand-accent font-semibold mt-1">
              {siteConfig.descriptor}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Header Action & Mobile Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block lg:hidden xl:block">
              <WhatsAppCTA
                context="general"
                size="sm"
                label="WhatsApp"
                className="text-xs px-3.5 py-1.5"
              />
            </div>
            <div className="hidden lg:block xl:hidden">
              <WhatsAppCTA
                context="general"
                size="sm"
                label="WhatsApp"
                showIcon={false}
                className="text-xs px-2.5 py-1.5"
              />
            </div>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
