import React from 'react';
import { Container } from '@/components/ui/Container';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';
import { PhoneCTA } from '@/components/conversion/PhoneCTA';
import { AudienceTrack } from '@/types';
import { siteConfig } from '@/content/site';

export interface AudienceCTAProps {
  audience: AudienceTrack;
  headingText?: string;
  subText?: string;
  ctaLabel?: string;
}

export function AudienceCTA({
  audience,
  headingText = 'Inicie su consulta legal con el equipo de AGORA',
  subText = 'Analizaremos su caso de forma directa y confidencial para orientarle sobre la vía legal y procesal correspondiente.',
  ctaLabel = 'Consultar por WhatsApp',
}: AudienceCTAProps): React.ReactElement {
  return (
    <section className="py-14 sm:py-20 bg-brand-primary text-white border-b border-brand-primary" aria-label={`Consulta legal para ${audience.title}`}>
      <Container size="lg">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold block">
            Atención Inmediata
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
            {headingText}
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            {subText}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 max-w-md mx-auto">
            <WhatsAppCTA
              context={audience.ctaContext}
              size="lg"
              fullWidth
              label={ctaLabel}
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
              <span className="font-mono text-neutral-300">Atención telefónica directa:</span>
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
