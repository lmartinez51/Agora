import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  error?: string;
  options: SelectOption[];
  placeholderOption?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      label,
      description,
      error,
      options,
      placeholderOption,
      className,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const descId = description && selectId ? `${selectId}-desc` : undefined;
    const errorId = error && selectId ? `${selectId}-error` : undefined;

    const describedBy = [descId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
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

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              'w-full appearance-none px-3.5 py-2.5 bg-brand-surface border rounded-sm text-sm text-brand-primary transition-colors duration-150 pr-10',
              'focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent',
              'disabled:bg-brand-muted disabled:text-brand-text-muted disabled:cursor-not-allowed',
              error ? 'border-red-600 focus:ring-red-500' : 'border-brand-border hover:border-neutral-400',
              className
            )}
            {...props}
          >
            {placeholderOption && (
              <option value="" disabled selected hidden>
                {placeholderOption}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-600 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
