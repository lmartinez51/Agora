import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ChevronRight } from 'lucide-react';

export function ContactHero(): React.ReactElement {
  return (
    <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 bg-brand-canvas border-b border-brand-border" aria-label="Introducción a los canales de contacto">
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
              Contacto
            </li>
          </ol>
        </nav>

        {/* Hero Content */}
        <div className="max-w-3xl space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold">
              Canales Oficiales
            </span>
            <span className="text-brand-border" aria-hidden="true">|</span>
            <Badge variant="outline" size="sm">
              Atención Directa
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-primary tracking-tight leading-tight">
            Comuníquese con AGORA, ABOGADOS
          </h1>

          <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed">
            Estamos a su disposición para atender sus consultas legales en Ciudad Juárez o de manera remota. Escríbanos a través de nuestro formulario o comuníquese por WhatsApp o vía telefónica.
          </p>
        </div>
      </Container>
    </section>
  );
}
