'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChatMessage, AIChatAction } from '@/lib/ai/types';
import { AIChatLauncher } from './AIChatLauncher';
import { AIChatWindow } from './AIChatWindow';

export function AIChat(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pilotTokenRef = useRef<string | null>(null);

  // Pre-establish or refresh pilot session token in background
  const ensureSession = useCallback(async (): Promise<string | null> => {
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'GET',
        credentials: 'same-origin',
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.token) {
          pilotTokenRef.current = data.token;
          return data.token;
        }
      }
    } catch {
      // Ignore background session fetch errors
    }
    return pilotTokenRef.current;
  }, []);

  // Pre-warm session on component mount
  useEffect(() => {
    ensureSession();
  }, [ensureSession]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const nextState = !prev;
      if (nextState && !pilotTokenRef.current) {
        ensureSession();
      }
      return nextState;
    });
  }, [ensureSession]);

  const handleSendMessage = useCallback(
    async (content: string) => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content,
        createdAt: Date.now(),
      };

      const updatedHistory = [...messages, userMessage];
      setMessages(updatedHistory);
      setIsLoading(true);

      const sendRequest = async (token?: string | null) => {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        if (token) {
          headers['x-agora-pilot-token'] = token;
        }
        return fetch('/api/ai-chat', {
          method: 'POST',
          headers,
          credentials: 'same-origin',
          body: JSON.stringify({ messages: updatedHistory }),
        });
      };

      try {
        let response = await sendRequest(pilotTokenRef.current);

        // If session expired or missing (401), attempt transparent refresh once
        if (response.status === 401) {
          const freshToken = await ensureSession();
          if (freshToken) {
            response = await sendRequest(freshToken);
          }
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (data.message) {
          setMessages((prev) => [...prev, data.message]);
        }
      } catch {
        const errorMessage: ChatMessage = {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content:
            'En este momento no fue posible procesar su consulta. Puede comunicarse directamente con nosotros por WhatsApp o vía telefónica.',
          createdAt: Date.now(),
          isError: true,
          actions: [
            {
              type: 'whatsapp',
              label: 'Contactar por WhatsApp',
              href: 'https://wa.me/526563502916?text=Hola%2C%20deseo%20solicitar%20asesor%C3%ADa%20legal%20con%20AGORA%2C%20ABOGADOS.',
              isExternal: true,
            },
          ],
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, ensureSession]
  );

  const handleActionClick = (action: AIChatAction) => {
    // If it's an internal link, we can close the chat window to let user navigate
    if (!action.isExternal) {
      setIsOpen(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
  };

  return (
    <aside aria-label="Asistente virtual de orientación legal">
      {/* Floating launcher trigger */}
      <AIChatLauncher isOpen={isOpen} onToggle={handleToggle} />

      {/* Floating interactive window */}
      <AIChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
        onActionClick={handleActionClick}
        onReset={handleReset}
      />
    </aside>
  );
}
