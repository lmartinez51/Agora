import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { Scale, ShieldCheck, Landmark } from 'lucide-react';

export function FirmPhilosophy(): React.ReactElement {
  const pillars = [
    {
      icon: Scale,
      title: 'Rigor Analítico y Fundamentación Procesal',
      description: 'Cada asunto se estudia a profundidad bajo la legislación mexicana vigente y precedentes jurisprudenciales obligatorios. No improvisamos estrategias ni comprometemos resultados sin viabilidad técnica comprobable.',
    },
    {
      icon: ShieldCheck,
      title: 'Confidencialidad y Ética Profesional',
      description: 'Garantizamos estricto secreto profesional y total transparencia en la gestión de expedientes y fijación de honorarios, protegiendo en todo momento la integridad y los intereses de nuestros representados.',
    },
    {
      icon: Landmark,
      title: 'Perspectiva Fronteriza y Cobertura Nacional',
      description: 'Nuestra ubicación en Ciudad Juárez nos otorga un dominio directo de las dinámicas comerciales y transfronterizas México–Estados Unidos, con capacidad procesal ante juzgados y tribunales de todo el territorio nacional.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-brand-surface border-b border-brand-border" aria-label="Filosofía y principios de práctica jurídica">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Pillars (Columns 1-7) */}
          <div className="lg:col-span-7 space-y-8">
            <SectionHeading
              eyebrow="Principios Rectores"
              title="Filosofía de práctica jurídica y compromiso ético"
              description="Nuestra actuación profesional se fundamenta en principios sólidos que rigen cada dictamen, negociación o litigio judicial."
              className="mb-6"
            />

            <div className="space-y-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-brand-canvas border border-brand-border rounded-sm space-y-2"
                  >
                    <div className="flex items-center gap-2.5 text-brand-accent">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                      <h3 className="text-sm font-serif font-bold text-brand-primary">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed pl-6.5">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Editorial Image Frame (Columns 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-canvas p-3 border border-brand-border rounded-md shadow-card">
              <ImageFrame
                aspectRatio="4/3"
                aria-label="Arquitectura y entorno institucional de AGORA en Ciudad Juárez"
                caption="Sede institucional en Ciudad Juárez, Chihuahua · Práctica procesal en México."
                placeholderText="[Fotografía editorial institucional — Entorno arquitectónico de la firma en Ciudad Juárez]"
                className="w-full"
              />
            </div>

            <div className="p-4 bg-brand-muted border border-brand-border rounded-sm text-xs text-brand-text-muted space-y-1.5">
              <span className="font-mono font-semibold text-brand-text-secondary uppercase tracking-wider block">
                Jurisdicción Mexicana
              </span>
              <p className="leading-relaxed">
                Actuamos con plena competencia técnica ante tribunales del fuero común y del Poder Judicial de la Federación en las materias civil, mercantil, familiar, penal y constitucional.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
