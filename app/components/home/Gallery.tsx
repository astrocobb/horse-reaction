const photos = [
  {
    src: '/assets/images/contreras.jpeg',
    alt: 'Husky crew working at the rig beside the company water truck',
    caption: 'El jefe talking with Jason',
    layout: 'lg:col-span-7 lg:h-[34rem]'
  },
  {
    src: '/assets/images/corrales.jpeg',
    alt: 'Drilling rig set up on a job in Corrales',
    caption: 'Drilling in Corrales',
    layout: 'lg:col-span-5 lg:h-[34rem]'
  },
  {
    src: '/assets/images/el-cerro.jpeg',
    alt: 'Autocar Constructor rig with its mast up beside a stack of well casing in El Cerro',
    caption: 'Setting up the Autocar Constructor in El Cerro',
    layout: 'lg:col-span-4 lg:h-[26rem]'
  },
  {
    src: '/assets/images/el-cerro1.jpeg',
    alt: 'Autocar Constructor rig parked at a job site',
    caption: 'The Autocar, stuck on a job with a bad starter',
    layout: 'lg:col-span-4 lg:h-[26rem]'
  },
  {
    src: '/assets/images/sunset-rig.jpeg',
    alt: 'Drilling rig at the end of a job',
    caption: 'Finishing the job',
    layout: 'lg:col-span-4 lg:h-[26rem]'
  },
  {
    src: '/assets/images/sunset-rig1.jpeg',
    alt: 'Drilling rig working at sunset',
    caption: 'Drilling while the sun sets',
    layout: 'lg:col-span-12 lg:h-[30rem]'
  }
]

export default function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <h2 id="gallery-title" className="section-title">On the job</h2>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 mt-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-10">
          { photos.map(photo => (
            <figure key={ photo.src } className={ `flex flex-col ${ photo.layout } ${ photo.layout.includes('col-span-12') ? 'sm:col-span-2' : '' }` }>
              <img
                src={ photo.src }
                alt={ photo.alt }
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] min-h-0 grow object-cover bg-paper-deep lg:aspect-auto"
              />
              <figcaption className="pt-2.5 text-sm text-ink-soft">{ photo.caption }</figcaption>
            </figure>
          )) }
        </div>
      </div>
    </section>
  )
}
