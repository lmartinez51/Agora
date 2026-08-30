import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';
import { PhoneCTA } from '@/components/conversion/PhoneCTA';
import { siteConfig } from '@/content/site';

export function FinalConversion(): React.ReactElement {
  return (
    <section className="py-16 sm:py-24 bg-brand-canvas border-b border-brand-border" aria-label="Contacto e inicio de consulta jurídica">
      <Container size="lg">
        <div className="bg-brand-surface border border-brand-border p-8 sm:p-12 md:p-16 rounded-md shadow-card text-center space-y-8 max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Inicio de Asesoría"
            title="Inicie su consulta jurídica con nuestro equipo profesional"
            description="Exponga su situación legal de manera directa y confidencial. Analizaremos su caso para orientarle sobre los pasos procesales y la estrategia aplicable."
            align="center"
            className="mb-6"
          />

          {/* Primary & Secondary Conversion Triggers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <WhatsAppCTA
              context="general"
              size="lg"
              fullWidth
              label="Consultar por WhatsApp"
              className="justify-center shadow-subtle text-sm"
            />
            <OnlineConsultationCTA
              size="lg"
              fullWidth
              label="Agendar consulta online"
              className="justify-center text-sm"
            />
          </div>

          {/* Tertiary Contact Option & Verified Schedule */}
          <div className="pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-text-muted">
            <div className="flex items-center gap-2">
              <span className="font-mono text-brand-text-secondary font-semibold">Atención Telefónica Directa:</span>
              <PhoneCTA variant="inline" className="font-mono text-xs" />
            </div>
            <div className="font-mono">
              <span>{siteConfig.location.city}, {siteConfig.location.state}, {siteConfig.location.country}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
