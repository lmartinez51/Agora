'use client';

import React from 'react';
import { MessageSquare, Sparkles, X } from 'lucide-react';

export interface AIChatLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AIChatLauncher({ isOpen, onToggle }: AIChatLauncherProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls="agora-ai-chat-window"
      aria-label={isOpen ? 'Cerrar asistente virtual' : 'Abrir asistente virtual de AGORA'}
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 bg-brand-primary text-white hover:bg-neutral-800 border border-brand-accent/40 px-3.5 py-2.5 rounded-full shadow-overlay transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
    >
      <div className="relative flex items-center justify-center">
        {isOpen ? (
          <X className="w-5 h-5 text-white" aria-hidden="true" />
        ) : (
          <MessageSquare className="w-5 h-5 text-brand-accent" aria-hidden="true" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-accent rounded-full animate-pulse" aria-hidden="true" />
        )}
      </div>

      <span className="text-xs font-mono tracking-wider font-semibold uppercase hidden sm:inline text-white">
        {isOpen ? 'Cerrar' : 'Asistente IA'}
      </span>

      {!isOpen && (
        <Sparkles className="w-3.5 h-3.5 text-brand-accent hidden sm:inline" aria-hidden="true" />
      )}
    </button>
  );
}
