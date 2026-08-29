import React from 'react';
import { Container } from '@/components/ui/Container';
import { ShieldCheck } from 'lucide-react';

export function TeamNotice(): React.ReactElement {
  return (
    <section className="py-12 bg-brand-canvas border-b border-brand-border" aria-label="Aviso de formalización de perfiles profesionales">
      <Container size="md">
        <div className="p-6 bg-brand-surface border border-brand-border rounded-md shadow-subtle flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-3 bg-brand-muted border border-brand-border rounded-sm text-brand-accent flex-shrink-0">
            <ShieldCheck className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1 text-xs text-brand-text-secondary leading-relaxed">
            <h4 className="font-mono uppercase tracking-wider font-semibold text-brand-primary">
              Criterio de Transparencia y Rigor Institucional
            </h4>
            <p>
              Los perfiles y cédulas profesionales individuales se incorporarán formalmente conforme a los datos validados por el cliente. Las consultas jurídicas y la representación procesal se encuentran plenamente activas y respaldadas por los 25 años de experiencia de la firma en Ciudad Juárez.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
