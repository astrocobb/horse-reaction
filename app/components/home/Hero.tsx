import { Phone } from 'lucide-react'
import { huskyPhone } from '~/data/husky-data'


export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-white">
      <img
        src="/assets/images/hero.jpeg"
        alt="Husky drilling rig with its mast raised at sunset, on a job site in central New Mexico"
        className="absolute inset-0 w-full h-full object-cover object-[78%_center] sm:object-center"
        fetchPriority="high"
      />
      {/* Darkens the lower left so the headline reads against the trees and ground */ }
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgb(23_35_59/0.88)_0%,rgb(23_35_59/0.4)_35%,rgb(23_35_59/0)_60%),linear-gradient(to_right,rgb(23_35_59/0.4),rgb(23_35_59/0)_55%)]"
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 pt-32 pb-14 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
        <h1 className="max-w-[12ch] font-display text-[clamp(3.25rem,2rem+6vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.02em]">
          Water when you need it.
        </h1>
        <p className="max-w-xl mt-6 text-lg leading-relaxed text-white/90 sm:text-xl">
          Husky Well & Pump Service drills water wells and installs and repairs pumps across central New Mexico.
          Family-run in the Rio Grande valley since 1989.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <a
            href={ huskyPhone.href }
            className="inline-flex items-center gap-2 h-12 px-6 text-lg font-semibold tabular bg-livery rounded-sm transition-colors hover:bg-livery-dark"
          >
            <Phone aria-hidden="true" className="w-5 h-5"/>
            Call { huskyPhone.display }
          </a>
          <a
            href="#contact"
            className="inline-flex items-center h-12 px-6 text-lg font-semibold border-2 border-white/80 rounded-sm transition-colors hover:bg-white hover:text-ink"
          >
            Request a quote
          </a>
        </div>
      </div>
    </section>
  )
}
