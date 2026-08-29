import React from 'react';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/content/site';

export function FirmMetricsOverview(): React.ReactElement {
  const metrics = [
    {
      value: `${siteConfig.metrics.yearsExperience}`,
      label: 'Años de Experiencia',
      detail: 'Trayectoria ininterrumpida en litigio y consultoría jurídica.',
    },
    {
      value: `${siteConfig.metrics.lawyersCount}`,
      label: 'Abogados en Equipo',
      detail: 'Estructura multidisciplinaria en cinco ramas del derecho.',
    },
    {
      value: `${siteConfig.metrics.partnersCount}`,
      label: 'Socios Directores',
      detail: 'Liderazgo procesal y supervisión técnica directa de casos.',
    },
    {
      value: '100%',
      label: 'Ley Mexicana',
      detail: 'Cobertura ante tribunales locales y federales en todo el país.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-brand-primary text-white border-b border-brand-primary" aria-label="Métricas institucionales verificadas">
      <Container size="xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((metric, idx) => (
            <div key={idx} className="space-y-1.5 border-l-2 border-brand-accent/60 pl-4 sm:pl-5">
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight block">
                {metric.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-brand-accent block">
                {metric.label}
              </span>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
