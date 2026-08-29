import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface TextLinkProps {
  href: string;
  isExternal?: boolean;
  variant?: 'default' | 'accent' | 'muted';
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function TextLink({
  href,
  isExternal = false,
  variant = 'default',
  showArrow = false,
  className,
  children,
  ariaLabel,
}: TextLinkProps): React.ReactElement {
  const variantStyles = {
    default: 'text-brand-primary hover:text-black border-b border-brand-primary/30 hover:border-brand-primary',
    accent: 'text-brand-accent hover:text-brand-accent-hover border-b border-brand-accent/40 hover:border-brand-accent',
    muted: 'text-brand-text-secondary hover:text-brand-primary border-b border-brand-border hover:border-brand-primary',
  };

  const combinedClasses = cn(
    'inline-flex items-center gap-1 font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-1 text-sm cursor-pointer',
    variantStyles[variant],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">
          &rarr;
        </span>
      )}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={combinedClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={combinedClasses}>
      {content}
    </Link>
  );
}
