import React from 'react';
import Link from 'next/link';
import { AIChatAction } from '@/lib/ai/types';

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
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent after:content-[''] after:inline-block after:w-1.5 after:h-1.5 after:border-t-[1.5px] after:border-r-[1.5px] after:border-white after:rotate-45 after:ml-0.5 after:select-none after:pointer-events-none ${
                isWhatsApp
                  ? 'bg-brand-whatsapp text-white hover:bg-brand-whatsapp-hover'
                  : 'bg-brand-primary text-white hover:bg-neutral-800'
              }`}
            >
              <span>{action.label}</span>
            </a>
          );
        }

        return (
          <Link
            key={idx}
            href={action.href}
            onClick={() => onActionClick?.(action)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-surface border border-brand-border text-brand-primary hover:bg-brand-muted rounded-sm text-xs font-medium transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent after:content-[''] after:inline-block after:w-1.5 after:h-1.5 after:border-t-[1.5px] after:border-r-[1.5px] after:border-brand-accent after:rotate-45 after:ml-0.5 after:select-none after:pointer-events-none"
          >
            <span>{action.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

