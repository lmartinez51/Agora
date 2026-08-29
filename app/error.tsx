'use client';

import React, { useEffect } from 'react';
import { createWhatsAppLink } from '@/lib/whatsapp';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactElement {
  useEffect(() => {
    // Log error internally in development; never expose sensitive data in UI
    // eslint-disable-next-line no-console
    console.error('AGORA App Error Boundary caught:', error);
  }, [error]);

  const whatsappUrl = createWhatsAppLink({ context: 'general' });

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full border border-brand-border bg-brand-surface p-8 rounded-md shadow-card">
        <span className="text-xs font-mono text-red-600 uppercase tracking-widest block mb-2">
          Estado Inesperado
        </span>
        <h1 className="text-2xl font-serif font-bold text-brand-primary mb-3">
          Ha ocurrido un problema técnico
        </h1>
        <p className="text-brand-text-secondary text-sm mb-6">
          No ha sido posible procesar la solicitud en este momento. Puede reintentar la acción o comunicarse directamente con nuestra consultoría jurídica.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-brand-primary text-white text-xs font-medium rounded-sm hover:bg-neutral-800 transition-colors"
          >
            Reintentar
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-brand-whatsapp text-white text-xs font-medium rounded-sm hover:bg-brand-whatsapp-hover transition-colors"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
