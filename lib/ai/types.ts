import { WhatsAppContext } from '@/types';

export type AIChatMode = 'disabled' | 'private' | 'public';
export type AIProviderType = 'local' | 'gemini' | 'openai' | 'unavailable';

export interface AIChatAction {
  type: 'whatsapp' | 'booking' | 'link' | 'practice';
  label: string;
  href: string;
  isExternal?: boolean;
  context?: WhatsAppContext;
  detail?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: number;
  actions?: AIChatAction[];
  isError?: boolean;
}

export type AIIntentType =
  | 'general_info'
  | 'greeting'
  | 'firm_info'
  | 'practice_area'
  | 'attorney_info'
  | 'foreigners'
  | 'foreign_client'
  | 'business'
  | 'business_client'
  | 'booking'
  | 'contact'
  | 'article'
  | 'general_legal_info'
  | 'personal_legal_situation'
  | 'urgent_matter'
  | 'sensitive_info'
  | 'unsupported'
  | 'high_risk'
  | 'out_of_scope';

export interface AIIntentResult {
  intent: AIIntentType;
  confidence: number;
  practiceSlug?: string;
  articleSlug?: string;
  suggestedActions: AIChatAction[];
}

export interface AIGuardrailCheck {
  allowed: boolean;
  reason?: 'prompt_injection' | 'sensitive_data' | 'urgent_matter' | 'unsupported_legal_conclusion';
  interceptionMessage?: string;
  suggestedActions?: AIChatAction[];
}

export interface AIRequestContext {
  mode: AIChatMode;
  userQuery: string;
  intentResult: AIIntentResult;
  groundedKnowledge: string;
}

export interface AIResponsePayload {
  content: string;
  actions?: AIChatAction[];
  intent?: AIIntentType;
}

export interface AIProvider {
  type: AIProviderType;
  generateResponse(
    messages: ChatMessage[],
    context: AIRequestContext
  ): Promise<AIResponsePayload>;
}
