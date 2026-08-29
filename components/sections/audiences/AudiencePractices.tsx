import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { TextLink } from '@/components/ui/TextLink';
import { practices } from '@/content/practices';

export interface AudiencePracticesProps {
  practiceSlugs: string[];
  title?: string;
  description?: string;
}

export function AudiencePractices({
  practiceSlugs,
  title = 'Áreas de práctica aplicables',
  description = 'Disciplinas jurídicas frecuentemente requeridas en este perfil de atención.',
}: AudiencePracticesProps): React.ReactElement {
  const filteredPractices = practices.filter((p) => practiceSlugs.includes(p.slug));

  return (
    <section className="py-14 sm:py-20 bg-brand-canvas border-b border-brand-border" aria-label="Áreas de práctica relacionadas con este perfil">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <SectionHeading
            eyebrow="Especialidades Relacionadas"
            title={title}
            description={description}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPractices.map((practice) => (
            <Card
              key={practice.slug}
              variant="interactive"
              title={practice.title}
              description={practice.shortDescription}
              className="flex flex-col justify-between h-full bg-brand-surface"
              action={
                <div className="pt-2">
                  <TextLink
                    href={`/practicas/${practice.slug}`}
                    variant="accent"
                    showArrow
                    className="text-xs font-semibold"
                  >
                    Detalle y servicios de {practice.title}
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
