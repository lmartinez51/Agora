import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { AudienceTrack } from '@/types';
import { CheckCircle2 } from 'lucide-react';

export interface AudienceHighlightsProps {
  audience: AudienceTrack;
  imageCaption: string;
  imagePlaceholder: string;
  detailedText: string;
}

export function AudienceHighlights({
  audience,
  imageCaption,
  imagePlaceholder,
  detailedText,
}: AudienceHighlightsProps): React.ReactElement {
  return (
    <section className="py-14 sm:py-20 bg-brand-surface border-b border-brand-border" aria-label={`Enfoque de atención para ${audience.title}`}>
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Highlights List (Columns 1-7) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <SectionHeading
                eyebrow="Ejes de Atención"
                title={`Acompañamiento especializado para ${audience.title.toLowerCase()}`}
                className="mb-4"
              />
              <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
                {detailedText}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold mb-4">
                Capacidades y Servicios Clave
              </h3>
              <ul className="space-y-3" role="list">
                {audience.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-brand-canvas border border-brand-border/80 rounded-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-xs sm:text-sm text-brand-primary font-medium leading-relaxed">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Editorial Frame (Columns 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-canvas p-3 border border-brand-border rounded-md shadow-card">
              <ImageFrame
                aspectRatio="4/3"
                aria-label={`Perspectiva editorial de atención legal para ${audience.title}`}
                caption={imageCaption}
                placeholderText={imagePlaceholder}
                className="w-full"
              />
            </div>

            {/* Confidentiality / Scope Notice */}
            <div className="p-4 bg-brand-muted border border-brand-border rounded-sm text-xs text-brand-text-muted space-y-2">
              <span className="font-mono font-semibold text-brand-text-secondary uppercase tracking-wider block">
                Compromiso de Confidencialidad
              </span>
              <p className="leading-relaxed">
                Las consultas y actuaciones jurídicas se gestionan bajo estricto secreto profesional y apego a la normatividad procesal aplicable en México.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
