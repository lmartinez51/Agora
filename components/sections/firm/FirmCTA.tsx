import React from 'react';
import { Container } from '@/components/ui/Container';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';
import { PhoneCTA } from '@/components/conversion/PhoneCTA';
import { siteConfig } from '@/content/site';

export function FirmCTA(): React.ReactElement {
  return (
    <section className="py-14 sm:py-20 bg-brand-primary text-white border-b border-brand-primary" aria-label="Contacto institucional con la firma">
      <Container size="lg">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold block">
            Contacto Directo
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Consulte su asunto legal con los abogados de AGORA
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Atendemos controversias y asuntos jurídicos en Ciudad Juárez y en todo México con absoluta confidencialidad y rigor procesal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 max-w-md mx-auto">
            <WhatsAppCTA
              context="general"
              size="lg"
              fullWidth
              label="Contactar por WhatsApp"
              className="justify-center shadow-subtle text-sm"
            />
            <OnlineConsultationCTA
              size="lg"
              fullWidth
              label="Agendar consulta online"
              className="justify-center text-sm border-white text-white hover:bg-white/10"
            />
          </div>

          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="font-mono text-neutral-300">Teléfono:</span>
              <PhoneCTA variant="inline" className="text-white hover:text-brand-accent font-mono" />
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
