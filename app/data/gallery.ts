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
  },
  {
    slug: 'img-4191',
    caption: 'The Sterling rig with its mast up in the yard',
    alt: 'White Sterling drilling rig with its gray mast raised, a crew member standing beside it on a dirt lot',
    ground: 0.8,
    focusX: 0.16
  },
  {
    slug: 'img-4253',
    caption: 'Mast down and ready to roll',
    alt: 'White Sterling drilling rig with the HUSKY mast lowered for travel, parked beside the shop under a clear blue sky',
    ground: 0.67,
    focusX: 0.55
  },
  {
    slug: 'img-4555-heic',
    caption: 'Jason and Treg in front of the rebuilt rig',
    alt: 'Jason and Treg shaking hands in front of the new rig in a grassy field under storm clouds',
    ground: 0.53,
    focusX: 0.35
  },
  {
    slug: 'img-4567-heic',
    caption: 'Last light on the mast',
    alt: 'Husky drilling rig with its mast lit gold by the evening sun',
    ground: 0.86,
    focusX: 0.18
  },
  {
    slug: 'img-4581-heic',
    caption: 'Jacked up and ready to drill',
    alt: 'Rebuilt rig on a (new to us) Sterling truck with its mast raised and leveling jacks set on wood blocks, parked among cottonwoods under a blue sky',
    ground: 0.7,
    focusX: 0.17
  },
  {
    slug: 'img-4974',
    caption: 'The crew working the rig, water truck alongside; the boss keeping them in check',
    alt: 'Husky crew and the company owner (Richard) at the base of the rig mast between a company pickup and the Husky Well & Pump Service water truck, under gray clouds',
    ground: 0.53,
    focusX: 0.49
  },
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
