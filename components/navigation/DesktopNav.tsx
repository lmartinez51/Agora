'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { practices } from '@/content/practices';
import { ChevronDown } from 'lucide-react';

export function DesktopNav(): React.ReactElement {
  const pathname = usePathname();
  const [practicesOpen, setPracticesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPracticesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isRouteActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/personas', label: 'Personas' },
    { href: '/empresas', label: 'Empresas' },
    { href: '/extranjeros', label: 'Extranjeros', isStrategic: true },
    { href: '/la-firma', label: 'La Firma' },
    { href: '/conocimiento', label: 'Conocimiento' },
    { href: '/agenda', label: 'Agenda' },
  ];

  return (
    <nav className="hidden xl:flex items-center gap-2 2xl:gap-3 text-sm font-medium" aria-label="Navegación principal">
      {/* Inicio */}
      <Link
        href="/"
        aria-current={pathname === '/' ? 'page' : undefined}
        className={cn(
          'px-2.5 xl:px-3 py-2 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent tracking-wide',
          pathname === '/'
            ? 'text-brand-primary font-semibold border-b-2 border-brand-accent'
            : 'text-brand-text-secondary hover:text-brand-primary'
        )}
      >
        Inicio
      </Link>

      {/* Prácticas Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          aria-expanded={practicesOpen}
          aria-haspopup="true"
          onClick={() => setPracticesOpen((prev) => !prev)}
          onMouseEnter={() => setPracticesOpen(true)}
          className={cn(
            'inline-flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent cursor-pointer tracking-wide',
            pathname.startsWith('/practicas')
              ? 'text-brand-primary font-semibold border-b-2 border-brand-accent'
              : 'text-brand-text-secondary hover:text-brand-primary'
          )}
        >
          <span>Prácticas</span>
          <ChevronDown
            className={cn('w-3.5 h-3.5 transition-transform duration-150 text-brand-text-muted', practicesOpen && 'rotate-180 text-brand-accent')}
            aria-hidden="true"
          />
        </button>

        {practicesOpen && (
          <div
            onMouseLeave={() => setPracticesOpen(false)}
            className="absolute left-0 top-full mt-2 w-72 bg-brand-surface border border-brand-border rounded-sm shadow-overlay p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold border-b border-brand-border/80 mb-2">
              Áreas de Especialidad
            </div>
            <Link
              href="/practicas"
              onClick={() => setPracticesOpen(false)}
              role="menuitem"
              className={cn(
                'block px-3 py-2 rounded-sm text-xs font-semibold hover:bg-brand-muted transition-colors mb-1',
                pathname === '/practicas' ? 'text-brand-accent bg-brand-muted font-bold' : 'text-brand-primary'
              )}
            >
              Todas las Prácticas Jurídicas &rarr;
            </Link>
            <div className="my-1.5 border-t border-brand-border/60" />
            {practices.map((practice) => {
              const active = pathname === `/practicas/${practice.slug}`;
              return (
                <Link
                  key={practice.slug}
                  href={`/practicas/${practice.slug}`}
                  onClick={() => setPracticesOpen(false)}
                  role="menuitem"
                  className={cn(
                    'block px-3 py-2 rounded-sm text-xs transition-colors hover:bg-brand-muted',
                    active ? 'text-brand-accent font-semibold bg-brand-muted' : 'text-brand-text-secondary hover:text-brand-primary'
                  )}
                >
                  {practice.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Rest of Navigation Links */}
      {navLinks.slice(1).map((link) => {
        const active = isRouteActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'px-2.5 xl:px-3 py-2 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent tracking-wide whitespace-nowrap',
              active
                ? 'text-brand-primary font-semibold border-b-2 border-brand-accent'
                : 'text-brand-text-secondary hover:text-brand-primary',
              link.isStrategic && 'relative text-brand-primary font-medium'
            )}
          >
            <span>{link.label}</span>
            {link.isStrategic && (
              <span className="hidden xl:inline-block ml-1.5 px-1 py-0.2 text-[9px] font-mono tracking-wider uppercase bg-brand-accent/15 text-brand-accent rounded-sm align-middle font-semibold">
                Online
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
