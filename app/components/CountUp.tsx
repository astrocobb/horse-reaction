import { useEffect, useLayoutEffect, useRef, useState } from 'react'


const DURATION_MS = 2000

export function format(n: number) {
  return n.toLocaleString('en-US')
}

/** Counts from 0 up to `value` the first time it scrolls into view. Renders the final value on the server. */
export function CountUp({ value }: { value: number }) {
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
