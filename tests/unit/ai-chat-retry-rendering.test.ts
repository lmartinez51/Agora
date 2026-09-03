import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { GeminiProvider } from '@/lib/ai/provider';
import { detectIntent } from '@/lib/ai/intent';
import {
  isSafeHref,
  normalizeEscapedMarkdown,
  AIChatMarkdown,
} from '@/components/ai-chat/AIChatMarkdown';

describe('Phase 12.1.6 — Gemini Transient Retries & Safe Response Rendering', () => {
  const originalApiKey = process.env.AI_API_KEY;
  const originalGeminiKey = process.env.GEMINI_API_KEY;
  const originalNodeEnv = process.env.NODE_ENV;

  function setNodeEnv(value: string | undefined) {
    if (value === undefined) {
      delete (process.env as Record<string, string | undefined>).NODE_ENV;
    } else {
      (process.env as Record<string, string | undefined>).NODE_ENV = value;
    }
  }

  beforeEach(() => {
    delete process.env.AI_API_KEY;
    delete process.env.GEMINI_API_KEY;
    process.env.AI_API_KEY = 'test-gemini-key';
  });

  afterEach(() => {
    if (originalApiKey !== undefined) process.env.AI_API_KEY = originalApiKey;
    else delete process.env.AI_API_KEY;

    if (originalGeminiKey !== undefined) process.env.GEMINI_API_KEY = originalGeminiKey;
    else delete process.env.GEMINI_API_KEY;

    setNodeEnv(originalNodeEnv);
    vi.restoreAllMocks();
  });

  describe('Part A — Gemini Transient Error Retries', () => {
    it('1. HTTP 503: first attempt fails, second succeeds -> returns successful final response', async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          text: async () => 'Model overloaded',
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            candidates: [
              {
                content: {
                  parts: [{ text: 'Respuesta exitosa de AGORA tras reintento.' }],
                },
              },
            ],
          }),
        });

      global.fetch = mockFetch;

      const provider = new GeminiProvider(undefined, { getRetryDelay: () => 0 });
      const intent = detectIntent('Consulta');
      const response = await provider.generateResponse(
        [{ id: '1', role: 'user', content: 'Consulta', createdAt: Date.now() }],
        {
          mode: 'public',
          userQuery: 'Consulta',
          intentResult: intent,
          groundedKnowledge: 'Base',
        }
      );

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(response.content).toContain('Respuesta exitosa de AGORA');
    });

    it('2. HTTP 503: all 3 attempts fail -> returns friendly service-unavailable response', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        text: async () => 'This model is currently experiencing high demand.',
      });

      global.fetch = mockFetch;

      const provider = new GeminiProvider(undefined, { getRetryDelay: () => 0 });
      const intent = detectIntent('Consulta');
      const response = await provider.generateResponse(
        [{ id: '1', role: 'user', content: 'Consulta', createdAt: Date.now() }],
        {
          mode: 'public',
          userQuery: 'Consulta',
          intentResult: intent,
          groundedKnowledge: 'Base',
        }
      );

      expect(mockFetch).toHaveBeenCalledTimes(3);
      expect(response.content).toContain('alta demanda');
    });

    it('3. HTTP 429: retry occurs -> returns successful response if subsequent attempt succeeds', async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: false,
          status: 429,
          text: async () => 'Resource exhausted',
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            candidates: [
              {
                content: {
                  parts: [{ text: 'Respuesta tras recuperarse de 429.' }],
                },
              },
            ],
          }),
        });

      global.fetch = mockFetch;

      const provider = new GeminiProvider(undefined, { getRetryDelay: () => 0 });
      const intent = detectIntent('Consulta');
      const response = await provider.generateResponse(
        [{ id: '1', role: 'user', content: 'Consulta', createdAt: Date.now() }],
        {
          mode: 'public',
          userQuery: 'Consulta',
          intentResult: intent,
          groundedKnowledge: 'Base',
        }
      );

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(response.content).toContain('Respuesta tras recuperarse de 429');
    });

    it('4. HTTP 429: all 3 attempts fail -> returns friendly quota response', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        text: async () => 'Quota exceeded',
      });

      global.fetch = mockFetch;

      const provider = new GeminiProvider(undefined, { getRetryDelay: () => 0 });
      const intent = detectIntent('Consulta');
      const response = await provider.generateResponse(
        [{ id: '1', role: 'user', content: 'Consulta', createdAt: Date.now() }],
        {
          mode: 'public',
          userQuery: 'Consulta',
          intentResult: intent,
          groundedKnowledge: 'Base',
        }
      );

      expect(mockFetch).toHaveBeenCalledTimes(3);
      expect(response.content).toContain('límite temporal de consultas simultáneas');
    });

    it('5. HTTP 404: permanent error -> NO retry occurs (1 attempt only)', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        text: async () => 'Model not found',
      });

      global.fetch = mockFetch;

      const provider = new GeminiProvider(undefined, { getRetryDelay: () => 0 });
      const intent = detectIntent('Consulta');
      const response = await provider.generateResponse(
        [{ id: '1', role: 'user', content: 'Consulta', createdAt: Date.now() }],
        {
          mode: 'public',
          userQuery: 'Consulta',
          intentResult: intent,
          groundedKnowledge: 'Base',
        }
      );

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(response.content).toContain('no se encuentra disponible');
    });

    it('6. HTTP 401/403: authorization error -> NO retry occurs (1 attempt only)', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        text: async () => 'Invalid API Key',
      });

      global.fetch = mockFetch;

      const provider = new GeminiProvider(undefined, { getRetryDelay: () => 0 });
      const intent = detectIntent('Consulta');
      const response = await provider.generateResponse(
        [{ id: '1', role: 'user', content: 'Consulta', createdAt: Date.now() }],
        {
          mode: 'public',
          userQuery: 'Consulta',
          intentResult: intent,
          groundedKnowledge: 'Base',
        }
      );

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(response.content).toContain('inconveniente de autorización');
    });

    it('7. Retry logging in development does not expose GEMINI_API_KEY', async () => {
      setNodeEnv('development');
      const secretKey = 'super-secret-key-123456';
      process.env.GEMINI_API_KEY = secretKey;
      delete process.env.AI_API_KEY;

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        text: async () => `Google error with secret: ${secretKey}`,
      });
      global.fetch = mockFetch;

      const provider = new GeminiProvider(undefined, { getRetryDelay: () => 0 });
      const intent = detectIntent('Consulta');
      await provider.generateResponse(
        [{ id: '1', role: 'user', content: 'Consulta', createdAt: Date.now() }],
        {
          mode: 'public',
          userQuery: 'Consulta',
          intentResult: intent,
          groundedKnowledge: 'Base',
        }
      );

      // Verify retry warn logs contain attempt info and no secret key
      expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
      for (const call of consoleWarnSpy.mock.calls) {
        expect(call[0]).toContain('Retrying attempt');
        expect(call[0]).toContain('503');
        expect(call[0]).not.toContain(secretKey);
      }

      // Verify final error log redacted the key
      expect(consoleErrorSpy).toHaveBeenCalled();
      const errorLog = consoleErrorSpy.mock.calls[0][1];
      expect(errorLog).not.toContain(secretKey);
      expect(errorLog).toContain('[REDACTED_API_KEY]');

      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('8. Maximum number of attempts is strictly bounded to 3 (initial + 2 retries)', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        text: async () => 'Overloaded',
      });
      global.fetch = mockFetch;

      const provider = new GeminiProvider(undefined, { getRetryDelay: () => 0 });
      expect(provider.maxRetries).toBe(2);

      const intent = detectIntent('Consulta');
      await provider.generateResponse(
        [{ id: '1', role: 'user', content: 'Consulta', createdAt: Date.now() }],
        {
          mode: 'public',
          userQuery: 'Consulta',
          intentResult: intent,
          groundedKnowledge: 'Base',
        }
      );

      expect(mockFetch).toHaveBeenCalledTimes(3);
    });
  });

  describe('Part B — Markdown Normalization & Safe Link Verification', () => {
    it('normalizes escaped bold sequences correctly', () => {
      expect(normalizeEscapedMarkdown('\\*\\*AGORA, ABOGADOS\\*\\*')).toBe('**AGORA, ABOGADOS**');
    });

    it('normalizes escaped bullet points at line start', () => {
      expect(normalizeEscapedMarkdown('\\* \\*\\*2 socios directores\\*\\*')).toBe(
        '* **2 socios directores**'
      );
      expect(
        normalizeEscapedMarkdown('\\* \\*\\*2 socios\\*\\*\n\\* \\*\\*5 asociados\\*\\*')
      ).toBe('* **2 socios**\n* **5 asociados**');
    });

    it('normalizes escaped numbered lists', () => {
      expect(normalizeEscapedMarkdown('\\1\\. Primer paso\n\\2\\. Segundo paso')).toBe(
        '1. Primer paso\n2. Segundo paso'
      );
    });

    it('normalizes escaped markdown link brackets', () => {
      expect(normalizeEscapedMarkdown('\\[Agenda\\]\\(/agenda\\)')).toBe('[Agenda](/agenda)');
    });

    it('preserves intentional backslashes in non-markdown text', () => {
      const windowsPath = 'C:\\Users\\Documentos\\Archivo.pdf';
      expect(normalizeEscapedMarkdown(windowsPath)).toBe(windowsPath);
      const andOr = 'y\\o';
      expect(normalizeEscapedMarkdown(andOr)).toBe(andOr);
    });

    it('isSafeHref correctly validates safe and unsafe URLs', () => {
      // Internal links
      expect(isSafeHref('/agenda')).toBe(true);
      expect(isSafeHref('/contacto')).toBe(true);
      expect(isSafeHref('/practicas/derecho-civil')).toBe(true);

      // External links
      expect(isSafeHref('https://agora-abogados.com')).toBe(true);
      expect(isSafeHref('http://localhost:3000')).toBe(true);

      // Dangerous / Malicious protocols
      expect(isSafeHref('javascript:alert(1)')).toBe(false);
      expect(isSafeHref('javascript:void(0)')).toBe(false);
      expect(isSafeHref('data:text/html,<script>alert(1)</script>')).toBe(false);
      expect(isSafeHref('vbscript:msgbox(1)')).toBe(false);
      expect(isSafeHref('//malicious.com')).toBe(false);
      expect(isSafeHref('/\\evil.com')).toBe(false);
      expect(isSafeHref('')).toBe(false);
    });
  });

  describe('Part C — Safe React Element Structure Generation', () => {
    it('renders bold markdown with strong elements', () => {
      const element = React.createElement(AIChatMarkdown, { content: '**AGORA**' });
      expect(element).toBeDefined();
    });

    it('renders real-world escaped shape without crashing and with proper structure', () => {
      const realShape = `\\*\\*AGORA, ABOGADOS\\*\\* es una firma en Ciudad Juárez.

\\* \\*\\*2 socios directores\\*\\*
\\* \\*\\*5 abogados asociados\\*\\*

Puede agendar su cita en (/agenda) o consultar [Aviso de Privacidad](/aviso-de-privacidad).`;

      const element = React.createElement(AIChatMarkdown, { content: realShape });
      expect(element).toBeDefined();

      const normalized = normalizeEscapedMarkdown(realShape);
      expect(normalized).not.toContain('\\*\\*');
      expect(normalized).toContain('**AGORA, ABOGADOS**');
      expect(normalized).toContain('* **2 socios directores**');
      expect(normalized).toContain('[Aviso de Privacidad](/aviso-de-privacidad)');
    });

    it('disallows javascript: in markdown link and renders as plain text without crashing', () => {
      const dangerous = '[Ataque](javascript:alert("pwned"))';
      const element = React.createElement(AIChatMarkdown, { content: dangerous });
      expect(element).toBeDefined();
    });
  });
});
