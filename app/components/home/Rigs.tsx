import { galleryImage } from '~/data/gallery'
import { rigs, type Rig } from '~/data/rigs'

/*
  "Our rigs": each rig as a shop ticket, with its status, what was done, and a photo when there is one.
  The point for customers: the rig that shows up has been rebuilt, not patched.
*/

const statusLabel: Record<Rig['status'], string> = {
  'rebuilt': 'Rebuilt',
  'in-shop': 'In the shop'
}

const statusStyle: Record<Rig['status'], string> = {
  'rebuilt': 'bg-ink text-paper border-ink',
  'in-shop': 'border-dashed border-rule-strong text-ink-soft'
}

function RigPhoto({ photo }: { photo: NonNullable<Rig['photo']> }) {
  const image = galleryImage(photo.slug)
  return (
    <figure>
      {/* Frame takes the photo's own shape so portrait shots aren't cropped */ }
      <div className="overflow-hidden bg-paper-deep" style={ { aspectRatio: `${ image.width } / ${ image.height }` } }>
        <img
          src={ image.src }
          srcSet={ image.srcSet }
          sizes="(min-width: 1280px) 26rem, (min-width: 768px) 40vw, 100vw"
          alt={ photo.alt }
          width={ image.width }
          height={ image.height }
          loading="lazy"
          decoding="async"
          className="object-cover size-full"
          style={ { objectPosition: photo.focus } }
        />
      </div>
      { photo.caption && <figcaption className="pt-3 text-sm text-ink-faint">{ photo.caption }</figcaption> }
    </figure>
  )
}

export default function Rigs() {
  return (
    <section id="rigs" aria-labelledby="rigs-title" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
      <div className="grid max-w-7xl gap-10 mx-auto lg:grid-cols-12 lg:gap-12">

        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="rigs-title" className="section-title">Our rigs</h2>
            <p className="max-w-md mt-5 text-ink-soft">
              We rebuild our rigs instead of patching them, so the one that pulls onto your property is ready to drill.
            </p>
            <p className="max-w-md mt-4 text-sm text-ink-faint">
              One rig is back from the shop. The other is in now.
            </p>
          </div>
        </div>

        <ol className="border-t-2 border-rule-strong lg:col-span-8">
          { rigs.map(rig => (
            <li
              key={ rig.title }
              className={ `grid gap-6 py-8 border-b border-rule-strong sm:py-10 last:border-b-0 ${ rig.photo ? 'md:grid-cols-2 md:gap-10' : '' }` }
            >
              <div className="max-w-prose">
                <p className={ `inline-block px-2.5 py-1 text-xs font-semibold tracking-[0.08em] uppercase border ${ statusStyle[rig.status] }` }>
                  { statusLabel[rig.status] }
                </p>
                <h3 className="mt-4 font-display text-[2rem] font-bold leading-none sm:text-[2.5rem]">{ rig.title }</h3>
                <p className="mt-4">{ rig.summary }</p>

                { rig.work && (
                  <ol aria-label="Work done" className="mt-6 border-t border-rule-strong">
                    { rig.work.map((item, i) => (
                      <li key={ item } className="grid grid-cols-[2.25rem_1fr] items-baseline py-2.5 border-b border-rule-strong">
                        <span className="text-sm tabular text-ink-faint">{ String(i + 1).padStart(2, '0') }</span>
                        <span>{ item }</span>
                      </li>
                    )) }
                  </ol>
                ) }
              </div>

              { rig.photo && <RigPhoto photo={ rig.photo }/> }
            </li>
          )) }
        </ol>

      </div>
    </section>
  )
}
