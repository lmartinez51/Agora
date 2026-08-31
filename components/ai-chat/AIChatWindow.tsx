'use client';

import React, { useRef, useEffect } from 'react';
import { ChatMessage, AIChatAction } from '@/lib/ai/types';
import { aiIdentity } from '@/content/ai/identity';
import { aiStarterPrompts } from '@/content/ai/starters';
import { AIChatMessage } from './AIChatMessage';
import { AIChatInput } from './AIChatInput';
import { Badge } from '@/components/ui/Badge';
import { Bot, X, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export interface AIChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onActionClick?: (action: AIChatAction) => void;
  onReset?: () => void;
}

export function AIChatWindow({
  isOpen,
  onClose,
  messages,
  isLoading,
  onSendMessage,
  onActionClick,
  onReset,
}: AIChatWindowProps): React.ReactElement | null {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="agora-ai-chat-window"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-chat-title"
      className="fixed bottom-24 md:bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] md:w-[400px] h-[520px] max-h-[calc(100vh-7rem)] bg-brand-surface border border-brand-border rounded-md shadow-overlay flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      {/* 1. Header */}
      <header className="p-3.5 bg-brand-primary text-white border-b border-brand-primary flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-muted/20 border border-brand-accent/40 flex items-center justify-center text-brand-accent">
            <Bot className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 id="ai-chat-title" className="text-xs font-serif font-bold text-white tracking-wide">
                {aiIdentity.name}
              </h3>
              <Badge variant="accent" size="sm" className="text-[9px] px-1 py-0 uppercase">
                Beta
              </Badge>
            </div>
            <p className="text-[10px] font-mono text-neutral-300">
              AGORA, ABOGADOS · Orientación
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onReset && messages.length > 1 && (
            <button
              type="button"
              onClick={onReset}
              aria-label="Reiniciar conversación"
              title="Reiniciar conversación"
              className="p-1 text-neutral-400 hover:text-white rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana de asistente"
            className="p-1 text-neutral-400 hover:text-white rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Messages Body */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-brand-canvas"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {/* Welcome Disclaimer Box */}
        <div className="p-3 bg-brand-surface border border-brand-border rounded-sm text-[11px] text-brand-text-secondary leading-relaxed space-y-1.5 shadow-subtle">
          <div className="flex items-center gap-1.5 text-brand-accent font-semibold uppercase tracking-wider text-[10px] font-mono">
            <Sparkles className="w-3 h-3" aria-hidden="true" />
            <span>Orientación Informativa Automatizada</span>
          </div>
          <p>{aiIdentity.welcomeMessage}</p>
        </div>

        {/* Suggested Starter Chips (Visible initially or when message history is low) */}
        {messages.length <= 1 && (
          <div className="pt-2 space-y-1.5" aria-label="Consultas sugeridas">
            <span className="text-[10px] font-mono uppercase text-brand-text-muted tracking-wider block">
              Consultas Frecuentes:
            </span>
            <div className="flex flex-col gap-1.5">
              {aiStarterPrompts.map((starter) => (
                <button
                  key={starter.id}
                  type="button"
                  onClick={() => onSendMessage(starter.query)}
                  className="text-left text-xs bg-brand-surface hover:bg-brand-muted border border-brand-border hover:border-brand-accent/50 text-brand-primary p-2 rounded-sm transition-all shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                  &rarr; {starter.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Stream */}
        {messages.map((msg) => (
          <AIChatMessage key={msg.id} message={msg} onActionClick={onActionClick} />
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-brand-text-muted p-2" aria-label="El asistente está redactando una respuesta">
            <div className="w-2 h-2 bg-brand-accent rounded-full animate-ping" />
            <span className="font-mono text-[11px]">Consultando información de AGORA...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Footer Input & Disclaimer */}
      <footer className="flex-shrink-0 bg-brand-surface border-t border-brand-border">
        <AIChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
        <div className="px-3 py-1.5 bg-brand-surface text-center flex items-center justify-center gap-1 text-[10px] text-brand-text-muted border-t border-brand-border/60">
          <AlertCircle className="w-3 h-3 text-brand-accent flex-shrink-0" aria-hidden="true" />
          <span className="truncate">No sustituye la asesoría jurídica de un abogado.</span>
        </div>
      </footer>
    </div>
  );
}
