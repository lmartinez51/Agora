import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { TextLink } from '@/components/ui/TextLink';
import { audiences } from '@/content/audiences';
import { Check } from 'lucide-react';

export function AudiencePathsSection(): React.ReactElement {
  return (
    <section className="py-16 sm:py-24 border-b border-brand-border bg-brand-surface" aria-label="Rutas de atención por perfil">
      <Container size="xl">
        <SectionHeading
          eyebrow="Atención por Perfil"
          title="Rutas de asesoría adaptadas a cada necesidad jurídica"
          description="Estructuramos el acompañamiento legal según la naturaleza de su situación patrimonial, comercial o transfronteriza."
          align="center"
          className="max-w-3xl mx-auto mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {audiences.map((audience) => {
            const isForeigners = audience.slug === 'extranjeros';

            return (
              <div
                key={audience.slug}
                className={`flex flex-col justify-between p-7 sm:p-8 rounded-md transition-all ${
                  isForeigners
                    ? 'border-2 border-brand-accent bg-brand-canvas shadow-card relative'
                    : 'border border-brand-border bg-brand-surface shadow-subtle hover:border-brand-accent/60'
                }`}
              >
                {/* Header / Badging */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-brand-text-muted font-semibold">
                      Perfil
                    </span>
                    {isForeigners && (
                      <Badge variant="accent" size="sm">
                        Atención Internacional
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-brand-primary mb-2">
                    {audience.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-accent mb-4 font-semibold leading-relaxed">
                    {audience.subtitle}
                  </p>
                  <p className="text-sm text-brand-text-secondary leading-relaxed mb-6">
                    {audience.description}
                  </p>

                  {/* Highlights list */}
                  <ul className="space-y-2.5 mb-8 border-t border-brand-border/70 pt-5" role="list">
                    {audience.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-brand-text-secondary leading-relaxed">
                        <Check className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-brand-border/70 flex flex-col gap-3">
                  <Link
                    href={`/${audience.slug}`}
                    className={`inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold rounded-sm transition-colors w-full ${
                      isForeigners
                        ? 'bg-brand-primary text-white hover:bg-neutral-800'
                        : 'border border-brand-primary text-brand-primary hover:bg-brand-muted'
                    }`}
                  >
                    Conocer servicios para {audience.title.toLowerCase()} &rarr;
                  </Link>
                  <div className="text-center">
                    <TextLink href="/agenda" variant="muted" className="text-xs">
                      Agendar sesión para este perfil
                    </TextLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
