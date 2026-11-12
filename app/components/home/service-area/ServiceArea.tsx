import { ServiceMap } from '~/components/home/service-area/ServiceMap'
import { APIProvider } from '@vis.gl/react-google-maps'
import { ClientOnly } from '~/components/ClientOnly'
import { servedCommunities } from '~/data/husky-data'

interface ServiceAreaProps {
  mapsApiKey: string
  mapId: string
}

export function ServiceArea({ mapsApiKey, mapId }: Readonly<ServiceAreaProps>) {
  return (
    <section
      id="service-area"
      aria-labelledby="service-area-title"
      className="px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32"
    >
      <div className="grid max-w-7xl gap-10 mx-auto lg:grid-cols-12 lg:gap-12">

        <div className="lg:col-span-4">
          <h2 id="service-area-title" className="section-title">Service area</h2>
          <p className="max-w-md mt-5 text-ink-soft">
            Most of our work is in the shaded area along the Rio Grande valley, from Albuquerque south through Los Lunas and Belen. We also serve:
          </p>
          <ul className="grid grid-cols-2 max-w-sm mt-6 border-t border-ink/25">
            { servedCommunities.map(town => (
              <li key={ town } className="py-2.5 font-display text-xl font-semibold border-b border-ink/25">
                { town }
              </li>
            )) }
          </ul>
          <p className="max-w-md mt-6 text-ink-soft">
            Not on the map or the list? <a href="#contact" className="font-semibold text-ink underline underline-offset-4 decoration-2 hover:text-livery">Ask us anyway</a>.
          </p>
        </div>

        <div className="h-[28rem] overflow-hidden bg-paper border-2 border-ink sm:h-[34rem] lg:col-span-8 lg:h-auto lg:min-h-[36rem]">
          <ClientOnly>
            <APIProvider apiKey={ mapsApiKey } version="beta">
              <ServiceMap mapId={ mapId }/>
            </APIProvider>
          </ClientOnly>
        </div>

      </div>
    </section>
  )
}
