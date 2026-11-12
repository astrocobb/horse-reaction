import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { galleryImage, galleryPhotos, type GalleryPhoto } from '~/data/gallery'

/*
  "On the job": a row of tall frames, one per photo, each cropped so the rig's wheels sit on the same
  ground line. The masts rise above that shared ground like rigs parked side by side. Each frame opens
  the photo uncropped in a full-screen viewer.
*/

/** Frame width / height */
const FRAME_RATIO = 3 / 5
/** Where the shared ground line sits in every frame, from the top */
const GROUND = 0.9
/** Widest a frame gets, in CSS px (frame height tops out at 34rem) */
const MAX_FRAME_WIDTH = 34 * 16 * FRAME_RATIO

/**
 * Sizes and positions a photo inside its frame (as % of the frame) so its ground lands on GROUND
 * and its mast is centered, scaling up only as far as needed to leave no empty edge.
 */
function placement(photo: GalleryPhoto, aspect: number) {
  let height = Math.max(GROUND / photo.ground, (1 - GROUND) / (1 - photo.ground))
  let width = height * aspect / FRAME_RATIO
  if (width < 1) {
    height /= width
    width = 1
  }
  const clamp = (value: number, min: number) => Math.min(0, Math.max(min, value))
  const top = clamp(GROUND - photo.ground * height, 1 - height)
  const left = clamp(0.5 - photo.focusX * width, 1 - width)
  const style: CSSProperties = {
    width: `${ width * 100 }%`,
    height: `${ height * 100 }%`,
    top: `${ top * 100 }%`,
    left: `${ left * 100 }%`
  }
  return { style, sizes: `${ Math.ceil(width * MAX_FRAME_WIDTH) }px` }
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Lines the rail's first frame up with the page content (max-w-7xl inside the section padding) */
const railInset = 'px-[max(1rem,calc((100%-80rem)/2))] sm:px-[max(1.5rem,calc((100%-80rem)/2))] lg:px-[max(2.5rem,calc((100%-80rem)/2))]'
const railSnapInset = 'scroll-px-[max(1rem,calc((100%-80rem)/2))] sm:scroll-px-[max(1.5rem,calc((100%-80rem)/2))] lg:scroll-px-[max(2.5rem,calc((100%-80rem)/2))]'

const roundButton = 'grid size-11 place-items-center rounded-full border border-rule-strong text-ink transition-colors hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-35'

export default function Gallery() {
  const railRef = useRef<HTMLDivElement>(null)
  const [ edges, setEdges ] = useState({ start: true, end: false, overflow: true })
  const [ open, setOpen ] = useState<number | null>(null)

  const updateEdges = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const max = rail.scrollWidth - rail.clientWidth
    setEdges({ start: rail.scrollLeft <= 4, end: rail.scrollLeft >= max - 4, overflow: max > 4 })
  }, [])

  useEffect(() => {
    updateEdges()
    window.addEventListener('resize', updateEdges)
    return () => window.removeEventListener('resize', updateEdges)
  }, [ updateEdges ])

  const scrollRail = (direction: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: direction * rail.clientWidth * 0.75, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-20 sm:py-24 lg:py-32">
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6 mx-auto max-w-7xl">
          <h2 id="gallery-title" className="section-title">On the job</h2>
          { edges.overflow && (
            <div className="flex gap-2">
              <button type="button" className={ roundButton } onClick={ () => scrollRail(-1) } disabled={ edges.start } aria-label="Scroll photos back">
                <ChevronLeft className="size-5" aria-hidden="true"/>
              </button>
              <button type="button" className={ roundButton } onClick={ () => scrollRail(1) } disabled={ edges.end } aria-label="Scroll photos forward">
                <ChevronRight className="size-5" aria-hidden="true"/>
              </button>
            </div>
          ) }
        </div>
      </div>

      <div
        ref={ railRef }
        onScroll={ updateEdges }
        className={ `mt-10 overflow-x-auto snap-x snap-mandatory overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${ railSnapInset }` }
      >
        <ul className={ `flex w-max gap-1 ${ railInset }` }>
          { galleryPhotos.map((photo, i) => {
            const image = galleryImage(photo.slug)
            const { style, sizes } = placement(photo, image.width / image.height)
            return (
              <li key={ photo.slug } className="snap-start">
                <figure className="w-[calc(clamp(20rem,62svh,34rem)*0.6)]">
                  <button
                    type="button"
                    onClick={ () => setOpen(i) }
                    aria-label={ `View full photo: ${ photo.caption }` }
                    className="relative block w-full overflow-hidden aspect-[3/5] bg-paper-deep cursor-zoom-in focus-visible:outline-offset-[-3px] focus-visible:rounded-none"
                  >
                    <img
                      src={ image.src }
                      srcSet={ image.srcSet }
                      sizes={ sizes }
                      alt={ photo.alt }
                      width={ image.width }
                      height={ image.height }
                      loading={ i < 3 ? 'eager' : 'lazy' }
                      decoding="async"
                      draggable={ false }
                      className="absolute max-w-none"
                      style={ style }
                    />
                  </button>
                  <figcaption className="pt-3 pr-4 text-sm leading-snug">
                    <span className="block text-ink">{ photo.caption }</span>
                    { photo.place && <span className="block mt-0.5 text-ink-faint">{ photo.place }</span> }
                  </figcaption>
                </figure>
              </li>
            )
          }) }
        </ul>
      </div>

      <PhotoViewer index={ open } onChange={ setOpen }/>
    </section>
  )
}

