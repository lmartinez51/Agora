import crypto from 'crypto';
import { getAIPilotSecret } from './config';

export const PILOT_SESSION_COOKIE_NAME = 'agora_pilot_session';
export const PILOT_SESSION_HEADER_NAME = 'x-agora-pilot-token';
export const PILOT_SESSION_DEFAULT_MAX_AGE_SEC = 2 * 60 * 60; // 2 hours in seconds
export const PILOT_SESSION_DEFAULT_MAX_AGE_MS = PILOT_SESSION_DEFAULT_MAX_AGE_SEC * 1000;

export function getPilotSigningSecret(): string {
  return (
    getAIPilotSecret() ||
    process.env.GEMINI_API_KEY ||
    'agora-client-pilot-secret-fallback-seed'
  );
}

/**
 * Creates a cryptographically signed, short-lived pilot session token.
 * Format: `${timestamp}.${nonce}.${signature}`
 */
export function createPilotSessionToken(timestampOverride?: number): string {
  const secret = getPilotSigningSecret();
  const timestamp = timestampOverride ?? Date.now();
  const nonce = crypto.randomBytes(8).toString('hex');
  const payload = `${timestamp}.${nonce}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return `${payload}.${signature}`;
}

/**
 * Verifies a pilot session token for cryptographic authenticity and expiration.
 */
export function verifyPilotSessionToken(
  token: string | undefined | null,
  maxAgeMs = PILOT_SESSION_DEFAULT_MAX_AGE_MS
): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }

  const parts = token.trim().split('.');
  if (parts.length !== 3) {
    return false;
  }

  const [timestampStr, nonce, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp) || !nonce || !signature) {
    return false;
  }

  const now = Date.now();
  // Reject expired tokens or tokens with timestamps in the future (> 1 minute clock skew allowance)
  if (now - timestamp > maxAgeMs || timestamp > now + 60000) {
    return false;
  }

  const secret = getPilotSigningSecret();
  const payload = `${timestampStr}.${nonce}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  const sigBuf = Buffer.from(signature, 'hex');
  const expBuf = Buffer.from(expectedSignature, 'hex');

  if (sigBuf.length !== expBuf.length || sigBuf.length === 0) {
    return false;
  }

  return crypto.timingSafeEqual(sigBuf, expBuf);
}
