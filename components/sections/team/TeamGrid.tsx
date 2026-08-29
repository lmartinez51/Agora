import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { teamMembers } from '@/content/team';
import { User, Shield } from 'lucide-react';

export function TeamGrid(): React.ReactElement {
  const partners = teamMembers.filter((m) => m.role === 'partner');
  const associates = teamMembers.filter((m) => m.role === 'associate');

  return (
    <section className="py-14 sm:py-20 bg-brand-surface border-b border-brand-border" aria-label="Listado de abogados y socios de AGORA">
      <Container size="xl">
        {/* 1. Partners Section */}
        <div className="mb-16">
          <SectionHeading
            eyebrow="Dirección Estratégica"
            title="Socios Directores"
            description="Responsables de la conducción estratégica, supervisión procesal y representación en litigios de alta complejidad."
            className="mb-8 max-w-2xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-brand-canvas border-2 border-brand-accent/50 p-6 sm:p-8 rounded-md shadow-card space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-16 h-16 bg-brand-muted border border-brand-border rounded-sm flex items-center justify-center text-brand-accent flex-shrink-0">
                      <User className="w-8 h-8" aria-hidden="true" />
                    </div>
                    <Badge variant="accent" size="md">
                      Socio Director
                    </Badge>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-brand-text-muted block mb-1">
                      {partner.title}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-primary">
                      {partner.name}
                    </h3>
                  </div>

                  <div className="p-3.5 bg-brand-surface border border-brand-border rounded-sm text-xs text-brand-text-muted">
                    <span className="font-mono font-semibold text-brand-text-secondary block mb-1">
                      Estado de Perfil Profesional:
                    </span>
                    <p className="leading-relaxed">
                      {partner.bio}
                    </p>
                  </div>
                </div>

                <div className="border-t border-brand-border/70 pt-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-text-muted font-semibold block mb-2">
                    Especialidades Procesales
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.practiceAreas.map((area, idx) => (
                      <Badge key={idx} variant="outline" size="sm">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Associates Section */}
        <div>
          <SectionHeading
            eyebrow="Cuerpo de Abogados"
            title={`Abogados Asociados (${associates.length})`}
            description="Abogados especializados en la sustanciación de procedimientos, redacción jurídica y atención procesal continua."
            className="mb-8 max-w-2xl"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {associates.map((assoc) => (
              <div
                key={assoc.id}
                className="bg-brand-canvas border border-brand-border p-6 rounded-md shadow-subtle space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="default" size="sm">
                      {assoc.title}
                    </Badge>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-brand-text-muted">
                      <Shield className="w-3 h-3 text-brand-accent" aria-hidden="true" />
                      <span>AGORA</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-serif font-bold text-brand-primary">
                      {assoc.name}
                    </h3>
                    <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">
                      {assoc.bio}
                    </p>
                  </div>
                </div>

                <div className="border-t border-brand-border/70 pt-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-text-muted font-semibold block mb-1.5">
                    Materia Asignada
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {assoc.practiceAreas.map((area, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono text-brand-text-secondary bg-brand-surface border border-brand-border px-2 py-0.5 rounded-sm font-medium"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