/** Full-screen view of one photo, uncropped, with previous / next. Native <dialog> handles focus and Escape. */
function PhotoViewer({ index, onChange }: { index: number | null, onChange: (index: number | null) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const count = galleryPhotos.length

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (index !== null && !dialog.open) dialog.showModal()
    if (index === null && dialog.open) dialog.close()
  }, [ index ])

  const step = (direction: 1 | -1) => {
    if (index !== null) onChange((index + direction + count) % count)
  }

  const photo = index !== null ? galleryPhotos[index] : null
  const image = photo ? galleryImage(photo.slug) : null

  return (
    <dialog
      ref={ dialogRef }
      aria-label="Photo viewer"
      onClose={ () => onChange(null) }
      onKeyDown={ event => {
        if (event.key === 'ArrowLeft') step(-1)
        if (event.key === 'ArrowRight') step(1)
      } }
      onClick={ event => {
        // Clicks on the dark surround (not the photo or controls) close the viewer
        if (event.target === event.currentTarget || (event.target as HTMLElement).dataset.surround) onChange(null)
      } }
      className="photo-viewer fixed inset-0 m-0 size-full max-h-none max-w-none bg-transparent p-0 text-white backdrop:bg-band/95"
    >
      { photo && image && (
        <div data-surround className="grid h-full grid-rows-[auto_1fr_auto] gap-3 p-3 sm:p-6">
          <div data-surround className="flex items-center justify-between">
            <p className="text-sm tabular text-white/70">{ index! + 1 } of { count }</p>
            <button type="button" onClick={ () => onChange(null) } aria-label="Close photo viewer" className="grid text-white rounded-full size-11 place-items-center hover:bg-white/10">
              <X className="size-6" aria-hidden="true"/>
            </button>
          </div>

          <div data-surround className="relative min-h-0">
            <img
              key={ photo.slug }
              src={ image.src }
              srcSet={ image.srcSet }
              sizes="100vw"
              alt={ photo.alt }
              width={ image.width }
              height={ image.height }
              className="absolute inset-0 object-contain size-full"
            />
            <button type="button" onClick={ () => step(-1) } aria-label="Previous photo" className="absolute left-0 grid -translate-y-1/2 rounded-full top-1/2 size-12 place-items-center bg-black/45 hover:bg-black/70">
              <ChevronLeft className="size-6" aria-hidden="true"/>
            </button>
            <button type="button" onClick={ () => step(1) } aria-label="Next photo" className="absolute right-0 grid -translate-y-1/2 rounded-full top-1/2 size-12 place-items-center bg-black/45 hover:bg-black/70">
              <ChevronRight className="size-6" aria-hidden="true"/>
            </button>
          </div>

          <p data-surround className="max-w-prose mx-auto text-center">
            { photo.caption }
            { photo.place && <span className="text-white/60">, { photo.place }</span> }
          </p>
        </div>
      ) }
    </dialog>
  )
}
