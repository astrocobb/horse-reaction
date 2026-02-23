import HuskyMap from '~/components/home/contact/HuskyMap'
import { ContactForm } from '~/components/home/contact/ContactForm'
import { HuskyDetails } from '~/components/home/contact/HuskyDetails'
import { APIProvider } from '@vis.gl/react-google-maps'
import { ClientOnly } from '~/components/ClientOnly'

interface ContactProps {
  turnstileSiteKey: string
}

// Contact Section
export default function Contact({ turnstileSiteKey }: ContactProps) {
  return (
    <section
      id="contact"
      className="px-4 pt-32 pb-11 transition-colors duration-300 scroll-mt-0 sm:px-6 sm:pt-32 sm:pb-12 md:px-8 md:pt-28 md:pb-13 lg:px-10 lg:pt-32 lg:pb-14"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="mb-1 text-2xl font-bold text-left text-base-content sm:mb-5 md:text-3xl md:mb-4 lg:text-4xl lg:mb-6">
          Contact Us
        </h2>
        <h3 className="mb-3 text-left text-base-300 sm:mb-5 md:mb-6 lg:mb-7">
          Please enter your information below, and we will get back to you as soon as possible.
        </h3>
        <ClientOnly>
          <APIProvider apiKey={ import.meta.env.VITE_MAPS_API_KEY } version="beta">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
              <ContactForm turnstileSiteKey={turnstileSiteKey}/>
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                <div className="grow w-full h-72 overflow-hidden border border-base-700 rounded-md shadow-lg lg:h-80">
                  <HuskyMap/>
                </div>
                <div className="p-5 bg-base-800/50 border border-base-700 rounded-md shadow-lg sm:p-6 md:p-8 lg:p-10">
                  <HuskyDetails/>
                </div>
              </div>
            </div>
          </APIProvider>
        </ClientOnly>
      </div>
    </section>
  )
}
