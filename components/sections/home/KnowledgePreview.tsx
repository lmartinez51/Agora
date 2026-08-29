import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TextLink } from '@/components/ui/TextLink';
import { articles } from '@/content/articles';

export function KnowledgePreview(): React.ReactElement {
  return (
    <section className="py-16 sm:py-24 border-b border-brand-border bg-brand-surface" aria-label="Centro de conocimiento jurídico">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Centro de Conocimiento"
            title="Análisis y criterios jurídicos prácticos"
            description="Información legal orientativa elaborada por nuestro equipo para comprender procedimientos, derechos y figuras legales en México."
            className="mb-0 max-w-2xl"
          />
          <div className="flex-shrink-0">
            <Link
              href="/conocimiento"
              className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors group"
            >
              <span>Ver todas las publicaciones</span>
              <span className="ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card
              key={article.slug}
              variant="interactive"
              eyebrow={
                <div className="flex items-center justify-between gap-2 mb-1">
                  <Badge variant="outline" size="sm">
                    {article.category}
                  </Badge>
                  <span className="text-[11px] font-mono text-brand-text-muted">
                    {article.readingTimeMinutes} min lectura
                  </span>
                </div>
              }
              title={article.title}
              description={article.excerpt}
              className="flex flex-col justify-between h-full bg-brand-surface border border-brand-border"
              action={
                <div className="pt-3">
                  <TextLink
                    href={`/conocimiento/${article.slug}`}
                    variant="accent"
                    showArrow
                    className="text-xs font-semibold"
                  >
                    Leer análisis completo
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
