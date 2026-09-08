import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { DesktopNav } from '@/components/navigation/DesktopNav';
import { MobileNav } from '@/components/navigation/MobileNav';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { siteConfig } from '@/content/site';

export function Header(): React.ReactElement {
  return (
    <header className="sticky top-0 z-30 w-full bg-brand-canvas/95 backdrop-blur-xs border-b border-brand-border transition-colors">
      <Container size="xl">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-3 sm:gap-6">
          {/* Canonical Institutional Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm py-1 flex-shrink-0"
            aria-label={`${siteConfig.name} — ${siteConfig.descriptor}`}
          >
            <Image
              src="/brand/Logo-Agora-Refinado.svg"
              alt=""
              width={38}
              height={38}
              unoptimized
              className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 object-contain flex-shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold text-brand-primary tracking-tight group-hover:text-black transition-colors leading-none">
                {siteConfig.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-brand-accent font-semibold mt-1">
                {siteConfig.descriptor}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Rendered on xl >= 1280px) */}
          <DesktopNav />

          {/* Header Actions & Mobile Navigation Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* Desktop WhatsApp CTA (When desktop nav is active) */}
            <div className="hidden xl:block">
              <WhatsAppCTA
                context="general"
                size="sm"
                label="WhatsApp"
                className="text-xs px-3.5 py-2 font-semibold shadow-subtle"
              />
            </div>

            {/* Mobile / Tablet Compact WhatsApp CTA */}
            <div className="block xl:hidden">
              <WhatsAppCTA
                context="general"
                size="sm"
                label="WhatsApp"
                className="text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 font-semibold shadow-subtle"
              />
            </div>

            {/* Mobile Navigation Drawer Trigger */}
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
