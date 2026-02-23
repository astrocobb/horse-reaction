import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { Route } from './+types/root'
import './app.css'
import React from 'react'


export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
  }
]

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <title>Husky Well & Pump Service</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <Meta/>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <link rel="icon" href="/favicon-dark.ico" sizes="any" media="(prefers-color-scheme: dark)"/>
        <Links/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://huskydrilling.com',
              name: 'Husky Well & Pump Service',
              url: 'https://huskydrilling.com',
              telephone: '+1-505-705-0277',
              email: 'huskydrilling@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Los Lunas',
                addressRegion: 'NM',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 34.656926,
                longitude: -106.757983,
              },
              areaServed: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                  '@type': 'GeoCoordinates',
                  latitude: 34.656926,
                  longitude: -106.757983,
                },
                geoRadius: '100 mi',
              },
              openingHours: 'Mo-Fr 07:00-18:00',
              description:
                'Professional water well drilling, pump installation, and repair services in central New Mexico.',
              serviceType: [
                'Water Well Drilling',
                'Pump Installation',
                'Pump Repair',
                'Well Maintenance',
              ],
            }),
          }}
        />
      </head>
      <body className="bg-base-800">
        { children }
        <ScrollRestoration/>
        <Scripts/>
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet/>
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {

  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{ message }</h1>
      <p>{ details }</p>
      { stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{ stack }</code>
        </pre>
      ) }
    </main>
  )
}
