import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';
import { siteConfig } from '@/content/site';
import { ChevronRight } from 'lucide-react';

export function FirmHero(): React.ReactElement {
  return (
    <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 bg-brand-canvas border-b border-brand-border" aria-label="Introducción institucional a La Firma">
      <Container size="xl">
        {/* Breadcrumb */}
        <nav aria-label="Ruta de navegación" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-brand-text-muted" role="list">
            <li>
              <Link href="/" className="hover:text-brand-primary transition-colors">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="text-brand-primary font-semibold" aria-current="page">
              La Firma
            </li>
          </ol>
        </nav>

        {/* Hero Content */}
        <div className="max-w-3xl space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold">
              Identidad Institucional
            </span>
            <span className="text-brand-border" aria-hidden="true">|</span>
            <Badge variant="outline" size="sm">
              Fundada en Ciudad Juárez
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-primary tracking-tight leading-tight">
            {siteConfig.metrics.yearsExperience} Años de Experiencia Procesal y Solidez Jurídica
          </h1>

          <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed">
            AGORA, ABOGADOS es una firma legal establecida en Ciudad Juárez, Chihuahua. Durante dos décadas y media hemos brindado consultoría estratégica y representación procesal ante tribunales locales y federales en todo México, protegiendo los intereses patrimoniales, corporativos y personales de nuestros representados.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
            <WhatsAppCTA
              context="general"
              size="md"
              label="Contactar a la firma por WhatsApp"
              className="justify-center shadow-subtle text-xs sm:text-sm"
            />
            <OnlineConsultationCTA
              size="md"
              label="Agendar consulta de orientación"
              className="justify-center text-xs sm:text-sm"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
