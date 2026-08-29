import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { PracticeArea } from '@/types';
import { CheckCircle2 } from 'lucide-react';

export interface PracticeServicesProps {
  practice: PracticeArea;
}

export function PracticeServices({ practice }: PracticeServicesProps): React.ReactElement {
  return (
    <section className="py-14 sm:py-20 bg-brand-surface border-b border-brand-border" aria-label={`Servicios y alcance de ${practice.title}`}>
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Description and Services List (Columns 1-7) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <SectionHeading
                eyebrow="Alcance y Enfoque Procesal"
                title={`Certeza jurídica en ${practice.title.toLowerCase()}`}
                className="mb-4"
              />
              <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
                {practice.fullDescription}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold mb-4">
                Servicios y Actuaciones Incluidas
              </h3>
              <ul className="space-y-3" role="list">
                {practice.services.map((service, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3.5 bg-brand-canvas border border-brand-border/80 rounded-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-xs sm:text-sm text-brand-primary font-medium leading-relaxed">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contextual Editorial Frame & Legal Notice (Columns 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-canvas p-3 border border-brand-border rounded-md shadow-card">
              <ImageFrame
                aspectRatio="4/3"
                aria-label={`Perspectiva jurídica y procesal en ${practice.title}`}
                caption={`Práctica en ${practice.title} con sede en Ciudad Juárez y atención remota.`}
                placeholderText={`[Fotografía editorial contextual de ${practice.title} — Pendiente de asignación de archivo definitivo]`}
                className="w-full"
              />
            </div>

            {/* Legal Notice Box */}
            <div className="p-4 bg-brand-muted border border-brand-border rounded-sm text-xs text-brand-text-muted space-y-2">
              <span className="font-mono font-semibold text-brand-text-secondary uppercase tracking-wider block">
                Criterio Ético Institucional
              </span>
              <p className="leading-relaxed">
                Toda actuación jurídica se conduce bajo estricto secreto profesional, transparencia en honorarios y rigor analítico en la fundamentación legal.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
