import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { TextLink } from '@/components/ui/TextLink';
import { audiences } from '@/content/audiences';

export interface OtherAudiencesProps {
  currentSlug: string;
}

export function OtherAudiences({ currentSlug }: OtherAudiencesProps): React.ReactElement {
  const otherAudiences = audiences.filter((a) => a.slug !== currentSlug);

  return (
    <section className="py-14 sm:py-20 bg-brand-surface border-b border-brand-border" aria-label="Otras opciones de atención por perfil">
      <Container size="xl">
        <SectionHeading
          eyebrow="Otros Perfiles de Atención"
          title="Consulte la modalidad de servicio que corresponda a su situación"
          className="max-w-2xl mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherAudiences.map((aud) => (
            <Card
              key={aud.slug}
              variant="interactive"
              eyebrow="Perfil"
              title={aud.title}
              description={aud.description}
              className="flex flex-col justify-between h-full bg-brand-canvas"
              action={
                <div className="pt-2">
                  <TextLink
                    href={`/${aud.slug}`}
                    variant="accent"
                    showArrow
                    className="text-xs font-semibold"
                  >
                    Conocer servicios para {aud.title.toLowerCase()}
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
