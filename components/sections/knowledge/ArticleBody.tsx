import React from 'react';
import { Container } from '@/components/ui/Container';
import { Article } from '@/types';
import { ShieldAlert } from 'lucide-react';

export interface ArticleBodyProps {
  article: Article;
}

export function ArticleBody({ article }: ArticleBodyProps): React.ReactElement {
  // Simple markdown-style line renderer for structured articles
  const paragraphs = article.content
    .split('\n\n')
    .map((block) => block.trim())
    .filter((block) => block.length > 0 && !block.startsWith('# '));

  return (
    <article className="py-12 sm:py-16 bg-brand-surface border-b border-brand-border" aria-label="Cuerpo del artículo">
      <Container size="lg">
        <div className="max-w-3xl space-y-6 text-brand-primary leading-relaxed">
          {paragraphs.map((block, idx) => {
            if (block.startsWith('## ')) {
              return (
                <h2
                  key={idx}
                  className="text-xl sm:text-2xl font-serif font-bold text-brand-primary pt-4 tracking-tight"
                >
                  {block.replace('## ', '')}
                </h2>
              );
            }

            if (block.startsWith('### ')) {
              return (
                <h3
                  key={idx}
                  className="text-lg font-serif font-bold text-brand-primary pt-3"
                >
                  {block.replace('### ', '')}
                </h3>
              );
            }

            if (block.startsWith('- ')) {
              const items = block.split('\n').map((line) => line.replace(/^- \*\*(.*?)\*\*:?/, '$1:').replace(/^- /, ''));
              return (
                <ul key={idx} className="space-y-2 pl-4 list-disc text-sm sm:text-base text-brand-text-secondary" role="list">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              );
            }

            if (block.startsWith('1. ') || block.startsWith('2. ') || block.startsWith('3. ')) {
              const items = block.split('\n').map((line) => line.replace(/^\d+\.\s*/, ''));
              return (
                <ol key={idx} className="space-y-2 pl-4 list-decimal text-sm sm:text-base text-brand-text-secondary" role="list">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ol>
              );
            }

            if (block.startsWith('*') && block.endsWith('*')) {
              return (
                <div
                  key={idx}
                  className="p-4 bg-brand-muted border-l-2 border-brand-accent rounded-r-sm text-xs text-brand-text-muted my-6 italic"
                >
                  {block.replace(/^\*/, '').replace(/\*$/, '')}
                </div>
              );
            }

            return (
              <p key={idx} className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
                {block}
              </p>
            );
          })}

          {/* Institutional Disclaimer */}
          <div className="mt-10 p-5 bg-brand-canvas border border-brand-border rounded-md shadow-subtle flex items-start gap-3 text-xs text-brand-text-muted">
            <ShieldAlert className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <span className="font-mono uppercase tracking-wider font-semibold text-brand-text-secondary block">
                Aviso Legal Informativo
              </span>
              <p className="leading-relaxed">
                El contenido de esta publicación es de carácter estrictamente orientativo y docente. No constituye dictamen ni asesoría jurídica formal ni establece relación abogado-cliente. Para una valoración individualizada de su caso, consulte directamente a nuestro equipo legal.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
