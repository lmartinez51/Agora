import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { TextLink } from '@/components/ui/TextLink';
import { practices } from '@/content/practices';

export function PracticeAreasSection(): React.ReactElement {
  return (
    <section className="py-16 sm:py-24 border-b border-brand-border bg-brand-canvas" aria-label="Áreas de práctica jurídica">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Áreas de Práctica"
            title="Especialidades jurídicas con rigor analítico y solvencia procesal"
            description="Representación técnica y consultoría legal estratégica en materias fundamentales del derecho mexicano."
            className="mb-0 max-w-2xl"
          />
          <div className="flex-shrink-0">
            <Link
              href="/practicas"
              className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors group"
            >
              <span>Ver catálogo completo de prácticas</span>
              <span className="ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Practice Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {practices.map((practice, index) => (
            <Card
              key={practice.slug}
              variant="interactive"
              eyebrow={`Materia 0${index + 1}`}
              title={practice.title}
              description={practice.shortDescription}
              className="flex flex-col justify-between h-full bg-brand-surface"
              action={
                <div className="pt-2">
                  <TextLink
                    href={`/practicas/${practice.slug}`}
                    variant="accent"
                    showArrow
                    className="text-xs font-semibold"
                  >
                    Detalle y servicios de {practice.title}
                  </TextLink>
                </div>
              }
            />
          ))}

          {/* Strategic 6th block: Orientation & Consultation Direct Action */}
          <div className="border border-brand-accent/40 bg-brand-surface p-6 sm:p-8 rounded-md flex flex-col justify-between shadow-subtle">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold block mb-2">
                Consulta Inicial
              </span>
              <h3 className="text-xl font-serif font-bold text-brand-primary mb-3">
                ¿Su asunto involucra múltiples materias jurídicas?
              </h3>
              <p className="text-sm text-brand-text-secondary leading-relaxed mb-6">
                Evaluamos la viabilidad procesal y estructuramos una estrategia jurídica integral adaptada a sus objetivos patrimoniales o corporativos.
              </p>
            </div>
            <div>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-4 py-2.5 bg-brand-primary hover:bg-neutral-800 text-white text-xs font-medium rounded-sm transition-colors w-full sm:w-auto"
              >
                Solicitar valoración inicial &rarr;
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
