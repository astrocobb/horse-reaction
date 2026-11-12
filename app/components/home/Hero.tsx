import { Link } from 'react-router'
import { Phone } from 'lucide-react'
import { huskyPhone } from '~/data/husky-data'
import { CountUp, format } from '~/components/CountUp'
import type { DrillingStats } from '~/utils/server/drilling-stats.server'


type StatItem = { value: number, label: string }

/** One stat: screen readers get the final number once instead of every animation frame. */
function Stat({ item, className }: { item: StatItem, className: string }) {
  return (
    <li className={ `flex flex-col ${ className }` }>
      <span className="sr-only">{ format(item.value) } { item.label.toLowerCase() }</span>
      <span aria-hidden="true" className="font-display font-extrabold leading-none tracking-[-0.01em] text-[length:var(--stat-size)]">
        <CountUp value={ item.value }/>
      </span>
      <span aria-hidden="true" className="mt-1 text-xs font-semibold tracking-[var(--label-tracking,0.08em)] uppercase whitespace-nowrap text-white/80">
        { item.label }
      </span>
    </li>
  )
}

export default function Hero({ stats }: { stats: DrillingStats }) {
  const items: StatItem[] = [
    { value: stats.wells, label: 'Wells drilled' },
    { value: stats.feet, label: 'Feet of hole' },
    { value: stats.miles, label: 'Miles down' }
  ]

  return (
    // The bottom edge is masked to transparent so the photo dissolves into the page and the light pillar behind it
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-band text-white fade-bottom [--fade-length:9rem] sm:[--fade-length:12rem]"
    >
      <img
        src="/assets/images/hero.jpeg"
        alt="Husky drilling rig with its mast raised at sunset, on a job site in central New Mexico"
        className="absolute inset-0 w-full h-full object-cover object-[78%_center] sm:object-center"
        fetchPriority="high"
      />
      {/* Darkens the lower left so the headline reads against the trees and ground */ }
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-band/85 via-band/40 via-35% to-transparent to-60%"/>
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-band/40 to-transparent to-55%"/>
      {/* Darkens the sky in the upper right so the stats read; desktop only, where the stats sit there */ }
      <div aria-hidden="true" className="absolute inset-0 hidden lg:block bg-radial-[at_100%_0%] from-band/60 via-band/20 via-30% to-transparent to-55%"/>

      {/* Desktop: stacked in the open sky to the right of the mast. Only one of the two stat lists is ever displayed. */ }
      <div className="absolute inset-x-0 top-28 hidden lg:block">
        <ul aria-label="Drilling record" className="flex flex-col items-end gap-5 max-w-7xl mx-auto px-10 text-right [--stat-size:var(--text-4xl)]">
          { items.map(item => <Stat key={ item.label } item={ item } className="border-r-2 border-white/60 pr-4"/>) }
        </ul>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 pt-32 pb-32 sm:px-6 sm:pb-40 lg:px-10 lg:pb-44">
        <h1 className="max-w-[12ch] font-display text-[clamp(3.25rem,2rem+6vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.02em]">
          Water when you need it.
        </h1>
        <p className="max-w-xl mt-6 text-lg leading-relaxed text-white/90 sm:text-xl">
          Husky Well & Pump Service drills water wells and installs and repairs pumps across central New Mexico.
          Family-run in the Rio Grande valley since 1989.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-8">
          {/* The navbar watches this button and shows its own call button once this one scrolls away */ }
          <a
            href={ huskyPhone.href }
            data-hero-call
            className="inline-flex items-center gap-2 h-12 px-6 text-lg font-semibold tabular bg-livery rounded-sm transition-colors hover:bg-livery-dark"
          >
            <Phone aria-hidden="true" className="w-5 h-5"/>
            Call { huskyPhone.display }
          </a>
          <Link
            to="#contact"
            className="inline-flex items-center h-12 px-6 text-lg font-semibold border-2 border-white/80 rounded-sm transition-colors hover:bg-white hover:text-band"
          >
            Request a quote
          </Link>
        </div>

        {/* Phones and tablets: the mast fills the right side there, so the stats sit in a row under the buttons */ }
        <ul aria-label="Drilling record" className="grid grid-cols-3 max-w-md mt-10 border-t border-white/30 lg:hidden [--stat-size:var(--text-2xl)] [--label-tracking:0.03em] sm:[--stat-size:var(--text-3xl)] sm:[--label-tracking:0.08em]">
          { items.map(item => <Stat key={ item.label } item={ item } className="pt-4 pr-2"/>) }
        </ul>
      </div>
    </section>
  )
}
