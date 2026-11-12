import { z } from 'zod'


export interface DrillingStats {
  feet: number
  miles: number
  wells: number
}

const FEET_PER_MILE = 5280
const REFRESH_MS = 7 * 24 * 60 * 60 * 1000 // fetch fresh numbers once a week
const RETRY_MS = 60 * 60 * 1000 // after a failed fetch, wait an hour before trying again
const TIMEOUT_MS = 3000

// Shown until the API has been reached at least once (or if it's not configured)
const DEFAULT_STATS: DrillingStats = { feet: 814_128, miles: 154, wells: 3_377 }

// Numbers may arrive as numbers or numeric strings like "814,128"
const amount = z.preprocess(
  v => typeof v === 'string' && v.trim() !== '' ? Number(v.replace(/,/g, '')) : v,
  z.number().positive()
).optional()

// Accepts a few likely field names until the API's real response shape is known; miles is optional.
const apiSchema = z.object({
  feet: amount,
  totalFeet: amount,
  feetDrilled: amount,
  miles: amount,
  totalMiles: amount,
  milesDrilled: amount,
  wells: amount,
  totalWells: amount,
  wellsDrilled: amount
})

let cached: DrillingStats | null = null
let nextFetchAt = 0
let inFlight: Promise<void> | null = null

function parseStats(json: unknown): DrillingStats | null {
  // Allow the numbers to be wrapped in a top-level "data" object
  const body = json && typeof json === 'object' && 'data' in json ? (json as { data: unknown }).data : json
  const result = apiSchema.safeParse(body)
  if (!result.success) return null

  const d = result.data
  const feet = d.feet ?? d.totalFeet ?? d.feetDrilled
  const wells = d.wells ?? d.totalWells ?? d.wellsDrilled
  if (feet === undefined || wells === undefined) return null

  const miles = d.miles ?? d.totalMiles ?? d.milesDrilled ?? feet / FEET_PER_MILE
  return { feet: Math.round(feet), miles: Math.round(miles), wells: Math.round(wells) }
}

async function refresh(url: string): Promise<void> {
  try {
    const headers: Record<string, string> = { Accept: 'application/json' }
    const apiKey = process.env.DRILLING_STATS_API_KEY
    if (apiKey) headers.Authorization = `Bearer ${ apiKey }`

    const response = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) })
    if (!response.ok) throw new Error(`HTTP ${ response.status }`)

    const stats = parseStats(await response.json())
    if (!stats) throw new Error('unexpected response shape')

    cached = stats
    nextFetchAt = Date.now() + REFRESH_MS
  } catch (error) {
    console.error('Drilling stats fetch failed, keeping previous values:', error)
    nextFetchAt = Date.now() + RETRY_MS
  }
}

/**
 * Returns the latest drilling stats. The API is called at most once a week;
 * between calls (and whenever the API fails) the last good values are served.
 * Only the very first request after the server starts waits on the API.
 */
export async function getDrillingStats(): Promise<DrillingStats> {
  const url = process.env.DRILLING_STATS_API_URL
  if (!url) return cached ?? DEFAULT_STATS

  if (Date.now() >= nextFetchAt && !inFlight) {
    inFlight = refresh(url).finally(() => {
      inFlight = null
    })
  }

  // Cold start: wait for the first fetch so visitors get real numbers right away.
  // Afterwards, refresh in the background and serve the cached values immediately.
  if (!cached && inFlight) await inFlight

  return cached ?? DEFAULT_STATS
}
