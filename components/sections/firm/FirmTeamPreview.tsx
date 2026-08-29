import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { teamMembers } from '@/content/team';
import { User } from 'lucide-react';

export function FirmTeamPreview(): React.ReactElement {
  const partners = teamMembers.filter((m) => m.role === 'partner');
  const associates = teamMembers.filter((m) => m.role === 'associate');

  return (
    <section className="py-14 sm:py-20 bg-brand-canvas border-b border-brand-border" aria-label="Estructura del equipo de abogados">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <SectionHeading
            eyebrow="Estructura Profesional"
            title="Equipo Jurídico y Socios Directores"
            description="Firma integrada por 2 socios directores y 5 abogados asociados especializados en cinco materias del derecho."
            className="mb-0 max-w-2xl"
          />
          <div className="flex-shrink-0">
            <Link
              href="/equipo"
              className="inline-flex items-center text-xs sm:text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors"
            >
              <span>Ver estructura completa del equipo</span>
              <span className="ml-1.5" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Partners Preview (2 columns) */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold mb-4">
            Socios Directores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-brand-surface border-2 border-brand-accent/40 p-6 rounded-md shadow-card space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-12 h-12 bg-brand-muted border border-brand-border rounded-sm flex items-center justify-center text-brand-accent flex-shrink-0">
                    <User className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <Badge variant="accent" size="sm">
                    Socio Director
                  </Badge>
                </div>

                <div>
                  <span className="text-xs font-mono text-brand-text-muted block mb-1">
                    {partner.title}
                  </span>
                  <h4 className="text-lg font-serif font-bold text-brand-primary">
                    {partner.name}
                  </h4>
                </div>

                <div className="border-t border-brand-border/70 pt-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-text-muted font-semibold block mb-1.5">
                    Áreas de Práctica
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

        {/* Associates Preview (Grid) */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold mb-4">
            Abogados Asociados ({associates.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {associates.map((assoc) => (
              <div
                key={assoc.id}
                className="bg-brand-surface border border-brand-border p-4 rounded-sm space-y-2 shadow-subtle"
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="default" size="sm">
                    {assoc.title}
                  </Badge>
                  <span className="text-[10px] font-mono text-brand-text-muted">
                    AGORA
                  </span>
                </div>
                <h4 className="text-sm font-serif font-bold text-brand-primary">
                  {assoc.name}
                </h4>
                <div className="flex flex-wrap gap-1 pt-1">
                  {assoc.practiceAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-brand-text-secondary bg-brand-muted px-1.5 py-0.5 rounded-sm"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
