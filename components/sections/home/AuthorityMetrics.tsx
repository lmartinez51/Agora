import React from 'react';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/content/site';

export function AuthorityMetrics(): React.ReactElement {
  return (
    <section className="py-10 sm:py-14 border-b border-brand-border bg-brand-surface" aria-label="Indicadores institucionales de AGORA">
      <Container size="xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-brand-border/80">
          {/* Metric 1: Años de experiencia */}
          <div className="pt-4 sm:pt-0 sm:px-4 lg:px-6 first:pt-0 first:px-0">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-brand-primary block tracking-tight">
              {siteConfig.metrics.yearsExperience}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-brand-accent font-semibold block mt-1">
              Años de experiencia
            </span>
            <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">
              Trayectoria continua en asesoría y litigio en el estado de Chihuahua.
            </p>
          </div>

          {/* Metric 2: Abogados */}
          <div className="pt-4 sm:pt-0 sm:px-4 lg:px-6">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-brand-primary block tracking-tight">
              {siteConfig.metrics.lawyersCount}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-brand-accent font-semibold block mt-1">
              Abogados en el equipo
            </span>
            <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">
              Capacidad técnica multidisciplinaria y atención personalizada.
            </p>
          </div>

          {/* Metric 3: Socios */}
          <div className="pt-4 sm:pt-0 sm:px-4 lg:px-6">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-brand-primary block tracking-tight">
              {siteConfig.metrics.partnersCount}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-brand-accent font-semibold block mt-1">
              Socios directores
            </span>
            <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">
              Supervisión directa y estratégica en cada asunto encomendado.
            </p>
          </div>

          {/* Metric 4: Sede */}
          <div className="pt-4 sm:pt-0 sm:px-4 lg:px-6">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-brand-primary block tracking-tight">
              {siteConfig.location.city}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-brand-accent font-semibold block mt-1">
              Sede de operaciones
            </span>
            <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">
              Ubicación fronteriza estratégica con cobertura jurídica nacional.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
