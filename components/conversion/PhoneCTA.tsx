import React from 'react';
import { siteConfig } from '@/content/site';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PhoneCTAProps {
  label?: string;
  variant?: 'button' | 'inline';
  showIcon?: boolean;
  className?: string;
}

export function PhoneCTA({
  label,
  variant = 'button',
  showIcon = true,
  className,
}: PhoneCTAProps): React.ReactElement {
  const displayPhone = label || siteConfig.contact.phoneDisplay;

  if (variant === 'inline') {
    return (
      <a
        href={siteConfig.contact.phoneHref}
        className={cn(
          'inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-brand-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm',
          className
        )}
        aria-label={`Llamar al teléfono de la firma: ${displayPhone}`}
      >
        {showIcon && <Phone className="w-3.5 h-3.5 text-brand-accent" aria-hidden="true" />}
        <span>{displayPhone}</span>
      </a>
    );
  }

  return (
    <a
      href={siteConfig.contact.phoneHref}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-transparent text-brand-primary border border-brand-border hover:bg-brand-muted font-medium text-sm rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2',
        className
      )}
      aria-label={`Llamar al teléfono de la firma: ${displayPhone}`}
    >
      {showIcon && <Phone className="w-4 h-4 text-brand-accent" aria-hidden="true" />}
      <span>{displayPhone}</span>
    </a>
  );
}
