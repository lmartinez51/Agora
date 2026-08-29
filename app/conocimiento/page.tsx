import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { articles } from '@/content/articles';
import { KnowledgeHero } from '@/components/sections/knowledge/KnowledgeHero';
import { KnowledgeGrid } from '@/components/sections/knowledge/KnowledgeGrid';
import { Container } from '@/components/ui/Container';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';

export const metadata: Metadata = constructMetadata({
  title: 'Centro de Conocimiento y Guías Jurídicas',
  description:
    'Análisis jurídicos, guías procesales y criterios legales elaborados por los abogados de AGORA en Ciudad Juárez, Chihuahua.',
  path: '/conocimiento',
});

export default function ConocimientoPage(): React.ReactElement {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero & Breadcrumbs */}
      <KnowledgeHero />

      {/* 2. Articles Grid */}
      <KnowledgeGrid articles={articles} />

      {/* 3. Knowledge Conversion CTA */}
      <section className="py-14 sm:py-20 bg-brand-primary text-white border-b border-brand-primary" aria-label="Contacto desde el centro de conocimiento">
        <Container size="lg">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold block">
              Orientación Directa
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              ¿Tiene dudas sobre cómo aplica la ley a su situación?
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              Cada situación jurídica posee particularidades que requieren un análisis técnico específico. Contáctenos para una revisión confidencial.
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
          </div>
        </Container>
      </section>
    </div>
  );
}
