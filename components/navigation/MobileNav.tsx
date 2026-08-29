'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { practices } from '@/content/practices';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { Menu, X, ChevronRight } from 'lucide-react';

export function MobileNav(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle ESC key and body scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const isRouteActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="xl:hidden">
      {/* Hamburger Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        aria-label={isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        className="p-2 -mr-2 text-brand-primary hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm transition-colors cursor-pointer"
      >
        {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
      </button>

      {/* Backdrop & Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        >
          <div
            ref={drawerRef}
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menú principal móvil"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-h-[88vh] bg-brand-surface border-t border-brand-border rounded-t-md p-6 sm:p-8 overflow-y-auto flex flex-col shadow-overlay animate-in slide-in-from-bottom duration-250"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-brand-border pb-5 mb-6">
              <div>
                <span className="font-serif font-bold text-xl text-brand-primary block tracking-tight">
                  AGORA, ABOGADOS
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold block mt-1">
                  Consultoría Jurídica
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar menú"
                className="p-2 text-brand-text-muted hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Navigation Groups */}
            <nav className="space-y-6 flex-1 text-left" aria-label="Navegación móvil">
              {/* Grupo Principal */}
              <div className="space-y-2">
                <Link
                  href="/"
                  className={cn(
                    'block py-2 text-base font-serif font-bold transition-colors',
                    pathname === '/' ? 'text-brand-accent' : 'text-brand-primary'
                  )}
                >
                  Inicio
                </Link>

                <div className="pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-brand-text-muted block mb-1.5 font-semibold">
                    Áreas de Práctica
                  </span>
                  <div className="pl-3 border-l border-brand-border space-y-1.5">
                    <Link
                      href="/practicas"
                      className={cn(
                        'block py-1 text-sm font-semibold transition-colors',
                        pathname === '/practicas' ? 'text-brand-accent' : 'text-brand-primary'
                      )}
                    >
                      Todas las prácticas &rarr;
                    </Link>
                    {practices.map((practice) => (
                      <Link
                        key={practice.slug}
                        href={`/practicas/${practice.slug}`}
                        className={cn(
                          'block py-1 text-xs transition-colors',
                          pathname === `/practicas/${practice.slug}`
                            ? 'text-brand-accent font-semibold'
                            : 'text-brand-text-secondary hover:text-brand-primary'
                        )}
                      >
                        {practice.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-brand-border/60 pt-4 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-brand-text-muted block mb-1.5 font-semibold">
                  Atención por Perfil
                </span>
                <Link
                  href="/personas"
                  className={cn(
                    'flex items-center justify-between py-1.5 text-sm font-medium transition-colors',
                    isRouteActive('/personas') ? 'text-brand-accent font-semibold' : 'text-brand-primary'
                  )}
                >
                  <span>Particulares y Familias</span>
                  <ChevronRight className="w-4 h-4 text-brand-text-muted" aria-hidden="true" />
                </Link>
                <Link
                  href="/empresas"
                  className={cn(
                    'flex items-center justify-between py-1.5 text-sm font-medium transition-colors',
                    isRouteActive('/empresas') ? 'text-brand-accent font-semibold' : 'text-brand-primary'
                  )}
                >
                  <span>Empresas y Comercio</span>
                  <ChevronRight className="w-4 h-4 text-brand-text-muted" aria-hidden="true" />
                </Link>
                <Link
                  href="/extranjeros"
                  className={cn(
                    'flex items-center justify-between py-1.5 text-sm font-medium transition-colors',
                    isRouteActive('/extranjeros') ? 'text-brand-accent font-semibold' : 'text-brand-primary'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span>Consultoría para Extranjeros</span>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-brand-accent/20 text-brand-accent rounded-sm">
                      Online
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-brand-text-muted" aria-hidden="true" />
                </Link>
              </div>

              <div className="border-t border-brand-border/60 pt-4 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-brand-text-muted block mb-1.5 font-semibold">
                  Institucional & Conocimiento
                </span>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Link
                    href="/la-firma"
                    className={cn(
                      'py-1 transition-colors',
                      isRouteActive('/la-firma') ? 'text-brand-accent font-semibold' : 'text-brand-text-secondary hover:text-brand-primary'
                    )}
                  >
                    La Firma
                  </Link>
                  <Link
                    href="/equipo"
                    className={cn(
                      'py-1 transition-colors',
                      isRouteActive('/equipo') ? 'text-brand-accent font-semibold' : 'text-brand-text-secondary hover:text-brand-primary'
                    )}
                  >
                    Equipo Jurídico
                  </Link>
                  <Link
                    href="/conocimiento"
                    className={cn(
                      'py-1 transition-colors',
                      isRouteActive('/conocimiento') ? 'text-brand-accent font-semibold' : 'text-brand-text-secondary hover:text-brand-primary'
                    )}
                  >
                    Conocimiento
                  </Link>
                  <Link
                    href="/agenda"
                    className={cn(
                      'py-1 transition-colors',
                      isRouteActive('/agenda') ? 'text-brand-accent font-semibold' : 'text-brand-text-secondary hover:text-brand-primary'
                    )}
                  >
                    Agendar Cita
                  </Link>
                  <Link
                    href="/contacto"
                    className={cn(
                      'py-1 transition-colors',
                      isRouteActive('/contacto') ? 'text-brand-accent font-semibold' : 'text-brand-text-secondary hover:text-brand-primary'
                    )}
                  >
                    Contacto
                  </Link>
                </div>
              </div>
            </nav>

            {/* Primary Action Button in Drawer */}
            <div className="mt-8 pt-4 border-t border-brand-border space-y-3">
              <WhatsAppCTA context="general" fullWidth size="lg" label="Consultar por WhatsApp" />
              <p className="text-[11px] text-center text-brand-text-muted">
                Horario de atención: 8:00 AM – 6:00 PM · Ciudad Juárez, México
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
