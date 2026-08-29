import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { TextLink } from '@/components/ui/TextLink';
import { Article } from '@/types';
import { BookOpen, Calendar, Clock } from 'lucide-react';

export interface KnowledgeGridProps {
  articles: Article[];
}

export function KnowledgeGrid({ articles }: KnowledgeGridProps): React.ReactElement {
  return (
    <section className="py-14 sm:py-20 bg-brand-surface border-b border-brand-border" aria-label="Listado de artículos y guías jurídicas">
      <Container size="xl">
        <SectionHeading
          eyebrow="Artículos Recientes"
          title="Guías procesales y criterios del derecho mexicano"
          description="Consulte nuestros análisis sobre materias civil, mercantil, constitucional e internacional."
          className="max-w-3xl mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="bg-brand-canvas border border-brand-border p-6 sm:p-8 rounded-md flex flex-col justify-between shadow-subtle hover:border-brand-accent/60 transition-colors"
            >
              <div className="space-y-4">
                {/* Meta Bar */}
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="accent" size="sm">
                    {article.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-brand-text-muted">
                    <Clock className="w-3 h-3 text-brand-accent" aria-hidden="true" />
                    <span>{article.readingTimeMinutes} min de lectura</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-serif font-bold text-brand-primary leading-snug">
                  <Link
                    href={`/conocimiento/${article.slug}`}
                    className="hover:text-brand-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
                  >
                    {article.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Date & Author */}
                <div className="flex items-center gap-4 text-[11px] font-mono text-brand-text-muted border-t border-brand-border/70 pt-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-brand-accent" aria-hidden="true" />
                    <time dateTime={article.publishedAt}>
                      {article.publishedAt}
                    </time>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-brand-accent" aria-hidden="true" />
                    <span>{article.author}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-5 border-t border-brand-border/70 mt-6">
                <TextLink
                  href={`/conocimiento/${article.slug}`}
                  variant="accent"
                  showArrow
                  className="text-xs font-semibold"
                >
                  Leer análisis completo
                </TextLink>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
