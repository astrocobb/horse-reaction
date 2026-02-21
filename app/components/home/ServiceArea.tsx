import { ServiceMap } from '~/components/maps/ServiceMap'
import { APIProvider } from '@vis.gl/react-google-maps'
import HuskyMap from '~/components/maps/HuskyMap'


export function ServiceArea() {
  return (
    <section
      id="service-area"
      className="px-4 pt-32 pb-11 bg-base-800 transition-colors duration-300 scroll-mt-0 sm:px-6 sm:pt-32 sm:pb-12 md:px-8 md:pt-28 md:pb-13 lg:px-10 lg:pt-32 lg:pb-14"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="mb-1 text-2xl font-bold text-left text-base-content md:text-3xl md:mb-2 lg:text-4xl lg:mb-3">
          Service Area
        </h2>
        <p className="mb-3 text-md text-left text-base-150 md:mb-4 lg:mb-5">
          We proudly serve communities throughout the Rio Grande valley
        </p>
        <div className="w-full h-[64vh] overflow-hidden border border-base-700 rounded-md shadow-xl">
          <APIProvider apiKey={ import.meta.env.VITE_MAPS_API_KEY } version="beta">
            <ServiceMap/>
          </APIProvider>
        </div>
        <p className="my-3 text-sm text-left text-base-300 md:text-md">
          If your location is not within our service area, please contact us.
        </p>
      </div>
    </section>
  )
}
