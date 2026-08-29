import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getBaseUrl, constructMetadata } from '@/lib/seo';

describe('SEO & Canonical Domain Architecture', () => {
  const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
    } else {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    }
  });

  it('uses http://localhost:3000 as default development baseUrl when NEXT_PUBLIC_SITE_URL is not set', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getBaseUrl()).toBe('http://localhost:3000');
  });

  it('uses NEXT_PUBLIC_SITE_URL when defined without hardcoding unverified production domains', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://client-approved-domain.com/';
    expect(getBaseUrl()).toBe('https://client-approved-domain.com');
  });

  it('constructs canonical URL dynamically without hardcoded domains', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const meta = constructMetadata({ path: '/practicas' });
    expect(meta.alternates?.canonical).toBe('http://localhost:3000/practicas');
  });
});
