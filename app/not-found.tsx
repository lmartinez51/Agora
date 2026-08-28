import React from 'react';
import Link from 'next/link';
import { createWhatsAppLink } from '@/lib/whatsapp';

export default function NotFound(): React.ReactElement {
  const whatsappUrl = createWhatsAppLink({ context: 'general' });

  return (
    <main className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full border border-brand-border bg-brand-surface p-8 rounded-md shadow-card">
        <span className="text-xs font-mono text-brand-accent uppercase tracking-widest block mb-2">
          Error 404
        </span>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-brand-primary mb-3">
          Página no encontrada
        </h1>
        <p className="text-brand-text-secondary text-sm mb-6">
          La sección que busca no existe o ha sido reubicada. Puede regresar a la página principal o consultar a nuestro equipo directamente.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-brand-primary text-white text-xs font-medium rounded-sm hover:bg-neutral-800 transition-colors"
          >
            Ir al Inicio
          </Link>
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
    </main>
  );
}
