import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';
import { siteConfig } from '@/content/site';

export function HeroSection(): React.ReactElement {
  return (
    <section
      className="relative w-full bg-[#0B0D13] border-b border-white/10 overflow-hidden lg:aspect-[1920/705]"
      aria-label="Introducción institucional de AGORA"
    >
      {/* Background Visual Layer: 3D Metallic AGORA Logo Composition */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <picture className="w-full h-full block">
          {/* Responsive source: ready for dedicated mobile visual (e.g. /images/agora-hero-mobile.webp) when available */}
          {/* <source media="(max-width: 767px)" srcSet="/images/agora-hero-mobile.webp" /> */}
          <img
            src="/images/agora-hero-bg-1920x705.webp"
            alt=""
            role="presentation"
            decoding="async"
            className="w-full h-full object-cover object-[76%_center] lg:object-contain select-none pointer-events-none"
          />
        </picture>
      </div>

      {/* Hero Content Layer */}
      <Container size="xl" className="relative z-10 h-full flex flex-col justify-center">
        <div className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:py-0 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Main Editorial Value Proposition: Strictly constrained to left editorial zone to ensure generous breathing room before the 3D logo */}
            <div className="lg:col-span-6 xl:col-span-5 max-w-[480px] lg:max-w-[460px] xl:max-w-[470px] 2xl:max-w-[480px] space-y-4 lg:space-y-2 xl:space-y-3.5 2xl:space-y-6">
              {/* Eyebrow: Bronze accent descriptor + neutral location */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold">
                  {siteConfig.descriptor}
                </span>
                <span className="text-neutral-500 font-mono" aria-hidden="true">
                  |
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {siteConfig.location.city}, {siteConfig.location.state}
                </span>
              </div>

              {/* Main Heading: Warm off-white #F1EEE7 with bounded width matching mockup line breaks */}
              <h1 className="text-3xl sm:text-4xl lg:text-[27px] xl:text-[34px] 2xl:text-[44px] font-serif font-bold text-[#F1EEE7] tracking-tight leading-[1.15] lg:leading-[1.15] xl:leading-[1.15] max-w-[420px] xl:max-w-[460px] 2xl:max-w-[480px]">
                Soluciones jurídicas con perspectiva local y alcance nacional.
              </h1>

              {/* Supporting Editorial Paragraph */}
              <p className="text-sm sm:text-base lg:text-[12.5px] xl:text-[14px] 2xl:text-base text-neutral-300 leading-relaxed lg:leading-[1.45] xl:leading-relaxed max-w-[460px] xl:max-w-[470px] 2xl:max-w-[480px]">
                Firma legal con 25 años de experiencia en Ciudad Juárez, Chihuahua. Brindamos asesoría jurídica y representación procesal integral para particulares, familias y empresas, con atención remota especializada para personas y organizaciones con asuntos legales en México.
              </p>

              {/* Language & Service Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs font-mono">
                <Badge
                  variant="dark"
                  size="sm"
                  className="bg-white/[0.05] border-white/20 text-neutral-300 tracking-wider font-normal text-[11px] py-0.5 px-2"
                >
                  Atención bilingüe: Español / English
                </Badge>
                <Badge
                  variant="dark"
                  size="sm"
                  className="bg-white/[0.05] border-white/20 text-neutral-300 tracking-wider font-normal text-[11px] py-0.5 px-2"
                >
                  Consultas presenciales y virtuales
                </Badge>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                <WhatsAppCTA
                  context="general"
                  size="sm"
                  label="Consultar por WhatsApp"
                  className="justify-center shadow-subtle text-xs lg:text-[12.5px] py-2 px-3.5"
                />
                <OnlineConsultationCTA
                  size="sm"
                  label="Agendar consulta online"
                  className="justify-center text-xs lg:text-[12.5px] border-white/20 text-[#F1EEE7] bg-white/[0.06] hover:bg-white/10 hover:text-white hover:border-white/30 transition-colors py-2 px-3.5"
                />
              </div>
            </div>

            {/* Desktop Visual Framing Area (Columns 7-12 on lg, 6-12 on xl)
                Intentionally left open on desktop so the 3D metallic AGORA logo
                and illuminated scales embedded within the background WEBP remain
                cleanly visible without obstruction, matching the approved mockup. */}
            <div className="hidden lg:block lg:col-span-6 xl:col-span-7 pointer-events-none" aria-hidden="true" />
          </div>
        </div>
      </Container>
    </section>
  );
}
