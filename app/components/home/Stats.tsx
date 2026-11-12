import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Droplets, Milestone, Ruler } from 'lucide-react'
import type { DrillingStats } from '~/utils/server/drilling-stats.server'


const DURATION_MS = 2000

function format(n: number) {
  return n.toLocaleString('en-US')
}

/** Counts from 0 up to `value` the first time it scrolls into view. Renders the final value on the server. */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [ display, setDisplay ] = useState(value)

  // Before the first paint after hydration, drop to 0 so there's something to count up from
  useLayoutEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setDisplay(0)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(([ entry ]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION_MS, 1)
        const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
        setDisplay(Math.round(value * eased))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.5 })

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [ value ])

  return <span ref={ ref }>{ format(display) }</span>
}

export default function Stats({ stats }: { stats: DrillingStats }) {
  const items = [
    { icon: Ruler, value: stats.feet, label: 'Feet Drilled' },
    { icon: Milestone, value: stats.miles, label: 'Miles Drilled' },
    { icon: Droplets, value: stats.wells, label: 'Wells Drilled' }
  ]

  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="px-4 pt-16 pb-4 sm:px-6 md:px-8 lg:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="stats-heading"
          className="mb-3 text-2xl font-bold text-left text-base-content md:text-3xl md:mb-7 lg:text-4xl lg:mb-9">
          By the Numbers
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 md:gap-8 lg:gap-10">
          { items.map(item => (
            <li
              key={ item.label }
              className="flex flex-col items-center p-5 text-center bg-base-800/50 border border-base-600/50 rounded-md shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 sm:p-6 md:p-8 lg:p-10"
            >
              <item.icon aria-hidden="true" className="w-12 h-12 mb-4 text-secondary"/>
              {/* Screen readers get the final number once, instead of every animation frame */ }
              <span className="sr-only">{ format(item.value) } { item.label.toLowerCase() }</span>
              <span
                aria-hidden="true"
                className="mb-1 text-3xl font-bold tabular-nums text-base-50 md:text-4xl lg:text-5xl"
              >
                <CountUp value={ item.value }/>
              </span>
              <span aria-hidden="true" className="text-base-300 md:text-lg">
                { item.label }
              </span>
            </li>
          )) }
        </ul>
      </div>
    </section>
  )
}
