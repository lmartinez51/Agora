import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CalendarCheck, FileSearch, Users, ShieldCheck } from 'lucide-react';

export function BookingSteps(): React.ReactElement {
  const steps = [
    {
      number: '01',
      icon: CalendarCheck,
      title: 'Programación de la Sesión',
      description: 'Seleccione el horario disponible en nuestro calendario digital o solicite su cita directamente vía WhatsApp.',
    },
    {
      number: '02',
      icon: FileSearch,
      title: 'Revisión Preliminar de Antecedentes',
      description: 'Puede remitir con antelación contratos, citatorios o resoluciones relevantes para optimizar el tiempo de consulta.',
    },
    {
      number: '03',
      icon: Users,
      title: 'Consulta Jurídica Inicial',
      description: 'Sesión presencial en nuestra sede de Ciudad Juárez o virtual vía Google Meet con un abogado especializado.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-brand-surface border-b border-brand-border" aria-label="Proceso de atención y consulta">
      <Container size="xl">
        <SectionHeading
          eyebrow="Procedimiento"
          title="Cómo funciona nuestra consulta de orientación"
          description="Un proceso estructurado para brindarle claridad legal desde el primer contacto."
          className="mb-10 max-w-2xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-brand-canvas border border-brand-border p-6 rounded-md shadow-subtle space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-brand-accent font-bold">
                    PASO {step.number}
                  </span>
                  <div className="p-2 bg-brand-muted rounded-sm text-brand-accent">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="text-base font-serif font-bold text-brand-primary">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Guidance Box */}
        <div className="p-5 bg-brand-muted border border-brand-border rounded-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-brand-text-secondary">
          <div className="p-2 bg-brand-surface border border-brand-border rounded-sm text-brand-accent flex-shrink-0">
            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <span className="font-mono uppercase tracking-wider font-semibold text-brand-primary block">
              Garantía de Confidencialidad Procesal
            </span>
            <p className="leading-relaxed">
              Toda la información y documentación compartida antes, durante y después de la consulta se encuentra estrictamente protegida bajo el secreto profesional de la abogacía mexicana.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
