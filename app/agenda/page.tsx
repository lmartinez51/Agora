import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { BookingHero } from '@/components/sections/booking/BookingHero';
import { BookingSteps } from '@/components/sections/booking/BookingSteps';
import { BookingEmbed } from '@/components/booking/BookingEmbed';
import { Container } from '@/components/ui/Container';
import { PhoneCTA } from '@/components/conversion/PhoneCTA';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = constructMetadata({
  title: 'Agendar Consulta Legal Online o Presencial en Ciudad Juárez',
  description:
    'Programe una consulta inicial de orientación jurídica con los abogados de AGORA en Ciudad Juárez o mediante sesión virtual por Google Meet.',
  path: '/agenda',
});

export default function AgendaPage(): React.ReactElement {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Booking Hero */}
      <BookingHero />

      {/* 2. Three-step Consultation Workflow */}
      <BookingSteps />

      {/* 3. Interactive Booking Interface / Fallback */}
      <section className="py-12 sm:py-16 bg-brand-canvas border-b border-brand-border" aria-label="Calendario de citas">
        <Container size="xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold block mb-2">
              Disponibilidad de Horarios
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-primary">
              Seleccione la modalidad y horario de su preferencia
            </h2>
          </div>

          <BookingEmbed />
        </Container>
      </section>

      {/* 4. Contact Details Footer Notice */}
      <section className="py-10 bg-brand-primary text-white border-b border-brand-primary" aria-label="Información de asistencia">
        <Container size="lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-neutral-300">
            <div>
              <span className="font-semibold text-white block sm:inline mr-2">¿Requiere asistencia inmediata para agendar?</span>
              <span>Llámenos directamente al</span>{' '}
              <PhoneCTA variant="inline" className="text-brand-accent hover:text-white font-mono font-medium" />
            </div>
            <div className="font-mono text-neutral-400">
              <span>{siteConfig.location.city}, {siteConfig.location.state}, {siteConfig.location.country}</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
