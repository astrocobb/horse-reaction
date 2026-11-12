import type { CSSProperties, ReactNode } from 'react'


/*
  Services, laid out like a driller's log: a lithology column on the left with the well drawn
  through it, and each service on the row where that work happens. Fill patterns follow the
  standard lithology symbols (dots = sand, circles = gravel, dashes = clay).
*/

const tile = (svg: string) => `url("data:image/svg+xml,${ encodeURIComponent(svg) }")`

const patterns = {
  soil: { backgroundColor: '#8b6a4f', backgroundImage: tile('<svg xmlns="http://www.w3.org/2000/svg" width="14" height="10"><path d="M2 3h3M9 8h3" stroke="#5e4532" stroke-width="1.4"/></svg>') },
  sand: { backgroundColor: '#d8c39d', backgroundImage: tile('<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><circle cx="3" cy="3" r="1.1" fill="#8f7a55"/><circle cx="9" cy="9" r="1.1" fill="#8f7a55"/></svg>') },
  gravel: { backgroundColor: '#a89d8c', backgroundImage: tile('<svg xmlns="http://www.w3.org/2000/svg" width="22" height="18"><circle cx="6" cy="6" r="3.2" fill="none" stroke="#6f6656" stroke-width="1.3"/><circle cx="17" cy="14" r="2.4" fill="none" stroke="#6f6656" stroke-width="1.3"/></svg>') },
  clay: { backgroundColor: '#b0806a', backgroundImage: tile('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="10"><path d="M1 3h8M11 8h8" stroke="#7d5442" stroke-width="1.4"/></svg>') },
  wetSand: { backgroundColor: '#8fb6d4', backgroundImage: tile('<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><circle cx="3" cy="3" r="1.1" fill="#3f6f96"/><circle cx="9" cy="9" r="1.1" fill="#3f6f96"/></svg>') },
  wetGravel: { backgroundColor: '#7ea6c6', backgroundImage: tile('<svg xmlns="http://www.w3.org/2000/svg" width="22" height="18"><circle cx="6" cy="6" r="3.2" fill="none" stroke="#3f6f96" stroke-width="1.3"/><circle cx="17" cy="14" r="2.4" fill="none" stroke="#3f6f96" stroke-width="1.3"/></svg>') }
} satisfies Record<string, CSSProperties>

type Layer = { pattern: keyof typeof patterns, grow: number }

/** One horizontal slice of the well: strata bands with the casing drawn down the middle. */
function WellSlice({ layers, children }: { layers: Layer[], children?: ReactNode }) {
  return (
    <div aria-hidden="true" className="relative flex flex-col h-full">
      { layers.map((layer, i) => (
        <div key={ i } style={ { ...patterns[layer.pattern], flexGrow: layer.grow } }/>
      )) }
      { children }
    </div>
  )
}

/** Steel casing walls with the drop pipe running down the center (unless something else draws it). */
function Casing({ top = '0%', bottom = '0%', screened = false, waterFrom, pipe = true }: {
  top?: string, bottom?: string, screened?: boolean, waterFrom?: string, pipe?: boolean
}) {
  const wall = screened
    ? 'repeating-linear-gradient(to bottom, var(--color-strata-steel) 0 5px, transparent 5px 9px)'
    : 'var(--color-strata-steel)'
  return (
    <div className="absolute left-1/2 w-7 -translate-x-1/2" style={ { top, bottom } }>
      <div className="absolute inset-0 bg-paper-deep"/>
      { waterFrom && <div className="absolute inset-x-0 bottom-0 bg-aquifer/70" style={ { top: waterFrom } }/> }
      <div className="absolute inset-y-0 left-0 w-1" style={ { background: wall } }/>
      <div className="absolute inset-y-0 right-0 w-1" style={ { background: wall } }/>
      { pipe && <>
        <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-ink"/>
        {/* Pump power cable, strapped to the drop pipe and fed from the conduit at the wellhead */ }
        <div className="absolute inset-y-0 left-[9px] w-0.5 bg-strata-steel"/>
      </> }
    </div>
  )
}

/** One piece of the pump string, centered in the casing. The power cable hugs the drop pipe, then runs down the pump body. */
function PumpPart({ className = 'h-2', part, cable = 'body', style }: {
  className?: string, part: string, cable?: 'pipe' | 'body' | false, style?: CSSProperties
}) {
  return (
    <div className={ `relative flex justify-center ${ className }` }>
      <div className={ part } style={ style }/>
      { cable && <div className={ `absolute inset-y-0 w-0.5 bg-strata-steel ${ cable === 'pipe' ? 'left-[5px]' : 'left-0.5' }` }/> }
    </div>
  )
}

/** Submersible pump hung on the drop pipe: discharge head, stacked impeller stages, intake screen, seal, motor. */
function SubmersiblePump({ bottom }: { bottom: string }) {
  return (
    <div className="absolute top-0 left-1/2 flex flex-col w-5 -translate-x-1/2" style={ { bottom } }>
      <PumpPart className="grow-[18]" part="w-[3px] bg-ink" cable="pipe"/>
      <PumpPart part="w-2 rounded-t-sm bg-ink"/>
      <PumpPart
        className="grow-[22]"
        part="w-3"
        style={ { background: 'repeating-linear-gradient(to bottom, var(--color-ink) 0 4px, var(--color-ink-soft) 4px 5px)' } }
      />
      {/* Intake screen: the water shows through the slots */ }
      <PumpPart
        className="h-3"
        part="w-3"
        style={ { background: 'repeating-linear-gradient(to right, var(--color-ink) 0 2px, transparent 2px 4px)' } }
      />
      <PumpPart className="h-1.5" part="w-2 bg-ink"/>
      <PumpPart className="grow-[26]" part="w-3 rounded-b-sm bg-ink-soft" cable={ false }/>
    </div>
  )
}

