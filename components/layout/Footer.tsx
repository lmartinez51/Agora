import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/content/site';
import { practices } from '@/content/practices';

export function Footer(): React.ReactElement {
  return (
    <footer className="bg-brand-primary text-white border-t border-brand-primary" aria-label="Pie de página institucional">
      <Container size="xl">
        {/* Main Footer Columns */}
        <div className="py-16 sm:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Column 1 — Firm Identity */}
          <div className="space-y-4">
            <div>
              <span className="text-2xl font-serif font-bold text-white block tracking-tight">
                {siteConfig.name}
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold block mt-1.5">
                {siteConfig.descriptor}
              </span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-sm">
              Consultoría jurídica y representación procesal con sede en Ciudad Juárez, Chihuahua. 25 años de experiencia en litigio civil, mercantil, familiar, penal y juicio de amparo.
            </p>
            <div className="text-xs font-mono text-neutral-400 space-y-1.5 pt-2">
              <p>· {siteConfig.location.city}, {siteConfig.location.state}, {siteConfig.location.country}</p>
              <p>· {siteConfig.metrics.yearsExperience} años de práctica profesional</p>
            </div>
          </div>

          {/* Column 2 — Practice Areas */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold">
              Áreas de Práctica
            </h3>
            <ul className="space-y-2.5 text-sm" role="list">
              <li>
                <Link
                  href="/practicas"
                  className="text-white hover:text-brand-accent font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
                >
                  Todas las Prácticas &rarr;
                </Link>
              </li>
              {practices.map((practice) => (
                <li key={practice.slug}>
                  <Link
                    href={`/practicas/${practice.slug}`}
                    className="text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
                  >
                    {practice.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Audiences & Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold">
              Atención y Servicios
            </h3>
            <ul className="space-y-2.5 text-sm" role="list">
              <li>
                <Link
                  href="/personas"
                  className="text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
                >
                  Particulares y Familias
                </Link>
              </li>
              <li>
                <Link
                  href="/empresas"
                  className="text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
                >
                  Empresas y Comercio
                </Link>
              </li>
              <li>
                <Link
                  href="/extranjeros"
                  className="text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm flex items-center gap-1.5"
                >
                  <span>Consultoría para Extranjeros</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-brand-accent/20 text-brand-accent rounded-sm font-semibold">
                    Online
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/la-firma"
                  className="text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
                >
                  La Firma Institucional
                </Link>
              </li>
              <li>
                <Link
                  href="/equipo"
                  className="text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
                >
                  Equipo Jurídico
                </Link>
              </li>
              <li>
                <Link
                  href="/conocimiento"
                  className="text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
                >
                  Centro de Conocimiento
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Verified Contact & Schedule */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold">
              Contacto y Horarios
            </h3>
            <div className="text-sm text-neutral-300 space-y-3.5">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">Teléfono Directo:</span>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="text-white hover:text-brand-accent font-mono text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-0.5">Horario de Atención:</span>
                <span className="text-white font-mono text-xs">{siteConfig.contact.hours}</span>
              </div>
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-0.5">Sede:</span>
                <span className="text-white text-xs">{siteConfig.location.city}, {siteConfig.location.state}</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/agenda"
                  className="inline-flex items-center justify-center px-4 py-2.5 border border-white/30 hover:border-brand-accent text-white hover:text-brand-accent text-xs font-medium rounded-sm transition-colors"
                >
                  Agendar Consulta Online &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/aviso-de-privacidad"
              className="hover:text-white underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
            >
              Aviso de Privacidad
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
