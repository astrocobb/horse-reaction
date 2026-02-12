export default function Hero() {
  return (
    <section
    id="home"
    className="relative flex h-screen items-center justify-center overflow-hidden pt-16 text-center text-dark-base-content sm:pt-0"
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <img
        src="/assets/images/hero.jpeg"
        alt="Sunset drilling baby!"
        className="w-full h-full object-cover object-right sm:object-center"
        />
      </div>
      <div
      className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-base-50 via-base-50/50 to-transparent dark:from-base-750 dark:via-base-750/50"/>
      <div className="z-10 max-w-4xl px-4 mx-auto">
        <h1 className="mb-4 text-3xl font-bold text-dark-base-content drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
          Husky Well & Pump Service
        </h1>
        <p className="mb-6 text-lg text-dark-base-content drop-shadow-md md:text-xl md:mb-8 lg:text-2xl">
          Water when you need it!
        </p>
        <a
        href="#contact"
        className="inline-block px-6 pt-2 pb-2.5 font-semibold border-2 border-base-50/50 text-base-50 rounded-md backdrop-blur-md shadow-md transition hover:bg-base-50/20 hover:border-base-50/70 focus:bg-base-50/30 focus:border-base-50/70"
        >
          Get a Free Quote
        </a>
      </div>
    </section>
  )
}
