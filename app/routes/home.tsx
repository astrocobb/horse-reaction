import type { Route } from './+types/home'
import Hero from '~/components/home/hero'
import Services from '~/components/home/services'
import { ServiceArea } from '~/components/home/service-area'
import Gallery from '~/components/home/gallery'
import About from '~/components/home/about'
import Contact from '~/components/home/contact/contact'


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