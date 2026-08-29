import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: 'default' | 'interactive' | 'featured';
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  metadata?: React.ReactNode;
  action?: React.ReactNode;
  as?: React.ElementType;
}

export function Card({
  children,
  className,
  variant = 'default',
  eyebrow,
  title,
  description,
  metadata,
  action,
  as: Component = 'div',
  ...props
}: CardProps): React.ReactElement {
  const variantStyles = {
    default: 'bg-brand-surface border border-brand-border shadow-subtle',
    interactive:
      'bg-brand-surface border border-brand-border shadow-subtle hover:border-brand-accent/60 hover:shadow-card transition-all duration-200 cursor-pointer group',
    featured:
      'bg-brand-surface border-2 border-brand-accent/40 shadow-card relative overflow-hidden',
  };

  return (
    <Component
      className={cn(
        'rounded-md p-6 sm:p-8 flex flex-col',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {eyebrow && (
        <div className="mb-3">
          {typeof eyebrow === 'string' ? (
            <span className="text-xs font-mono uppercase tracking-widest text-brand-accent">
              {eyebrow}
            </span>
          ) : (
            eyebrow
          )}
        </div>
      )}

      {title && (
        <div className="mb-3">
          {typeof title === 'string' ? (
            <h3 className="text-xl font-serif font-bold text-brand-primary group-hover:text-black transition-colors">
              {title}
            </h3>
          ) : (
            title
          )}
        </div>
      )}

      {description && (
        <div className="text-brand-text-secondary text-sm leading-relaxed mb-4 flex-1">
          {description}
        </div>
      )}

      {children}

      {(metadata || action) && (
        <div className="mt-auto pt-4 border-t border-brand-border/60 flex items-center justify-between gap-3 text-xs text-brand-text-muted">
          {metadata && <div>{metadata}</div>}
          {action && <div className="ml-auto">{action}</div>}
        </div>
      )}
    </Component>
  );
}
