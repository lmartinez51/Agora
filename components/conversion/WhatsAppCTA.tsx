import React from 'react';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppContext } from '@/types';
import { ButtonSize } from '@/components/ui/Button';
import { CTAButton } from '@/components/ui/CTAButton';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface WhatsAppCTAProps {
  context?: WhatsAppContext;
  detail?: string;
  label?: string;
  size?: ButtonSize;
  variant?: 'whatsapp' | 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  showIcon?: boolean;
  className?: string;
}

export function WhatsAppCTA({
  context = 'general',
  detail,
  label = 'Consultar por WhatsApp',
  size = 'md',
  variant = 'whatsapp',
  fullWidth = false,
  showIcon = true,
  className,
}: WhatsAppCTAProps): React.ReactElement {
  const href = createWhatsAppLink({ context, detail });

  return (
    <CTAButton
      href={href}
      isExternal
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={cn('group', className)}
      ariaLabel={`${label} (${context})`}
    >
      {showIcon && (
        <MessageSquare
          className={cn(
            'flex-shrink-0 transition-transform duration-150 group-hover:scale-110',
            size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
          )}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </CTAButton>
  );
}
