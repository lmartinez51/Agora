import React from 'react';
import { BookingFallback } from './BookingFallback';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { siteConfig } from '@/content/site';
import { Calendar, ExternalLink } from 'lucide-react';

interface BookingEmbedProps {
  bookingUrl?: string;
}

/**
 * Validates that a booking URL uses https and is syntactically valid.
 * Rejects unsafe protocols (javascript:, data:, http:, etc.) and malformed strings.
 */
export function getSafeBookingUrl(rawUrl?: string): string | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  if (!trimmed.startsWith('https://')) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

export function BookingEmbed({ bookingUrl }: BookingEmbedProps): React.ReactElement {
  const resolvedUrl = bookingUrl || process.env.NEXT_PUBLIC_BOOKING_URL;
  const safeUrl = getSafeBookingUrl(resolvedUrl);

  if (!safeUrl) {
    return <BookingFallback />;
  }

  const whatsappUrl = createWhatsAppLink({ context: 'booking-fallback' });

  return (
    <div
      className="border border-brand-border bg-brand-surface p-8 sm:p-12 text-center rounded-md shadow-subtle max-w-container-md mx-auto my-8"
      data-testid="booking-card"
    >
      <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full bg-brand-muted text-brand-accent border border-brand-border">
        <Calendar className="w-7 h-7" aria-hidden="true" />
      </div>

      <div className="inline-block px-3 py-1 mb-4 rounded-sm bg-brand-muted text-brand-text-secondary text-xs font-mono tracking-wider uppercase">
        Google Calendar · Citas en Línea
      </div>

      <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-primary mb-3">
        Calendario de Citas en Línea
      </h3>

      <p className="text-brand-text-secondary text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
        Seleccione una fecha y horario disponible. La reservación se realizará mediante Google Calendar y recibirá confirmación inmediata por correo electrónico.
      </p>

      {/* Primary External CTA */}
      <div className="mb-8">
        <a
          href={safeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium rounded-sm text-sm sm:text-base transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          data-testid="booking-primary-cta"
        >
          <span>Abrir calendario y seleccionar horario</span>
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>

      {/* Secondary / Assistance Options */}
      <div className="pt-6 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
        <span className="text-brand-text-muted">¿Prefiere asistencia directa?</span>
        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-accent hover:underline font-medium inline-flex items-center gap-1"
          >
            Solicitar por WhatsApp
          </a>
          <span className="text-brand-border" aria-hidden="true">·</span>
          <a
            href={siteConfig.contact.phoneHref}
            className="text-brand-primary hover:underline font-mono"
          >
            Llamar al {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
