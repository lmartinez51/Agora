'use client';

import React, { useState, useCallback } from 'react';
import { ChatMessage, AIChatAction } from '@/lib/ai/types';
import { AIChatLauncher } from './AIChatLauncher';
import { AIChatWindow } from './AIChatWindow';

export function AIChat(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

      try {
        const response = await fetch('/api/ai-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: updatedHistory }),
        });

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
    [messages]
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
      <AIChatLauncher isOpen={isOpen} onToggle={() => setIsOpen((prev) => !prev)} />

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
