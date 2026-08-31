'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

export interface AIChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function AIChatInput({ onSendMessage, isLoading, disabled = false }: AIChatInputProps): React.ReactElement {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && !disabled) {
      inputRef.current?.focus();
    }
  }, [isLoading, disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = text.trim();
    if (!clean || isLoading || disabled) return;

    onSendMessage(clean);
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-brand-surface border-t border-brand-border flex items-center gap-2"
      aria-label="Formulario de mensaje para el asistente"
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        maxLength={500}
        disabled={isLoading || disabled}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escriba su consulta (ej. ¿En qué materias atienden?)..."
        aria-label="Escriba su consulta jurídica"
        className="flex-1 bg-brand-canvas border border-brand-border rounded-sm px-3.5 py-2 text-xs text-brand-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={!text.trim() || isLoading || disabled}
        aria-label="Enviar mensaje al asistente"
        className="inline-flex items-center justify-center w-9 h-9 bg-brand-primary text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent flex-shrink-0"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-brand-accent" aria-hidden="true" />
        ) : (
          <Send className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
    </form>
  );
}
