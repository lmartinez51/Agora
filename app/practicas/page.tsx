import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { TextLink } from '@/components/ui/TextLink';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';
import { PhoneCTA } from '@/components/conversion/PhoneCTA';
import { practices } from '@/content/practices';
import { siteConfig } from '@/content/site';
import { Check, ChevronRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Áreas de Práctica Jurídica y Litigio Especializado',
  description:
    'Especialidades legales de AGORA en Ciudad Juárez, Chihuahua: Derecho Civil, Derecho Mercantil, Derecho Familiar, Derecho Penal y Juicio de Amparo.',
  path: '/practicas',
});

export default function PracticesIndexPage(): React.ReactElement {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Page Hero & Breadcrumbs */}
      <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 bg-brand-canvas border-b border-brand-border" aria-label="Introducción al catálogo de prácticas">
        <Container size="xl">
          {/* Breadcrumbs */}
          <nav aria-label="Ruta de navegación" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs font-mono text-brand-text-muted" role="list">
              <li>
                <Link href="/" className="hover:text-brand-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5 text-brand-accent" />
              </li>
              <li className="text-brand-primary font-semibold" aria-current="page">
                Áreas de Práctica
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold block">
              Catálogo de Especialidades Jurídicas
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-primary tracking-tight leading-tight">
              Áreas de Práctica y Especialidad Jurídica
            </h1>
            <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed">
              25 años de experiencia procesal en Ciudad Juárez, Chihuahua. Ofrecemos consultoría estratégica y representación legal rigurosa en cinco materias fundamentales del derecho mexicano, protegiendo los intereses de particulares, familias y empresas.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Practice Areas Grid */}
      <section className="py-16 sm:py-24 bg-brand-surface border-b border-brand-border" aria-label="Listado de áreas de práctica">
        <Container size="xl">
          <SectionHeading
            eyebrow="Materias Confirmadas"
            title="Cinco disciplinas jurídicas fundamentales"
            description="Atención profesional estructurada conforme a la legislación civil, mercantil, penal y constitucional de México."
            className="max-w-3xl mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practices.map((practice, index) => (
              <div
                key={practice.slug}
                className="bg-brand-canvas border border-brand-border p-6 sm:p-8 rounded-md flex flex-col justify-between shadow-subtle hover:border-brand-accent/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-brand-accent font-bold">
                      0{index + 1}
                    </span>
                    <Badge variant="outline" size="sm">
                      Litigio & Asesoría
                    </Badge>
                  </div>

                  <h2 className="text-2xl font-serif font-bold text-brand-primary mb-3">
                    <Link
                      href={`/practicas/${practice.slug}`}
                      className="hover:text-brand-accent transition-colors"
                    >
                      {practice.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-brand-text-secondary leading-relaxed mb-6">
                    {practice.shortDescription}
                  </p>

                  {/* Top services preview */}
                  <div className="border-t border-brand-border/70 pt-4 mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-brand-text-muted font-semibold block mb-2">
                      Servicios Clave
                    </span>
                    <ul className="space-y-2 text-xs text-brand-text-secondary" role="list">
                      {practice.services.slice(0, 3).map((service, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-border/70">
                  <TextLink
                    href={`/practicas/${practice.slug}`}
                    variant="accent"
                    showArrow
                    className="text-xs font-semibold"
                  >
                    Conocer servicios y alcance de {practice.title}
                  </TextLink>
                </div>
              </div>
            ))}

            {/* General Legal Assessment Block */}
            <div className="border-2 border-brand-accent/40 bg-brand-surface p-6 sm:p-8 rounded-md flex flex-col justify-between shadow-card">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold block mb-2">
                  Orientación Integral
                </span>
                <h2 className="text-2xl font-serif font-bold text-brand-primary mb-3">
                  ¿No está seguro de qué materia legal corresponde a su caso?
                </h2>
                <p className="text-sm text-brand-text-secondary leading-relaxed mb-6">
                  Muchos asuntos patrimoniales o empresariales involucran aspectos civiles, mercantiles y constitucionales de forma simultánea. Analizamos su situación para determinar la estrategia procesal adecuada.
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border space-y-3">
                <WhatsAppCTA
                  context="general"
                  fullWidth
                  size="md"
                  label="Consultar sobre mi caso"
                  className="justify-center shadow-subtle text-xs font-semibold"
                />
                <div className="text-center">
                  <TextLink href="/agenda" variant="muted" className="text-xs">
                    Agendar cita de orientación online
                  </TextLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Conversion Section */}
      <section className="py-14 sm:py-20 bg-brand-primary text-white border-b border-brand-primary" aria-label="Contacto para asesoría">
        <Container size="lg">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold block">
              Atención Profesional
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Inicie su consulta legal con el equipo de AGORA
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              Brindamos atención personalizada en Ciudad Juárez y sesiones virtuales seguras para clientes en todo México y el extranjero.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 max-w-md mx-auto">
              <WhatsAppCTA
                context="general"
                size="lg"
                fullWidth
                label="Consultar por WhatsApp"
                className="justify-center shadow-subtle text-sm"
              />
              <OnlineConsultationCTA
                size="lg"
                fullWidth
                label="Agendar consulta online"
                className="justify-center text-sm border-white text-white hover:bg-white/10"
              />
            </div>
            <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="font-mono text-neutral-300">Teléfono directo:</span>
                <PhoneCTA variant="inline" className="text-white hover:text-brand-accent font-mono" />
              </div>
              <div className="font-mono">
                <span>{siteConfig.location.city}, {siteConfig.location.state}, {siteConfig.location.country}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
