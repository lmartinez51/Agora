import React from 'react';
import { cn } from '@/lib/utils';

export interface ImageFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1' | '21/9';
  caption?: string;
  placeholderText?: string;
  withBorder?: boolean;
}

export function ImageFrame({
  aspectRatio = '16/9',
  caption,
  placeholderText = '[MARCO ESTRUCTURAL — FOTOGRAFÍA PENDIENTE]',
  withBorder = true,
  className,
  children,
  ...props
}: ImageFrameProps): React.ReactElement {
  const aspectClasses = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '1/1': 'aspect-square',
    '21/9': 'aspect-[21/9]',
  };

  return (
    <figure className={cn('w-full group', className)} {...props}>
      <div
        className={cn(
          'w-full relative overflow-hidden rounded-sm bg-neutral-100 flex items-center justify-center text-center p-6',
          aspectClasses[aspectRatio],
          withBorder && 'border border-brand-border'
        )}
      >
        {children ? (
          children
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 select-none">
            <span className="w-10 h-10 border border-brand-accent/40 rounded-full flex items-center justify-center text-brand-accent">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-brand-text-muted">
              {placeholderText}
            </span>
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="mt-2 text-xs text-brand-text-muted font-sans italic text-left">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
