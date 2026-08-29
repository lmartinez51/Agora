import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';
import { siteConfig } from '@/content/site';

export function HeroSection(): React.ReactElement {
  return (
    <section className="pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 border-b border-brand-border bg-brand-canvas" aria-label="Introducción institucional de AGORA">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Editorial Value Proposition (Columns 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold">
                {siteConfig.descriptor}
              </span>
              <span className="text-brand-border" aria-hidden="true">|</span>
              <span className="text-xs font-mono text-brand-text-muted">
                {siteConfig.location.city}, {siteConfig.location.state}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-primary tracking-tight leading-[1.15]">
              Soluciones jurídicas con perspectiva local y alcance nacional.
            </h1>

            <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed max-w-2xl">
              Firma legal con 25 años de experiencia en Ciudad Juárez, Chihuahua. Brindamos asesoría jurídica y representación procesal integral para particulares, familias y empresas, con atención remota especializada para personas y organizaciones con asuntos legales en México.
            </p>

            {/* Language and Capability Tag */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-brand-text-muted font-mono">
              <Badge variant="outline" size="sm">Atención bilingüe: Español / English</Badge>
              <Badge variant="outline" size="sm">Consultas presenciales y virtuales</Badge>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <WhatsAppCTA
                context="general"
                size="lg"
                label="Consultar por WhatsApp"
                className="justify-center shadow-subtle text-sm"
              />
              <OnlineConsultationCTA
                size="lg"
                label="Agendar consulta online"
                className="justify-center text-sm"
              />
            </div>
          </div>

          {/* Architectural / Editorial Context Frame (Columns 8-12) */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-brand-surface p-2 sm:p-3 border border-brand-border rounded-md shadow-card">
              <ImageFrame
                aspectRatio="4/3"
                aria-label="Perspectiva arquitectónica y urbana de Ciudad Juárez, Chihuahua — Sede de AGORA Consultoría Jurídica"
                caption="Ciudad Juárez, Chihuahua · 25 años de práctica jurídica y representación procesal."
                placeholderText="[Fotografía editorial contextual de Ciudad Juárez — Pendiente de asignación de archivo definitivo]"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
