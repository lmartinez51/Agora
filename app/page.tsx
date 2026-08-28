import React from 'react';
import { siteConfig } from '@/content/site';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { BookingFallback } from '@/components/booking/BookingFallback';

export default function HomePage(): React.ReactElement {
  const whatsappUrl = createWhatsAppLink({ context: 'general' });

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-container-lg mx-auto text-center">
      <div className="border border-brand-border bg-brand-surface p-8 md:p-12 rounded-md shadow-card max-w-2xl w-full">
        <span className="inline-block px-3 py-1 bg-brand-muted text-brand-accent text-xs font-mono tracking-widest uppercase mb-4 rounded-sm">
          Fase 1 — Fundación Técnica
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary mb-3">
          {siteConfig.name}
        </h1>
        <p className="text-brand-accent font-serif text-lg mb-6">
          {siteConfig.descriptor} · {siteConfig.location.city}, {siteConfig.location.state}
        </p>
        <p className="text-brand-text-secondary text-sm md:text-base leading-relaxed mb-8">
          Arquitectura de software Next.js inicializada con éxito. Sistema de tokens de diseño, TypeScript estricto, gestión de contenido tipado y utilidades de conversión verificadas.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white font-medium rounded-sm text-sm transition-colors shadow-subtle"
          >
            Consultar por WhatsApp
          </a>
          <a
            href={siteConfig.contact.phoneHref}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-brand-primary text-brand-primary hover:bg-brand-muted font-medium rounded-sm text-sm transition-colors"
          >
            Teléfono: {siteConfig.contact.phoneDisplay}
          </a>
        </div>

        <div className="border-t border-brand-border pt-6 text-xs text-brand-text-muted text-left space-y-1">
          <p><strong>Experiencia:</strong> {siteConfig.metrics.yearsExperience} años</p>
          <p><strong>Equipo:</strong> {siteConfig.metrics.lawyersCount} abogados ({siteConfig.metrics.partnersCount} socios)</p>
          <p><strong>Horario:</strong> {siteConfig.contact.hours} ({siteConfig.contact.operatingDays})</p>
        </div>
      </div>

      <div className="w-full mt-8">
        <BookingFallback />
      </div>
    </main>
  );
}
