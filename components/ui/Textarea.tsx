import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, description, error, className, disabled, required, rows = 4, ...props }, ref) => {
    const inputId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const descId = description && inputId ? `${inputId}-desc` : undefined;
    const errorId = error && inputId ? `${inputId}-error` : undefined;

    const describedBy = [descId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-mono uppercase tracking-wider text-brand-primary font-medium"
          >
            {label} {required && <span className="text-red-600">*</span>}
          </label>
        )}

        {description && (
          <p id={descId} className="text-xs text-brand-text-muted">
            {description}
          </p>
        )}

        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            'w-full px-3.5 py-2.5 bg-brand-surface border rounded-sm text-sm text-brand-primary placeholder:text-brand-text-muted transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent resize-y',
            'disabled:bg-brand-muted disabled:text-brand-text-muted disabled:cursor-not-allowed',
            error ? 'border-red-600 focus:ring-red-500' : 'border-brand-border hover:border-neutral-400',
            className
          )}
          {...props}
        />

        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-600 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
