import React from 'react';
import { cn } from '@/lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  withAccent?: boolean;
  surface?: 'light' | 'dark';
}

export function Divider({
  orientation = 'horizontal',
  withAccent = false,
  surface = 'light',
  className,
  ...props
}: DividerProps): React.ReactElement {
  const surfaceColor =
    surface === 'dark' ? 'border-brand-border-dark' : 'border-brand-border';

  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'inline-block h-full min-h-[1em] w-[1px] self-stretch border-r',
          surfaceColor,
          className
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={cn('relative my-6 w-full', className)}>
      <hr
        className={cn('w-full border-0 border-t', surfaceColor)}
        {...props}
      />
      {withAccent && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-brand-accent"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
