import { AIChatMode, AIProviderType } from './types';

export interface AIChatConfig {
  enabled: boolean;
  mode: AIChatMode;
  provider: AIProviderType;
  geminiModel: string;
  openaiModel: string;
  maxUserMessageLength: number;
  maxHistoryTurns: number;
  availability: '24/7_automated';
  privateSecret?: string;
  pilotSecret?: string;
}

export function isAIChatEnabled(): boolean {
  return process.env.NEXT_PUBLIC_AI_CHAT_ENABLED === 'true';
}

export function getAIChatMode(): AIChatMode {
  const envMode = process.env.AI_CHAT_MODE;
  if (
    envMode === 'private' ||
    envMode === 'client-pilot' ||
    envMode === 'public' ||
    envMode === 'disabled'
  ) {
    return envMode;
  }
  return isAIChatEnabled() ? 'public' : 'disabled';
}

export function getAIPrivateSecret(): string | undefined {
  return process.env.AI_CHAT_PRIVATE_SECRET;
}

export function getAIPilotSecret(): string | undefined {
  return process.env.AI_CHAT_PILOT_SECRET || process.env.AI_CHAT_PRIVATE_SECRET;
}

export function getAIProviderType(): AIProviderType {
  const provider = process.env.AI_PROVIDER;
  if (!provider) {
    return 'local'; // Default local grounded engine when unset
  }
  if (provider === 'gemini' || provider === 'openai' || provider === 'unavailable' || provider === 'local') {
    return provider;
  }
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[AI Config] Unknown or invalid AI_PROVIDER "${provider}". Safely resolving to unavailable.`);
  }
  return 'unavailable';
}

export const DEFAULT_GEMINI_MODEL = 'gemini-flash-latest';

export function getGeminiModel(): string {
  return process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
}

export const DEFAULT_OPENAI_MODEL = 'gpt-5.6-luna';

export function getOpenAIModel(): string {
  return process.env.OPENAI_MODEL?.trim() || DEFAULT_OPENAI_MODEL;
}

export function getAIChatConfig(): AIChatConfig {
  const enabled = isAIChatEnabled();
  const mode = getAIChatMode();
  const provider = getAIProviderType();
  const privateSecret = getAIPrivateSecret();
  const pilotSecret = getAIPilotSecret();
  const geminiModel = getGeminiModel();
  const openaiModel = getOpenAIModel();

  return {
    enabled,
    mode,
    provider,
    geminiModel,
    openaiModel,
    maxUserMessageLength: 500,
    maxHistoryTurns: 10,
    availability: '24/7_automated',
    privateSecret,
    pilotSecret,
  };
}
