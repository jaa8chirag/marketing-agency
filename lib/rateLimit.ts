// In-memory fixed-window rate limiter — good enough for a single-instance
// deployment of a marketing site's contact/newsletter forms. Not
// distributed-safe (each server process has its own map); swap for a
// Redis-backed limiter before running multiple instances behind a load
// balancer.
const hits = new Map<string, { count: number; windowStart: number }>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(key, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}
