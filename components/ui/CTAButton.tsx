import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ButtonVariant, ButtonSize } from './Button';

export interface CTAButtonProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isExternal?: boolean;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function CTAButton({
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isExternal = false,
  className,
  children,
  ariaLabel,
}: CTAButtonProps): React.ReactElement {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 select-none cursor-pointer text-center';

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-brand-primary text-white border border-brand-primary hover:bg-neutral-800 active:bg-black',
    whatsapp:
      'bg-brand-whatsapp text-white border border-brand-whatsapp hover:bg-brand-whatsapp-hover active:bg-[#18A04D]',
    secondary:
      'bg-transparent text-brand-primary border border-brand-border hover:bg-brand-muted active:bg-neutral-200',
    ghost:
      'bg-transparent text-brand-primary border border-transparent hover:bg-brand-muted active:bg-neutral-200',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const combinedClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className
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
        {children}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={combinedClasses}>
      {children}
    </Link>
  );
}
