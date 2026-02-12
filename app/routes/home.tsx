import type { Route } from './+types/home'
import Hero from '~/components/home/hero'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Husky' }
  ]
}

export default function Home() {
  return (
    <>
      <Hero />
    </>
  )
}