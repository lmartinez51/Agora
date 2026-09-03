import { NextRequest } from 'next/server';

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory sliding window cache keyed by client IP
const rateLimitCache = new Map<string, RateLimitRecord>();

// Configuration parameters
const WINDOW_SIZE_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 requests per minute
const MAX_HOURLY_REQUESTS = 50; // Max 50 requests per hour
const HOURLY_WINDOW_SIZE_MS = 60 * 60 * 1000;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Extracts client IP safely from request headers
 */
export function getClientIp(req: NextRequest): string {
  // Check standard proxy headers
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  return '127.0.0.1';
}

/**
 * Determines whether a request originates genuinely from local loopback (localhost, 127.0.0.1, ::1).
 */
export function isLocalhostRequest(req: NextRequest): boolean {
  const host = req.headers.get('host')?.toLowerCase() || req.nextUrl.host?.toLowerCase() || '';
  const hostname = host.split(':')[0];
  const isLoopbackHost =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '[::1]' ||
    hostname === '::1';

  const clientIp = getClientIp(req);
  const isLoopbackIp =
    clientIp === '127.0.0.1' ||
    clientIp === '::1' ||
    clientIp === '::ffff:127.0.0.1' ||
    clientIp === 'localhost';

  return isLoopbackHost && isLoopbackIp;
}

/**
 * Checks sliding window rate limit for a client IP
 */
export function checkRateLimit(req: NextRequest): RateLimitResult {
  const ip = getClientIp(req);
  const now = Date.now();

  let record = rateLimitCache.get(ip);
  if (!record) {
    record = { timestamps: [] };
    rateLimitCache.set(ip, record);
  }

  // 1. Prune timestamps older than 1 hour
  record.timestamps = record.timestamps.filter((ts) => now - ts < HOURLY_WINDOW_SIZE_MS);

  // 2. Check 1-hour window limit
  if (record.timestamps.length >= MAX_HOURLY_REQUESTS) {
    const oldestInHour = record.timestamps[0] || now;
    const retryAfter = Math.ceil((HOURLY_WINDOW_SIZE_MS - (now - oldestInHour)) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, retryAfter),
    };
  }

  // 3. Check 1-minute window limit
  const recentInMinute = record.timestamps.filter((ts) => now - ts < WINDOW_SIZE_MS);
  if (recentInMinute.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestInMinute = recentInMinute[0] || now;
    const retryAfter = Math.ceil((WINDOW_SIZE_MS - (now - oldestInMinute)) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, retryAfter),
    };
  }

  // 4. Record new request timestamp
  record.timestamps.push(now);

  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - (recentInMinute.length + 1),
    retryAfterSeconds: 0,
  };
}

/**
 * Resets the in-memory cache (for test suite use)
 */
export function resetRateLimitsForTesting(): void {
  rateLimitCache.clear();
}
