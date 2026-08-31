import React from 'react';
import Link from 'next/link';
import { AIChatAction } from '@/lib/ai/types';
import { ChevronRight } from 'lucide-react';

export interface AIChatActionsProps {
  actions?: AIChatAction[];
  onActionClick?: (action: AIChatAction) => void;
}

export function AIChatActions({ actions, onActionClick }: AIChatActionsProps): React.ReactElement | null {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-2" role="group" aria-label="Acciones sugeridas">
      {actions.map((action, idx) => {
        const isWhatsApp = action.type === 'whatsapp';

        if (action.isExternal) {
          return (
            <a
              key={idx}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onActionClick?.(action)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                isWhatsApp
                  ? 'bg-brand-whatsapp text-white hover:bg-brand-whatsapp-hover'
                  : 'bg-brand-primary text-white hover:bg-neutral-800'
              }`}
            >
              <span>{action.label}</span>
              <ChevronRight className="w-3 h-3" aria-hidden="true" />
            </a>
          );
        }

        return (
          <Link
            key={idx}
            href={action.href}
            onClick={() => onActionClick?.(action)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-surface border border-brand-border text-brand-primary hover:bg-brand-muted rounded-sm text-xs font-medium transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            <span>{action.label}</span>
            <ChevronRight className="w-3 h-3 text-brand-accent" aria-hidden="true" />
          </Link>
        );
      })}
    </div>
  );
}
