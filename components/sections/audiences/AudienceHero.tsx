import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';
import { AudienceTrack } from '@/types';
import { ChevronRight } from 'lucide-react';

export interface AudienceHeroProps {
  audience: AudienceTrack;
  badgeLabel?: string;
  ctaLabel?: string;
}

export function AudienceHero({
  audience,
  badgeLabel = 'Atención por Perfil',
  ctaLabel = 'Consultar por WhatsApp',
}: AudienceHeroProps): React.ReactElement {
  return (
    <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 bg-brand-canvas border-b border-brand-border" aria-label={`Introducción a ${audience.title}`}>
      <Container size="xl">
        {/* Breadcrumbs */}
        <nav aria-label="Ruta de navegación" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-brand-text-muted" role="list">
            <li>
              <Link href="/" className="hover:text-brand-primary transition-colors">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="text-brand-primary font-semibold" aria-current="page">
              {audience.title}
            </li>
          </ol>
        </nav>

        {/* Hero Content */}
        <div className="max-w-3xl space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold">
              {badgeLabel}
            </span>
            <span className="text-brand-border" aria-hidden="true">|</span>
            <Badge variant="outline" size="sm">
              Ciudad Juárez · Cobertura Nacional
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-primary tracking-tight leading-tight">
            {audience.title}
          </h1>

          <p className="text-sm font-mono text-brand-accent font-semibold">
            {audience.subtitle}
          </p>

          <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed">
            {audience.description}
          </p>

          {/* Action triggers */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
            <WhatsAppCTA
              context={audience.ctaContext}
              size="md"
              label={ctaLabel}
              className="justify-center shadow-subtle text-xs sm:text-sm"
            />
            <OnlineConsultationCTA
              size="md"
              label="Agendar consulta online"
              className="justify-center text-xs sm:text-sm"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
