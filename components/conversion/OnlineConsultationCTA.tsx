import React from 'react';
import { CTAButton } from '@/components/ui/CTAButton';
import { ButtonVariant, ButtonSize } from '@/components/ui/Button';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OnlineConsultationCTAProps {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  showIcon?: boolean;
  className?: string;
}

export function OnlineConsultationCTA({
  label = 'Agendar Consulta Online',
  variant = 'secondary',
  size = 'md',
  fullWidth = false,
  showIcon = true,
  className,
}: OnlineConsultationCTAProps): React.ReactElement {
  return (
    <CTAButton
      href="/agenda"
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={cn('group', className)}
      ariaLabel={label}
    >
      {showIcon && (
        <Calendar
          className={cn(
            'flex-shrink-0 transition-transform duration-150 group-hover:scale-105',
            size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
          )}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </CTAButton>
  );
}
