import type manifest from './gallery-manifest.json'

/*
  The "Our rigs" section. Each rig lists what was done to it and where it stands.

  Photos come from the same `npm run photos` step as the gallery: put the photo in ./photos,
  run the command, then set `photo.slug` to the file name it was given (lowercase, dashes, no extension).
  A rig without a photo shows its work list on its own.

  When the Autocar comes back: set its status to 'rebuilt', list the work, and swap in the new photo.
*/
export type Rig = {
  /** Shown as the heading, e.g. "Midway 15MW on a Sterling" */
  title: string
  status: 'rebuilt' | 'in-shop'
  summary: string
  /** What was done, one line each */
  work?: string[]
  photo?: {
    slug: keyof typeof manifest
    alt: string
    caption?: string
    /** CSS object-position for the crop, e.g. '30% 60%'. Defaults to center. */
    focus?: string
  }
}

export const rigs: Rig[] = [
  {
    title: 'Midway 15MW on a Sterling',
    status: 'rebuilt',
    summary: 'Back from a full rebuild at a shop in Texas. The drill came off the old Ford 9000 and went onto a new truck.',
    work: [
      'New Sterling truck under the rig',
      'Painted top to bottom',
      'New PTO',
      'New drawworks',
      'Plenty of smaller repairs along the way'
    ],
    photo: {
      slug: 'img-4567-heic',
      alt: '',
      caption: '',
      focus: '',
    }
  },
  {
    title: 'Midway 15MW on an Autocar Constructor',
    status: 'in-shop',
    summary: 'In the shop now for the same rebuild and more. It goes back to work as soon as it’s done.',
    photo: {
      slug: 'el-cerro1',
      alt: 'Black Autocar drilling rig with HUSKY on the mast, parked on a dirt lot',
      caption: 'Before its rebuild',
      focus: '30% 50%'
    }
  }
]
