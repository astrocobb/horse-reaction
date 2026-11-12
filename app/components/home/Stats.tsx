import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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

  // Reserve the final width so the sentence doesn't reflow while counting
  return (
    <span ref={ ref } className="relative inline-block tabular">
      <span className="invisible">{ format(value) }</span>
      <span className="absolute inset-0 text-right">{ format(display) }</span>
    </span>
  )
}

export default function Stats({ stats }: { stats: DrillingStats }) {
  const items = [
    { value: stats.wells, label: 'Wells drilled' },
    { value: stats.feet, label: 'Feet of hole' },
    { value: stats.miles, label: 'Miles straight down' }
  ]

  return (
    <section id="stats" aria-label="Drilling record" className="px-4 py-16 border-b border-rule sm:px-6 sm:py-20 lg:px-10">
      <ul className="grid max-w-7xl mx-auto border-t-2 border-ink divide-y divide-ink sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
        { items.map(item => (
          <li key={ item.label } className="py-6 sm:px-6 sm:py-8 sm:first:pl-0 lg:px-10">
            {/* Screen readers get the final number once, instead of every animation frame */ }
            <span className="sr-only">{ format(item.value) } { item.label.toLowerCase() }</span>
            <span aria-hidden="true" className="block font-display text-[clamp(2.5rem,1.6rem+3vw,4.25rem)] font-extrabold leading-none tracking-[-0.01em]">
              <CountUp value={ item.value }/>
            </span>
            <span aria-hidden="true" className="block mt-3 text-sm font-semibold tracking-[0.08em] uppercase text-ink-soft sm:text-base">
              { item.label }
            </span>
          </li>
        )) }
      </ul>
    </section>
  )
}
