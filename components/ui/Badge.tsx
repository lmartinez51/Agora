import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'dark' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: BadgeProps): React.ReactElement {
  const variantStyles = {
    default: 'bg-brand-muted text-brand-text-secondary border border-brand-border',
    accent: 'bg-brand-accent/10 text-brand-accent border border-brand-accent/30',
    dark: 'bg-white/10 text-white/90 border border-white/20',
    outline: 'bg-transparent text-brand-text-secondary border border-brand-border',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-widest',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono uppercase font-medium rounded-sm select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
