const WINDOW_MS = 60_000
const MAX_REQUESTS = 3
const MAX_KEYS = 1000

const hits = new Map<string, number[]>()

export function rateLimit(ip: string): boolean {
  const now = Date.now()

  // Clean stale entries when map grows too large
  if (hits.size > MAX_KEYS) {
    for (const [ key, timestamps ] of hits) {
      if (timestamps.every(t => now - t > WINDOW_MS)) {
        hits.delete(key)
      }
    }
  }

  const timestamps = hits.get(ip) ?? []
  const recent = timestamps.filter(t => now - t < WINDOW_MS)

  if (recent.length >= MAX_REQUESTS) {
    return false
  }

  recent.push(now)
  hits.set(ip, recent)
  return true
}
