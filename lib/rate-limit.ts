// Minimal in-memory per-IP rate limiter for sensitive API routes.
// Basic protection only: counters are per serverless instance, which is
// enough to blunt casual abuse and order-spam. For distributed limiting
// across many instances, swap this for Upstash/Vercel KV later.

type Bucket = { count: number; reset: number };

const buckets = new Map<string, Bucket>();

const MAX_BUCKETS = 5000;

function prune(now: number) {
  for (const [key, bucket] of buckets) {
    if (now > bucket.reset) buckets.delete(key);
    if (buckets.size <= MAX_BUCKETS) break;
  }
}

/** Returns true when the request is allowed, false when rate limited. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    if (buckets.size > MAX_BUCKETS) prune(now);
    return true;
  }
  bucket.count += 1;
  return bucket.count <= limit;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
