type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  key: string;
  limit?: number;
  windowMs?: number;
};

type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW = 10 * 60 * 1000; // 10 minutes

export function rateLimit({
  key,
  limit = DEFAULT_LIMIT,
  windowMs = DEFAULT_WINDOW,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();

  const existing = store.get(key);

  if (!existing || now >= existing.resetAt) {
    const resetAt = now + windowMs;

    store.set(key, {
      count: 1,
      resetAt,
    });

    return {
      success: true,
      remaining: Math.max(limit - 1, 0),
      resetAt,
    };
  }

  if (existing.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;

  store.set(key, existing);

  return {
    success: true,
    remaining: Math.max(limit - existing.count, 0),
    resetAt: existing.resetAt,
  };
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function rateLimitResponse(resetAt: number) {
  const retryAfter = Math.max(
    Math.ceil((resetAt - Date.now()) / 1000),
    1
  );

  return Response.json(
    {
      success: false,
      error:
        "Too many submissions. Please wait a few minutes and try again.",
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
      },
    }
  );
}