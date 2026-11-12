import { notices } from '~/data/husky-data'
import { type Notice, type NoticeConfig, type NoticeSchedule, parseDismissed } from '~/utils/notices'


// Husky is in central New Mexico; "October 1" means October 1 there, whatever the server's clock says
const TIME_ZONE = 'America/Denver'

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/** Today's date in Mountain time as YYYY-MM-DD (en-CA formats dates that way). */
function localToday(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(now)
}

/** Dates are compared as strings: YYYY-MM-DD and MM-DD both sort correctly that way. */
function isScheduled(schedule: NoticeSchedule, today: string): boolean {
  if (schedule.type === 'always') {
    return (!schedule.from || today >= schedule.from) && (!schedule.until || today <= schedule.until)
  }
  const monthDay = today.slice(5)
  const { from, to } = schedule
  return from <= to
    ? monthDay >= from && monthDay <= to
    : monthDay >= from || monthDay <= to // window wraps past New Year
}

/** Short, stable hash (djb2) so the key changes whenever the notice's wording or link does. */
function contentHash(notice: NoticeConfig): string {
  const text = `${ notice.message }|${ notice.link?.href ?? '' }|${ notice.link?.label ?? '' }`
  let hash = 5381
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 33) ^ text.charCodeAt(i)
  }
  return (hash >>> 0).toString(36)
}

/**
 * Notices to show on this request: scheduled for today and not dismissed by this visitor.
 * In development, `?noticeDate=YYYY-MM-DD` pretends it's that day, to check the seasonal windows.
 */
export function getActiveNotices(request: Request): Notice[] {
  const override = import.meta.env.DEV ? new URL(request.url).searchParams.get('noticeDate') : null
  const today = override && ISO_DATE.test(override) ? override : localToday(new Date())
  const dismissed = parseDismissed(request.headers.get('Cookie'))

  return notices
    .filter(notice => isScheduled(notice.show, today))
    .map(notice => ({
      key: `${ notice.id }-${ contentHash(notice) }`,
      message: notice.message,
      icon: notice.icon,
      link: notice.link
    }))
    .filter(notice => !dismissed.has(notice.key))
}
