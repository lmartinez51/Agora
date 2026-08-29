import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function MethodologySection(): React.ReactElement {
  const principles = [
    {
      number: '01',
      title: 'Rigor analítico',
      description:
        'Cada asunto se somete a un estudio pormenorizado del marco normativo, jurisprudencia aplicable y prospectiva procesal antes de formular cualquier acción o recomendación jurídica.',
    },
    {
      number: '02',
      title: 'Transparencia procesal',
      description:
        'Presentamos diagnósticos realistas sobre las posibilidades de éxito, tiempos procesales estimados y costos de honorarios, manteniendo comunicación periódica y directa.',
    },
    {
      number: '03',
      title: 'Confidencialidad absoluta',
      description:
        'La información personal, patrimonial y societaria de nuestros clientes está resguardada bajo los más estrictos estándares de ética jurídica y secreto profesional conforme a la ley mexicana.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-brand-border bg-brand-canvas" aria-label="Principios de práctica jurídica">
      <Container size="xl">
        <SectionHeading
          eyebrow="Principios de Práctica"
          title="Criterio técnico, claridad procesal y confidencialidad estricta"
          description="Nuestra labor jurídica se fundamenta en estándares éticos y metodológicos comprobados a lo largo de 25 años de ejercicio profesional."
          className="max-w-3xl mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {principles.map((item) => (
            <div key={item.number} className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-mono text-brand-accent font-bold">
                    {item.number}
                  </span>
                  <div className="h-[1px] flex-1 bg-brand-border" />
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-brand-border text-center">
          <p className="text-xs font-mono text-brand-text-muted">
            AGORA, ABOGADOS · Práctica jurídica colegiada en Ciudad Juárez, Chihuahua, México.
          </p>
        </div>
      </Container>
    </section>
  );
}
