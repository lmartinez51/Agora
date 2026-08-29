'use client';

import React from 'react';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';

export function MobileStickyBar(): React.ReactElement {
  return (
    <aside
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-surface/98 backdrop-blur-xs border-t border-brand-border px-4 py-2.5 shadow-overlay transition-transform duration-200"
      aria-label="Acciones rápidas de contacto y agenda móvil"
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        <div className="flex-1">
          <WhatsAppCTA
            context="general"
            size="sm"
            fullWidth
            label="WhatsApp"
            className="py-2.5 shadow-subtle text-xs"
          />
        </div>
        <div className="flex-1">
          <OnlineConsultationCTA
            size="sm"
            fullWidth
            label="Agendar"
            className="py-2.5 text-xs border-brand-primary text-brand-primary hover:bg-brand-muted"
          />
        </div>
      </div>
    </aside>
  );
}
