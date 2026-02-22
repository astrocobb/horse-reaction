const images = [
  { src: '/assets/images/sunset-rig1.jpeg', alt: 'Drilling while the sun sets...' },
  { src: '/assets/images/corrales.jpeg', alt: 'Drilling in Corrales' },
  { src: '/assets/images/el-cerro.jpeg', alt: 'Setting up the Autocar Constructor in El Cerro...' },
  { src: '/assets/images/el-cerro1.jpeg', alt: 'Autocar Constructor stuck at a job due to bad starter...' },
  { src: '/assets/images/contreras.jpeg', alt: 'El hefe talking to Jason...' },
  { src: '/assets/images/sunset-rig.jpeg', alt: 'Finishing the job...' }
]

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="px-4 pt-32 pb-11 transition-colors duration-300 scroll-mt-0 sm:px-6 sm:pt-32 sm:pb-12 md:px-8 md:pt-28 md:pb-13 lg:px-10 lg:pt-32 lg:pb-14"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="mb-3 text-2xl font-bold text-left text-base-content sm:mb-5 md:text-3xl md:mb-7 lg:text-4xl lg:mb-9">
          Gallery
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
          { images.map(img => (
            <div
              key={ img.src }
              className="group relative h-72 overflow-hidden border border-base-600 rounded-md shadow-lg"
            >
              <img
                src={ img.src }
                alt={ img.alt }
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )) }
        </div>
      </div>
    </section>
  )
}
