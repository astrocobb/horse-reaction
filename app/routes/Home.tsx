import type { Route } from './+types/Home'
import { data } from 'react-router'
import { contactSchema } from '~/utils/models/contact.model'
import { rateLimit } from '~/utils/server/rate-limit.server'
import { verifyTurnstile } from '~/utils/server/turnstile.server'
import { getDrillingStats } from '~/utils/server/drilling-stats.server'
import { sendContactEmail } from '~/utils/server/contact-email.server'
import Hero from '~/components/home/Hero'
import Services from '~/components/home/Services'
import { ServiceArea } from '~/components/home/service-area/ServiceArea'
import Gallery from '~/components/home/Gallery'
import Rigs from '~/components/home/Rigs'
import About from '~/components/home/About'
import Contact from '~/components/home/contact/Contact'


export function meta({}: Route.MetaArgs) {
  const title = 'Husky Well & Pump Service | Water Well Drilling in Central New Mexico'
  const description =
    'Professional water well drilling, pump installation, and repair services in central New Mexico. Serving Albuquerque, Rio Rancho, Edgewood, Moriarty, and surrounding communities.'
  const url = 'https://huskydrilling.com'
  const image = `${url}/og-image.jpg`

  return [
    { title: 'Husky' },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:site_name', content: 'Husky Well & Pump Service' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ]
}

export async function loader() {
  return {
    stats: await getDrillingStats(),
    mapsApiKey: process.env.MAPS_API_KEY ?? '',
    mapId: process.env.MAP_ID ?? '',
    turnstileSiteKey: process.env.TURNSTILE_SITE_KEY ?? ''
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  // Honeypot: if the hidden "website" field is filled, silently succeed
  if (formData.get('website')) {
    return data({ success: true })
  }

  // Rate limit by IP
  const ip = request.headers.get('X-Forwarded-For')?.split(',')[0].trim() ?? 'unknown'
  if (!rateLimit(ip)) {
    return data(
      { success: false, error: 'Too many requests. Please wait a minute and try again.' },
      { status: 429 }
    )
  }

  // Verify Turnstile token
  const turnstileToken = formData.get('cf-turnstile-response')
  if (!turnstileToken || typeof turnstileToken !== 'string') {
    return data(
      { success: false, error: 'Please complete the verification challenge.' },
      { status: 400 }
    )
  }
  const turnstileValid = await verifyTurnstile(turnstileToken)
  if (!turnstileValid) {
    return data(
      { success: false, error: 'Verification failed. Please try again.' },
      { status: 400 }
    )
  }

  // Validate form data with Zod
  const result = contactSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  })

  if (!result.success) {
    return data(
      { success: false, error: result.error.issues[0].message },
      { status: 400 }
    )
  }

  // Send email via Resend (server-side)
  try {
    await sendContactEmail(result.data)
  } catch (error) {
    console.error('Contact email failed:', error)
    return data(
      { success: false, error: 'Failed to send message. Please try again or call us directly.' },
      { status: 500 }
    )
  }

  return data({ success: true })
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Hero stats={loaderData.stats}/>
      <Services/>
      <ServiceArea mapsApiKey={loaderData.mapsApiKey} mapId={loaderData.mapId}/>
      <Gallery/>
      <Rigs/>
      <About/>
      <Contact mapsApiKey={loaderData.mapsApiKey} mapId={loaderData.mapId} turnstileSiteKey={loaderData.turnstileSiteKey}/>
    </>
  )
}
