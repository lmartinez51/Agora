import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Article } from '@/types';
import { ChevronRight, Calendar, Clock, BookOpen } from 'lucide-react';

export interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps): React.ReactElement {
  return (
    <section className="pt-8 pb-10 sm:pt-12 sm:pb-14 bg-brand-canvas border-b border-brand-border" aria-label="Cabecera del artículo">
      <Container size="lg">
        {/* Breadcrumb */}
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
            <li>
              <Link href="/conocimiento" className="hover:text-brand-primary transition-colors">
                Conocimiento
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-brand-accent" />
            </li>
            <li className="text-brand-primary font-semibold truncate max-w-xs sm:max-w-md" aria-current="page">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* Article Meta & Title */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="accent" size="sm">
              {article.category}
            </Badge>
            <span className="text-brand-border" aria-hidden="true">|</span>
            <div className="flex items-center gap-3 text-xs font-mono text-brand-text-muted">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-accent" aria-hidden="true" />
                <time dateTime={article.publishedAt}>{article.publishedAt}</time>
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-accent" aria-hidden="true" />
                <span>{article.readingTimeMinutes} min de lectura</span>
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-primary tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-sans">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-2 pt-2 text-xs font-mono text-brand-text-muted">
            <BookOpen className="w-4 h-4 text-brand-accent" aria-hidden="true" />
            <span>Autor institucional: <strong className="text-brand-primary font-semibold">{article.author}</strong></span>
          </div>
        </div>
      </Container>
    </section>
  );
}
