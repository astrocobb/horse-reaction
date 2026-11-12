import { Clock4, Mail, Phone } from 'lucide-react'
import { APIProvider } from '@vis.gl/react-google-maps'
import HuskyMap from '~/components/home/contact/HuskyMap'
import { ContactForm } from '~/components/home/contact/ContactForm'
import { HuskyDetails } from '~/components/home/contact/HuskyDetails'
import { ClientOnly } from '~/components/ClientOnly'
import { huskyEmail, huskyHours, huskyPhone } from '~/data/husky-data'

interface ContactProps {
  mapsApiKey: string
  mapId: string
  turnstileSiteKey: string
}

// Contact
export default function Contact({ mapsApiKey, mapId, turnstileSiteKey }: Readonly<ContactProps>) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32"
    >
      <div className="grid max-w-7xl gap-12 mx-auto lg:grid-cols-12">

        <div className="lg:col-span-5 lg:flex lg:flex-col">
          <h2 id="contact-title" className="section-title">Contact us</h2>
          <p className="max-w-md mt-5 text-ink-soft">
            Call us, or send a request with a few details about your property and we’ll get back to you.
          </p>

          <a
            href={ huskyPhone.href }
            className="group inline-flex items-center gap-3 mt-10 font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] font-bold leading-none tabular hover:text-aquifer"
          >
            <Phone aria-hidden="true" className="w-[0.7em] h-[0.7em]"/>
            { huskyPhone.display }
          </a>

          <ul className="mt-6 space-y-3 text-ink-soft">
            <li>
              <a href={ `mailto:${ huskyEmail }` } className="inline-flex items-center gap-3 underline-offset-4 hover:text-ink hover:underline">
                <Mail aria-hidden="true" className="w-5 h-5 shrink-0"/>
                { huskyEmail }
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock4 aria-hidden="true" className="w-5 h-5 shrink-0"/>
              { huskyHours }
            </li>
          </ul>

          <ClientOnly>
            <APIProvider apiKey={ mapsApiKey } version="beta">
              <div className="pt-6 mt-6 border-t border-rule">
                <HuskyDetails/>
              </div>
              <div className="h-64 mt-8 overflow-hidden border-2 border-rule-strong rounded-sm sm:h-72 lg:h-auto lg:min-h-72 lg:flex-1">
                <HuskyMap mapId={ mapId }/>
              </div>
            </APIProvider>
          </ClientOnly>
        </div>

        <div className="p-6 text-ink bg-paper border-2 border-rule-strong rounded-sm sm:p-10 lg:col-span-7">
          <h3 className="font-display text-[2rem] font-bold leading-none">Request a quote</h3>
          <p className="mt-2 mb-6 text-ink-soft">
            Tell us what you need: a new well, a pump, or a repair. Include your town so we know where you are.
          </p>
          <ContactForm turnstileSiteKey={ turnstileSiteKey }/>
        </div>

      </div>
    </section>
  )
}
