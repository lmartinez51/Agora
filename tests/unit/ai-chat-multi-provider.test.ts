import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getAIProvider,
  GeminiProvider,
  OpenAIProvider,
  LocalGroundingProvider,
  UnavailableProvider,
} from '@/lib/ai/provider';
import { getAIProviderType } from '@/lib/ai/config';
import { detectIntent } from '@/lib/ai/intent';
import { getSystemPromptKnowledge } from '@/lib/ai/knowledge';
import { ChatMessage, AIRequestContext } from '@/lib/ai/types';

describe('Phase 14 — Cross-Provider & Multi-Provider Integration Suite', () => {
  const originalProvider = process.env.AI_PROVIDER;
  const originalGeminiKey = process.env.GEMINI_API_KEY;
  const originalOpenAIKey = process.env.OPENAI_API_KEY;

  beforeEach(() => {
    delete process.env.AI_PROVIDER;
    delete process.env.GEMINI_API_KEY;
    delete process.env.OPENAI_API_KEY;
  });

  afterEach(() => {
    if (originalProvider !== undefined) process.env.AI_PROVIDER = originalProvider;
    else delete process.env.AI_PROVIDER;

    if (originalGeminiKey !== undefined) process.env.GEMINI_API_KEY = originalGeminiKey;
    else delete process.env.GEMINI_API_KEY;

    if (originalOpenAIKey !== undefined) process.env.OPENAI_API_KEY = originalOpenAIKey;
    else delete process.env.OPENAI_API_KEY;

    vi.restoreAllMocks();
  });

  // ==========================================================================
  // 1. Explicit Provider Selection & Safe Invalid Provider Handling
  // ==========================================================================
  describe('1. Explicit Provider Selection', () => {
    it('selects LocalGroundingProvider when AI_PROVIDER is unset or explicitly "local"', () => {
      delete process.env.AI_PROVIDER;
      expect(getAIProviderType()).toBe('local');
      expect(getAIProvider()).toBeInstanceOf(LocalGroundingProvider);

      process.env.AI_PROVIDER = 'local';
      expect(getAIProviderType()).toBe('local');
      expect(getAIProvider()).toBeInstanceOf(LocalGroundingProvider);
    });

    it('selects GeminiProvider when AI_PROVIDER=gemini', () => {
      process.env.AI_PROVIDER = 'gemini';
      expect(getAIProviderType()).toBe('gemini');
      expect(getAIProvider()).toBeInstanceOf(GeminiProvider);
    });

    it('selects OpenAIProvider when AI_PROVIDER=openai', () => {
      process.env.AI_PROVIDER = 'openai';
      expect(getAIProviderType()).toBe('openai');
      expect(getAIProvider()).toBeInstanceOf(OpenAIProvider);
    });

    it('safely resolves unknown AI_PROVIDER to UnavailableProvider without silently defaulting to a remote provider', () => {
      process.env.AI_PROVIDER = 'unknown-cloud-ai';
      expect(getAIProviderType()).toBe('unavailable');
      expect(getAIProvider()).toBeInstanceOf(UnavailableProvider);

      process.env.AI_PROVIDER = 'claude-invalid';
      expect(getAIProviderType()).toBe('unavailable');
      expect(getAIProvider()).toBeInstanceOf(UnavailableProvider);
    });
  });

  // ==========================================================================
  // 2. Strict Prohibition of Automatic Failover Between Providers
  // ==========================================================================
  describe('2. Prohibition of Automatic Provider Failover', () => {
    it('when Gemini is active and returns HTTP 503, it does NOT silently failover to OpenAI or Local', async () => {
      process.env.AI_PROVIDER = 'gemini';
      process.env.GEMINI_API_KEY = 'test-gemini-key';
      process.env.OPENAI_API_KEY = 'test-openai-key';

      // Mock fetch: Gemini returns 503
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        text: async () => 'Gemini unavailable',
      });
      global.fetch = mockFetch;

      const provider = getAIProvider();
      expect(provider).toBeInstanceOf(GeminiProvider);

      const intent = detectIntent('¿Cuántos abogados tiene AGORA?');
      const response = await provider.generateResponse(
        [{ id: '1', role: 'user', content: '¿Cuántos abogados tiene AGORA?', createdAt: 1 }],
        {
          mode: 'public',
          userQuery: '¿Cuántos abogados tiene AGORA?',
          intentResult: intent,
          groundedKnowledge: 'Grounded base',
        }
      );

      // Only calls GeminiGenerativeLanguage endpoint, NEVER api.openai.com
      const calledUrls = mockFetch.mock.calls.map((c) => String(c[0]));
      expect(calledUrls.every((url) => url.includes('generativelanguage.googleapis.com'))).toBe(true);
      expect(calledUrls.some((url) => url.includes('api.openai.com'))).toBe(false);

      // Returns friendly service message, NOT a local grounded substitution
      expect(response.content).toContain('El servicio de asistencia jurídica se encuentra temporalmente con alta demanda');
    });

    it('when OpenAI is active and returns HTTP 503, it does NOT silently failover to Gemini or Local', async () => {
      process.env.AI_PROVIDER = 'openai';
      process.env.OPENAI_API_KEY = 'test-openai-key';
      process.env.GEMINI_API_KEY = 'test-gemini-key';

      // Mock fetch: OpenAI returns 503
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        text: async () => 'OpenAI 503 Service Unavailable',
      });
      global.fetch = mockFetch;

      const provider = getAIProvider();
      expect(provider).toBeInstanceOf(OpenAIProvider);

      const intent = detectIntent('¿Cuántos abogados tiene AGORA?');
      const response = await provider.generateResponse(
        [{ id: '1', role: 'user', content: '¿Cuántos abogados tiene AGORA?', createdAt: 1 }],
        {
          mode: 'public',
          userQuery: '¿Cuántos abogados tiene AGORA?',
          intentResult: intent,
          groundedKnowledge: 'Grounded base',
        }
      );

      // Only calls api.openai.com, NEVER Google Gemini
      const calledUrls = mockFetch.mock.calls.map((c) => String(c[0]));
      expect(calledUrls.every((url) => url.includes('api.openai.com/v1/responses'))).toBe(true);
      expect(calledUrls.some((url) => url.includes('generativelanguage.googleapis.com'))).toBe(false);

      // Returns friendly service message, NOT a local grounded substitution
      expect(response.content).toContain('El servicio de asistencia jurídica se encuentra temporalmente con alta demanda');
    });
  });

  // ==========================================================================
  // 3. System Instruction Parity Between Providers
  // ==========================================================================
  describe('3. System Instruction Parity', () => {
    it('ensures both Gemini and OpenAI receive the identical canonical AGORA knowledge policy', async () => {
      let geminiInstruction = '';
      let openAIInstruction = '';

      const mockFetch = vi.fn().mockImplementation(async (url, init) => {
        const urlStr = String(url);
        const body = JSON.parse(init?.body as string);

        if (urlStr.includes('generativelanguage')) {
          geminiInstruction = (body?.systemInstruction?.parts?.[0]?.text as string) || '';
          return {
            ok: true,
            status: 200,
            json: async () => ({
              candidates: [{ content: { parts: [{ text: 'Respuesta Gemini' }] } }],
            }),
          };
        }

        if (urlStr.includes('api.openai.com')) {
          openAIInstruction = (body?.instructions as string) || '';
          return {
            ok: true,
            status: 200,
            json: async () => ({
              output_text: 'Respuesta OpenAI',
            }),
          };
        }

        return { ok: false, status: 500 };
      });

      global.fetch = mockFetch;

      const canonicalKnowledge = getSystemPromptKnowledge();
      const messages: ChatMessage[] = [
        { id: '1', role: 'user', content: 'Hola, deseo orientación', createdAt: 1 },
      ];
      const context: AIRequestContext = {
        mode: 'public',
        userQuery: 'Hola, deseo orientación',
        intentResult: detectIntent('Hola, deseo orientación'),
        groundedKnowledge: canonicalKnowledge,
      };

      // 1. Call Gemini
      process.env.GEMINI_API_KEY = 'gemini-test-key';
      const gemini = new GeminiProvider();
      await gemini.generateResponse(messages, context);

      // 2. Call OpenAI
      process.env.OPENAI_API_KEY = 'openai-test-key';
      const openai = new OpenAIProvider();
      await openai.generateResponse(messages, context);

      // Parity check: Both providers receive the EXACT same canonical instructions!
      expect(geminiInstruction).toBe(canonicalKnowledge);
      expect(openAIInstruction).toBe(canonicalKnowledge);
      expect(openAIInstruction).toContain('POLÍTICA DE 3 ESTADOS DE CONOCIMIENTO (OBLIGATORIA)');
      expect(openAIInstruction).toContain('REGLA ANTI-EXTRAPOLACIÓN DE HECHOS INSTITUCIONALES');
      expect(openAIInstruction).toContain('AISLAMIENTO DE ASEVERACIONES Y PREMISAS DEL USUARIO');
    });
  });

  // ==========================================================================
  // 4. Semantic Invariants on Golden Scenarios
  // ==========================================================================
  describe('4. Semantic Invariants on Golden Scenarios', () => {
    const localProvider = new LocalGroundingProvider();

    it('Scenario 1: Lawyer count invariant (7 total, 2 managing partners, 5 associates)', async () => {
      const query = '¿Cuántos abogados forman parte de AGORA?';
      const intent = detectIntent(query);
      const context: AIRequestContext = {
        mode: 'public',
        userQuery: query,
        intentResult: intent,
        groundedKnowledge: getSystemPromptKnowledge(),
      };

      const localRes = await localProvider.generateResponse(
        [{ id: '1', role: 'user', content: query, createdAt: 1 }],
        context
      );

      expect(intent.intent).toBe('firm_info');
      expect(localRes.content).toContain('7 abogados');
      expect(localRes.content).toContain('2 socios directores');
      expect(localRes.content).toContain('5 asociados');
    });

    it('Scenario 2: Firm trajectory invariant (25 years firm trajectory, no individual extrapolation)', async () => {
      const query = '¿Cuántos años de experiencia o trayectoria tiene la firma?';
      const intent = detectIntent(query);
      const context: AIRequestContext = {
        mode: 'public',
        userQuery: query,
        intentResult: intent,
        groundedKnowledge: getSystemPromptKnowledge(),
      };

      const localRes = await localProvider.generateResponse(
        [{ id: '1', role: 'user', content: query, createdAt: 1 }],
        context
      );

      expect(intent.intent).toBe('firm_info');
      expect(localRes.content).toContain('25 años de trayectoria');
      expect(localRes.content).not.toContain('cada abogado tiene 25 años');
    });

    it('Scenario 3: Confirmed practice areas invariant (Civil, Mercantil, Familiar, Penal, Amparo)', async () => {
      const query = '¿Cuáles son las áreas de práctica de AGORA?';
      const intent = detectIntent(query);
      const context: AIRequestContext = {
        mode: 'public',
        userQuery: query,
        intentResult: intent,
        groundedKnowledge: getSystemPromptKnowledge(),
      };

      const localRes = await localProvider.generateResponse(
        [{ id: '1', role: 'user', content: query, createdAt: 1 }],
        context
      );

      expect(localRes.content).toContain('Civil');
      expect(localRes.content).toContain('Mercantil');
      expect(localRes.content).toContain('Familiar');
      expect(localRes.content).toContain('Penal');
      expect(localRes.content).toContain('Amparo');
    });

    it('Scenario 4: Pending attorney names invariant (must be acknowledged as pending, never invented)', async () => {
      const query = '¿Quiénes son los siete abogados de AGORA y qué especialidad tiene cada uno?';
      const intent = detectIntent(query);
      const context: AIRequestContext = {
        mode: 'public',
        userQuery: query,
        intentResult: intent,
        groundedKnowledge: getSystemPromptKnowledge(),
      };

      const localRes = await localProvider.generateResponse(
        [{ id: '1', role: 'user', content: query, createdAt: 1 }],
        context
      );

      expect(intent.intent).toBe('attorney_info');
      expect(localRes.content).toContain('proceso formal de confirmación y publicación');
      expect(localRes.content).not.toContain('Lic. Juan');
    });

    it('Scenario 5: Explicit booking intent -> suggestedAction to /agenda', () => {
      const query = 'Quiero agendar una consulta jurídica en línea';
      const intent = detectIntent(query);

      expect(intent.intent).toBe('booking');
      const bookingAction = intent.suggestedActions.find((a) => a.type === 'booking');
      expect(bookingAction).toBeDefined();
      expect(bookingAction?.href).toBe('/agenda');
    });
  });

  // ==========================================================================
  // 5. Multi-Turn Scenarios & Contextual Consistency
  // ==========================================================================
  describe('5. Multi-Turn Scenarios', () => {
    it('Multi-turn Scenario A: Lawyer count followed by specialist query does NOT extrapolate specialty', () => {
      const turn1Intent = detectIntent('¿Cuántos abogados tiene AGORA?');
      expect(turn1Intent.intent).toBe('firm_info');

      // Second turn asks about specific specialist
      const turn2Intent = detectIntent('¿Cuál de ellos lleva penal?');
      expect(turn2Intent.intent).toBe('attorney_info');
      expect(turn2Intent.suggestedActions).toEqual([]);
    });

    it('Multi-turn Scenario B: Practice area followed by booking switch updates active intent correctly', () => {
      const turn1Intent = detectIntent('¿Qué servicios tienen en Derecho Civil?');
      expect(turn1Intent.intent).toBe('practice_area');

      // Second turn explicitly wants to book
      const turn2Intent = detectIntent('Perfecto. Quiero agendar una cita.');
      expect(turn2Intent.intent).toBe('booking');
      expect(turn2Intent.suggestedActions.some((a) => a.href === '/agenda')).toBe(true);
    });

    it('Multi-turn Scenario C: Ambiguous input receives safe general guidance without CTA spam', () => {
      const ambiguousQuery = 'Necesito ayuda con un asunto legal.';
      const intent = detectIntent(ambiguousQuery);

      // Does not trigger high-pressure conversion or arbitrary booking action
      expect(intent.intent).not.toBe('booking');
      expect(intent.suggestedActions.filter((a) => a.type === 'booking')).toHaveLength(0);
    });
  });
});
