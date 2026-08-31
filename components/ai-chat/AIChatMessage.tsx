import React from 'react';
import { ChatMessage, AIChatAction } from '@/lib/ai/types';
import { AIChatActions } from './AIChatActions';
import { Bot, User } from 'lucide-react';

export interface AIChatMessageProps {
  message: ChatMessage;
  onActionClick?: (action: AIChatAction) => void;
}

export function AIChatMessage({ message, onActionClick }: AIChatMessageProps): React.ReactElement {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex items-start gap-2.5 my-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      role="article"
      aria-label={isUser ? 'Mensaje del usuario' : 'Respuesta del asistente virtual'}
    >
      {/* Avatar Icon */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
          isUser
            ? 'bg-brand-accent text-white'
            : 'bg-brand-primary text-brand-accent border border-brand-primary'
        }`}
        aria-hidden="true"
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[85%] sm:max-w-[78%] rounded-md p-3.5 space-y-2 text-xs sm:text-[13px] leading-relaxed shadow-subtle ${
          isUser
            ? 'bg-brand-primary text-white rounded-tr-none'
            : 'bg-brand-surface border border-brand-border text-brand-primary rounded-tl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>

        {/* Attached Suggested Actions */}
        {!isUser && message.actions && message.actions.length > 0 && (
          <AIChatActions actions={message.actions} onActionClick={onActionClick} />
        )}
      </div>
    </div>
  );
}
