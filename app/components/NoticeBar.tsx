import { useState } from 'react'
import { Link } from 'react-router'
import { Snowflake, X } from 'lucide-react'
import { type Notice, saveDismissed } from '~/utils/notices'


/**
 * Slim announcement bar at the top of the fixed header. Folds away once the page scrolls
 * (the same moment the navbar turns solid) so it never sits over the content being read.
 * Dismissing hides every notice currently shown; the server leaves them out on later visits.
 */
export default function NoticeBar({ notices, collapsed }: { notices: Notice[], collapsed: boolean }) {

  const [ shown, setShown ] = useState(notices)

  if (shown.length === 0) return null

  const dismiss = () => {
    saveDismissed(shown.map(notice => notice.key))
    setShown([])
  }

  return (
    <div
      inert={ collapsed }
      className={ `grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${ collapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]' }` }
    >
      <div className="overflow-hidden">
        <aside aria-label="Announcements" className="text-sm text-white bg-band">
          <div className="flex items-center gap-3 max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-10">
            <ul className="flex flex-col flex-1 gap-1 md:flex-row md:justify-center md:gap-0">
              { shown.map((notice, i) => (
                <li
                  key={ notice.key }
                  className={ `flex items-center gap-2 ${ i > 0 ? 'md:ml-4 md:pl-4 md:border-l md:border-white/30' : '' }` }
                >
                  { notice.icon === 'snowflake' && (
                    <Snowflake aria-hidden="true" className="w-4 h-4 shrink-0 text-aquifer-ink"/>
                  ) }
                  <span className="font-medium">
                    { notice.message }
                    { notice.link && (
                      <>
                        { ' ' }
                        <Link
                          to={ notice.link.href }
                          className="font-semibold underline underline-offset-2 decoration-white/50 hover:decoration-white"
                        >
                          { notice.link.label }
                        </Link>
                      </>
                    ) }
                  </span>
                </li>
              )) }
            </ul>
            <button
              type="button"
              onClick={ dismiss }
              className="inline-flex items-center justify-center w-8 h-8 -my-1 shrink-0 rounded-sm hover:bg-white/10 hover:cursor-pointer"
            >
              <span className="sr-only">{ shown.length > 1 ? 'Dismiss announcements' : 'Dismiss announcement' }</span>
              <X aria-hidden="true" className="w-4 h-4"/>
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
