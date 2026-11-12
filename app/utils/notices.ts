/**
 * Site notices: short announcements shown in a bar above the navbar.
 * The list itself lives in `~/data/husky-data.ts`; the server picks which are active (notices.server.ts).
 */

export type NoticeSchedule =
  /** Shown until removed from the list. Optional YYYY-MM-DD bounds, inclusive, in Mountain time. */
  | { type: 'always', from?: string, until?: string }
  /** Shown every year between two MM-DD dates, inclusive. The window may wrap past New Year (e.g. 10-01 to 03-31). */
  | { type: 'yearly', from: string, to: string }

export interface NoticeConfig {
  /** Stable id, lowercase letters, digits and dashes */
  id: string
  message: string
  icon?: 'snowflake'
  link?: { href: string, label: string }
  show: NoticeSchedule
}

/** An active notice as sent to the page */
export interface Notice {
  /** id plus a hash of the content, so editing a notice brings it back for visitors who dismissed the old one */
  key: string
  message: string
  icon?: NoticeConfig['icon']
  link?: NoticeConfig['link']
}

export const DISMISSED_COOKIE = 'husky_dismissed_notices'
const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60

/** Reads the dismissed notice keys out of a Cookie header (or `document.cookie`). */
export function parseDismissed(cookieHeader: string | null | undefined): Set<string> {
  const entry = cookieHeader
    ?.split(';')
    .map(part => part.trim())
    .find(part => part.startsWith(`${ DISMISSED_COOKIE }=`))
  const value = entry?.slice(DISMISSED_COOKIE.length + 1) ?? ''
  return new Set(value.split('.').filter(Boolean))
}

/** Browser only: remembers that these notices were dismissed, alongside any dismissed earlier. */
export function saveDismissed(keys: string[]) {
  const all = parseDismissed(document.cookie)
  keys.forEach(key => all.add(key))
  document.cookie = `${ DISMISSED_COOKIE }=${ [ ...all ].join('.') }; Path=/; Max-Age=${ ONE_YEAR_SECONDS }; SameSite=Lax`
}
