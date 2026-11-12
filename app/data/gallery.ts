import manifest from './gallery-manifest.json'

/*
  Photos for the "On the job" rail. Image files and sizes come from `npm run photos`
  (see scripts/optimize-photos.mjs); this list decides which photos show, in what order, and what they say.

  The rail lines every photo up on one shared ground line, so each entry says where the ground is:
  - ground: how far down the photo (0 = top, 1 = bottom) the rig's wheels meet the dirt.
  - focusX: how far across the photo (0 = left, 1 = right) the mast stands. The frame centers on it.
  Rough values are fine; the rail clamps so a frame never shows an empty edge.

  Order runs from clear midday sky through to dusk, so the rail reads like one long day.
*/
export type GalleryPhoto = {
  slug: keyof typeof manifest
  caption: string
  /** Town or area, when known */
  place?: string
  alt: string
  ground: number
  focusX: number
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    slug: 'el-cerro',
    caption: 'Setting up the Autocar Constructor',
    place: 'El Cerro',
    alt: 'Autocar Constructor rig with its mast up beside a stack of well casing',
    ground: 0.7,
    focusX: 0.4
  },
  {
    slug: 'el-cerro1',
    caption: 'The Autocar, stuck on a job with a bad starter',
    place: 'El Cerro',
    alt: 'Black Autocar drilling rig with HUSKY on the mast, parked on a dirt lot',
    ground: 0.88,
    focusX: 0.3
  },
  {
    slug: 'contreras',
    caption: 'El jefe talking with Jason',
    place: 'Contreras',
    alt: 'Husky crew working at the rig beside the company water truck',
    ground: 0.89,
    focusX: 0.66
  },
  {
    slug: 'corrales',
    caption: 'Drilling under storm clouds',
    place: 'Corrales',
    alt: 'Drilling rig under heavy clouds, with red mud running from the pit past the water truck',
    ground: 0.83,
    focusX: 0.46
  },
  {
    slug: 'sunset-rig',
    caption: 'Finishing the job',
    alt: 'Drilling rig and water truck at dusk, with the crew at the mud pit',
    ground: 0.895,
    focusX: 0.55
  },
  {
    slug: 'sunset-rig1',
    caption: 'Drilling while the sun sets',
    alt: 'Drilling rig alone in a plowed field under a pink and blue evening sky',
    ground: 0.73,
    focusX: 0.43
  }
]

export const galleryImage = (slug: GalleryPhoto['slug']) => {
  const { width, height, widths } = manifest[slug]
  return {
    width,
    height,
    src: `/assets/gallery/${ slug }-${ widths[Math.min(1, widths.length - 1)] }.webp`,
    srcSet: widths.map(w => `/assets/gallery/${ slug }-${ w }.webp ${ w }w`).join(', ')
  }
}
