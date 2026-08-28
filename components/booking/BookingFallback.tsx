import React from 'react';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { siteConfig } from '@/content/site';

export function BookingFallback(): React.ReactElement {
  const whatsappUrl = createWhatsAppLink({ context: 'booking-fallback' });

  return (
    <div className="border border-brand-border bg-brand-surface p-8 text-center rounded-md shadow-subtle max-w-container-md mx-auto my-8">
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-brand-muted text-brand-accent">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-serif font-bold text-brand-primary mb-2">
        Agenda Digital en Preparación
      </h3>
      <p className="text-brand-text-secondary text-sm max-w-lg mx-auto mb-6">
        Estamos configurando nuestro calendario automatizado de citas para ofrecerle la mejor experiencia. Puede solicitar y programar su consulta inicial de orientación legal directamente con nuestro equipo a través de WhatsApp o vía telefónica.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white font-medium rounded-sm text-sm transition-colors"
        >
          Solicitar Consulta por WhatsApp
        </a>
        <a
          href={siteConfig.contact.phoneHref}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-brand-border text-brand-primary hover:bg-brand-muted font-medium rounded-sm text-sm transition-colors"
        >
          Llamar al {siteConfig.contact.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
