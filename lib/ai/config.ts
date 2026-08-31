import { AIChatMode, AIProviderType } from './types';

export interface AIChatConfig {
  enabled: boolean;
  mode: AIChatMode;
  provider: AIProviderType;
  maxUserMessageLength: number;
  maxHistoryTurns: number;
  availability: '24/7_automated';
}

export function isAIChatEnabled(): boolean {
  return process.env.NEXT_PUBLIC_AI_CHAT_ENABLED === 'true';
}

export function getAIChatMode(): AIChatMode {
  const envMode = process.env.AI_CHAT_MODE;
  if (envMode === 'private' || envMode === 'public' || envMode === 'disabled') {
    return envMode;
  }
  return isAIChatEnabled() ? 'public' : 'disabled';
}

export function getAIProviderType(): AIProviderType {
  const provider = process.env.AI_PROVIDER;
  if (provider === 'gemini' || provider === 'openai' || provider === 'unavailable' || provider === 'local') {
    return provider;
  }
  return 'local'; // Default local grounded engine (no cloud API key needed for basic operation)
}

export function getAIChatConfig(): AIChatConfig {
  const enabled = isAIChatEnabled();
  const mode = getAIChatMode();
  const provider = getAIProviderType();

  return {
    enabled,
    mode,
    provider,
    maxUserMessageLength: 500,
    maxHistoryTurns: 10,
    availability: '24/7_automated',
  };
}