const rows: {
  title: string
  where: string
  description: string
  slice: ReactNode
  tall?: boolean
}[] = [
  {
    title: 'Maintenance',
    where: 'At the wellhead and pressure tank',
    description: 'Regular maintenance keeps your well and pump system running smoothly. We check the wellhead, pressure tank, and controls so small problems don’t turn into costly repairs.',
    slice: (
      <WellSlice layers={ [] }>
        <div className="absolute inset-x-0 bottom-0 h-[38%]" style={ patterns.soil }/>
        <div className="absolute inset-x-0 bottom-[38%] h-0.5 bg-ink"/>
        <Casing top="calc(24% + 1rem)"/>
        {/* Electrical conduit: down the side of the casing, then elbows off toward the house underground */ }
        <div
          className="absolute left-0 bottom-[16%] border-r-[6px] border-b-[6px] border-strata-steel rounded-br-xl"
          style={ { top: 'calc(24% + 1rem)', right: 'calc(50% + 18px)' } }
        />
        {/* Well cap, wide enough to cover the conduit entry */ }
        <div
          className="absolute top-[24%] w-12 h-4 rounded-t-sm border-t-2 border-strata-steel bg-ink-soft"
          style={ { left: 'calc(50% - 28px)' } }
        />
      </WellSlice>
    )
  },
  {
    title: 'Drilling',
    where: 'Through the sand, gravel, and clay',
    description: 'We drill water wells for homes, farms, ranches, and businesses, using tried and true methods to put in an efficient, reliable well that lasts.',
    tall: true,
    slice: (
      <WellSlice layers={ [ { pattern: 'sand', grow: 3 }, { pattern: 'gravel', grow: 2 }, { pattern: 'clay', grow: 4 } ] }>
        <Casing/>
      </WellSlice>
    )
  },
  {
    title: 'Well service',
    where: 'At the screen and water table',
    description: 'Low pressure, sand in your water, or no water at all? We diagnose the problem and get your supply back with as little downtime as possible, including emergencies.',
    slice: (
      <WellSlice layers={ [ { pattern: 'clay', grow: 1 }, { pattern: 'wetSand', grow: 4 } ] }>
        {/* Water table: dashed line with the standard inverted-triangle symbol */ }
        <div className="absolute inset-x-0 top-[20%] border-t-2 border-dashed border-aquifer-deep"/>
        <svg className="absolute top-[20%] right-2 -translate-y-full" width="14" height="10" viewBox="0 0 14 10">
          <path d="M0 0h14L7 10z" fill="#0f2d4a"/>
        </svg>
        <Casing screened waterFrom="20%"/>
      </WellSlice>
    )
  },
  {
    title: 'Pump installation',
    where: 'Below the water level',
    description: 'We install submersible and surface pumps, help you choose the right system for how much water you use, and set it up properly the first time.',
    slice: (
      <WellSlice layers={ [ { pattern: 'wetSand', grow: 2 }, { pattern: 'wetGravel', grow: 3 } ] }>
        <Casing screened waterFrom="0%" bottom="14%" pipe={ false }/>
        <SubmersiblePump bottom="24%"/>
        {/* End cap */ }
        <div className="absolute bottom-[14%] left-1/2 w-7 h-1.5 -translate-x-1/2 bg-strata-steel"/>
      </WellSlice>
    )
  }
]

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
      <div className="grid max-w-7xl gap-10 mx-auto lg:grid-cols-12 lg:gap-12">

        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="services-title" className="section-title">Services</h2>
            <p className="max-w-md mt-5 text-ink-soft">
              Everything from drilling the hole to setting the pump that brings water up. The diagram shows where in
              your well each job happens.
            </p>
            <p className="max-w-md mt-4 text-sm text-ink-faint">
              Diagram not to scale. Every property is different, and we’ll tell you what to expect for yours.
            </p>
          </div>
        </div>

        <ol className="border-t-2 border-ink lg:col-span-8">
          { rows.map(row => (
            <li
              key={ row.title }
              className={ `grid grid-cols-[4.5rem_1fr] sm:grid-cols-[8rem_1fr] xl:grid-cols-[11rem_1fr] ${ row.tall ? 'min-h-72 sm:min-h-80' : 'min-h-56 sm:min-h-60' }` }
            >
              <div className="border-r-2 border-ink">{ row.slice }</div>
              <div className="py-6 pl-5 sm:py-8 sm:pl-10">
                <h3 className="font-display text-[2rem] font-bold leading-none sm:text-[2.5rem]">{ row.title }</h3>
                <p className="mt-2 text-sm font-medium italic text-ink-soft sm:text-base">{ row.where }</p>
                <p className="max-w-prose mt-4">{ row.description }</p>
              </div>
            </li>
          )) }
        </ol>

      </div>
    </section>
  )
}
