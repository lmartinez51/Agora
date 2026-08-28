import React from 'react';
import { createWhatsAppLink } from '@/lib/whatsapp';

export function AIAssistantBoundary(): React.ReactElement {
  const whatsappUrl = createWhatsAppLink({ context: 'general' });

  return (
    <div className="border border-brand-border bg-brand-surface p-6 rounded-md shadow-subtle max-w-container-md mx-auto my-6 text-center">
      <span className="inline-block text-xs font-mono uppercase tracking-widest text-brand-accent mb-2">
        Módulo en Desarrollo
      </span>
      <h4 className="text-lg font-serif font-bold text-brand-primary mb-2">
        Asistente de Orientación Jurídica (Próximamente)
      </h4>
      <p className="text-brand-text-secondary text-sm max-w-md mx-auto mb-4">
        Este módulo ofrecerá orientación preliminar para identificar su necesidad legal y canalizarle con el especialista adecuado. Actualmente, la atención se realiza de forma directa y personalizada.
      </p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-4 py-2 bg-brand-primary text-white text-xs font-medium rounded-sm hover:bg-neutral-800 transition-colors"
      >
        Contactar a un Abogado por WhatsApp
      </a>
    </div>
  );
}
