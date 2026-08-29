import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { TextLink } from '@/components/ui/TextLink';
import { practices } from '@/content/practices';

export interface RelatedPracticesProps {
  currentSlug: string;
}

export function RelatedPractices({ currentSlug }: RelatedPracticesProps): React.ReactElement {
  const otherPractices = practices.filter((p) => p.slug !== currentSlug);

  return (
    <section className="py-14 sm:py-20 bg-brand-surface border-b border-brand-border" aria-label="Otras áreas de práctica jurídica">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <SectionHeading
            eyebrow="Especialidades Complementarias"
            title="Otras áreas de práctica jurídica"
            description="Asesoría integral en materias conexas ante tribunales locales y federales."
            className="mb-0 max-w-2xl"
          />
          <div className="flex-shrink-0">
            <Link
              href="/practicas"
              className="inline-flex items-center text-xs sm:text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors"
            >
              <span>Ver todas las prácticas</span>
              <span className="ml-1.5" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherPractices.map((practice) => (
            <Card
              key={practice.slug}
              variant="interactive"
              title={practice.title}
              description={practice.shortDescription}
              className="flex flex-col justify-between h-full bg-brand-canvas"
              action={
                <div className="pt-2">
                  <TextLink
                    href={`/practicas/${practice.slug}`}
                    variant="accent"
                    showArrow
                    className="text-xs font-semibold"
                  >
                    Detalle de {practice.title}
                  </TextLink>
                </div>
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
