import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { TextLink } from '@/components/ui/TextLink';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';
import { Article } from '@/types';
import { practices } from '@/content/practices';

export interface ArticleFooterProps {
  article: Article;
}

export function ArticleFooter({ article }: ArticleFooterProps): React.ReactElement {
  const relatedPracticesList = practices.filter((p) =>
    article.relatedPractices.includes(p.slug)
  );

  return (
    <section className="py-14 sm:py-20 bg-brand-canvas border-b border-brand-border" aria-label="Especialidades jurídicas relacionadas y consulta">
      <Container size="lg">
        {/* 1. Related Practices */}
        {relatedPracticesList.length > 0 && (
          <div className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
              <SectionHeading
                eyebrow="Áreas de Práctica Vinculadas"
                title="Especialidades relacionadas con este tema"
                className="mb-0 max-w-xl"
              />
              <Link
                href="/conocimiento"
                className="text-xs font-semibold text-brand-primary hover:text-brand-accent transition-colors flex-shrink-0"
              >
                &larr; Volver al Centro de Conocimiento
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPracticesList.map((practice) => (
                <Card
                  key={practice.slug}
                  variant="interactive"
                  title={practice.title}
                  description={practice.shortDescription}
                  className="bg-brand-surface flex flex-col justify-between"
                  action={
                    <div className="pt-2">
                      <TextLink
                        href={`/practicas/${practice.slug}`}
                        variant="accent"
                        showArrow
                        className="text-xs font-semibold"
                      >
                        Ver servicios en {practice.title}
                      </TextLink>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* 2. Article Contextual Conversion Banner */}
        <div className="p-8 sm:p-10 bg-brand-primary text-white rounded-md shadow-overlay text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold block">
            Asesoría Jurídica Profesional
          </span>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight max-w-xl mx-auto">
            ¿Requiere orientación específica sobre este tema?
          </h3>

          <p className="text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
            Consulte directamente con nuestro equipo legal a través de WhatsApp o agende una sesión de orientación virtual.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <WhatsAppCTA
              context="article"
              detail={article.title}
              size="md"
              fullWidth
              label="Consultar sobre este artículo"
              className="justify-center shadow-subtle text-xs sm:text-sm"
            />
            <OnlineConsultationCTA
              size="md"
              fullWidth
              label="Agendar consulta online"
              className="justify-center text-xs sm:text-sm border-white text-white hover:bg-white/10"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
