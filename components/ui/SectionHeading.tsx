import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  surface?: 'light' | 'dark';
  as?: 'h2' | 'h3' | 'h1';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  surface = 'light',
  as: HeadingTag = 'h2',
  className,
  ...props
}: SectionHeadingProps): React.ReactElement {
  const isDark = surface === 'dark';

  return (
    <div
      className={cn(
        'max-w-3xl mb-8 md:mb-12',
        align === 'center' ? 'text-center mx-auto' : 'text-left',
        className
      )}
      {...props}
    >
      {eyebrow && (
        <div className="mb-3">
          <span
            className={cn(
              'inline-block text-xs font-mono uppercase tracking-widest font-semibold',
              isDark ? 'text-brand-accent' : 'text-brand-accent'
            )}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <HeadingTag
        className={cn(
          'text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight mb-4',
          isDark ? 'text-white' : 'text-brand-primary'
        )}
      >
        {title}
      </HeadingTag>

      {description && (
        <p
          className={cn(
            'text-sm sm:text-base md:text-lg leading-relaxed',
            isDark ? 'text-neutral-300' : 'text-brand-text-secondary',
            align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
