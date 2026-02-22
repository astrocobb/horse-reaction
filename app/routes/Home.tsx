import type { Route } from './+types/Home'
import Hero from '~/components/home/Hero'
import Services from '~/components/home/Services'
import { ServiceArea } from '~/components/home/service-area/ServiceArea'
import Gallery from '~/components/home/Gallery'
import About from '~/components/home/About'
import Contact from '~/components/home/contact/Contact'
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Husky' }
  ]
}

export default function Home() {
  return (
    <>
      <Hero/>
      <Services/>
      <ServiceArea/>
      <Gallery/>
      <About/>
      <Contact/>
    </>
  )
}