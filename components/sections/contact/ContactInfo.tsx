import React from 'react';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { PhoneCTA } from '@/components/conversion/PhoneCTA';
import { siteConfig } from '@/content/site';
import { Phone, Clock, MapPin, Shield } from 'lucide-react';

export function ContactInfo(): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-primary mb-2">
          Atención Telefónica y Mensajería
        </h2>
        <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
          Para solicitar una orientación inmediata o agendar una llamada con uno de nuestros abogados:
        </p>
      </div>

      <div className="space-y-4">
        {/* Phone */}
        <div className="p-5 bg-brand-canvas border border-brand-border rounded-md flex items-start gap-4 shadow-subtle">
          <div className="p-2.5 bg-brand-muted border border-brand-border rounded-sm text-brand-accent flex-shrink-0">
            <Phone className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-text-muted font-semibold block">
              Teléfono Directo
            </span>
            <PhoneCTA variant="inline" className="text-base sm:text-lg font-mono font-bold text-brand-primary hover:text-brand-accent block" />
            <span className="text-xs text-brand-text-muted">Llamadas locales y nacionales</span>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="p-5 bg-brand-canvas border border-brand-border rounded-md space-y-3 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-text-muted font-semibold">
              Mensajería Oficial
            </span>
            <span className="text-[10px] font-mono uppercase bg-brand-whatsapp/15 text-brand-whatsapp font-bold px-2 py-0.5 rounded-sm">
              WhatsApp Activo
            </span>
          </div>
          <p className="text-xs text-brand-text-secondary">
            Envíe una descripción preliminar de su asunto para asignarlo con el abogado correspondiente.
          </p>
          <WhatsAppCTA
            context="general"
            fullWidth
            size="md"
            label="Escribir por WhatsApp"
            className="justify-center shadow-subtle text-xs font-semibold"
          />
        </div>

        {/* Hours & Location */}
        <div className="p-5 bg-brand-canvas border border-brand-border rounded-md space-y-3 text-xs text-brand-text-secondary shadow-subtle">
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-mono uppercase tracking-wider font-semibold text-brand-primary block">
                Horario de Servicio
              </span>
              <span>{siteConfig.contact.hours} (Hora local de Ciudad Juárez)</span>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2 border-t border-brand-border/70">
            <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-mono uppercase tracking-wider font-semibold text-brand-primary block">
                Sede Institucional
              </span>
              <span>{siteConfig.location.city}, {siteConfig.location.state}, {siteConfig.location.country}</span>
            </div>
          </div>
        </div>

        {/* Institutional Notice */}
        <div className="p-4 bg-brand-muted border border-brand-border rounded-sm flex items-start gap-3 text-xs text-brand-text-muted">
          <Shield className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            Las citas presenciales en oficina se gestionan con confirmación previa para garantizar la disponibilidad del abogado responsable.
          </p>
        </div>
      </div>
    </div>
  );
}
