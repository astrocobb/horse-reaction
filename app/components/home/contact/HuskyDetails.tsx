import { huskyPlaceId } from '~/data/husky-data'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'
import { ChevronDown, Clock4, MapPin, Star } from 'lucide-react'


interface PlaceData {
  displayName: string | null
  formattedAddress: string | null
  nationalPhoneNumber: string | null
  rating: number | null
  userRatingCount: number | null
  regularOpeningHours: google.maps.places.OpeningHours | null
  googleMapsURI: string | null
  location: google.maps.LatLng | null
}

export function HuskyDetails() {

  const placesLibrary = useMapsLibrary('places')
  const [ placeData, setPlaceData ] = useState<PlaceData | null>(null)
  const [ openStatus, setOpenStatus ] = useState<boolean | null>(null)
  const [ showHours, setShowHours ] = useState(false)
  const [ error, setError ] = useState<Error | null>(null)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {

    if (!placesLibrary) return

    async function fetchPlace() {

      try {

        // create a place instance using husky's place id
        const place = new placesLibrary!.Place({ id: huskyPlaceId })

        // call fetchFields with the desired fields
        await place.fetchFields({
          fields: [
            'displayName',
            'formattedAddress',
            'nationalPhoneNumber',
            'rating',
            'userRatingCount',
            'regularOpeningHours',
            'googleMapsURI',
            'location'
          ]
        })

        // check if place is open (must be called after fetchFields)
        setOpenStatus(await place.isOpen() ?? false)

        // read data directly from the place object
        setPlaceData({
          displayName: place.displayName ?? null,
          formattedAddress: place.formattedAddress ?? null,
          nationalPhoneNumber: place.nationalPhoneNumber ?? null,
          rating: place.rating ?? null,
          userRatingCount: place.userRatingCount ?? null,
          regularOpeningHours: place.regularOpeningHours ?? null,
          googleMapsURI: place.googleMapsURI ?? null,
          location: place.location ?? null
        })

      } catch (error) {
        setError(error instanceof Error ? error : new Error('Failed to fetch place'))
      } finally {
        setLoading(false)
      }
    }

    fetchPlace()

  }, [ placesLibrary ])


  if (loading) return <p className="text-aquifer-ink">Loading our address and hours…</p>
  if (error || !placeData) return null

  return (
    <div className="space-y-3 text-aquifer-ink">

      { placeData.formattedAddress && (
        <p className="flex items-start gap-3">
          <MapPin aria-hidden="true" className="w-5 h-5 mt-0.5 shrink-0"/>
          <span>{ placeData.formattedAddress }</span>
        </p>
      ) }

      { placeData.rating && (
        <p className="flex items-center gap-3">
          <Star aria-hidden="true" className="w-5 h-5 shrink-0"/>
          <span>
            <span className="font-semibold text-white tabular">{ placeData.rating.toFixed(1) }</span> on Google
            { placeData.userRatingCount ? <span className="tabular"> from { placeData.userRatingCount } reviews</span> : null }
          </span>
        </p>
      ) }

      { placeData.regularOpeningHours?.weekdayDescriptions && (
        <div>
          <button
            type="button"
            onClick={ () => setShowHours(prev => !prev) }
            aria-expanded={ showHours }
            aria-controls="husky-hours"
            className="flex items-center gap-3 hover:cursor-pointer"
          >
            <Clock4 aria-hidden="true" className="w-5 h-5 shrink-0"/>
            { openStatus !== null && (
              <span className="font-semibold text-white">{ openStatus ? 'Open now' : 'Closed now' }</span>
            ) }
            <span className="underline underline-offset-4">{ showHours ? 'Hide hours' : 'Show hours' }</span>
            <ChevronDown aria-hidden="true" className={ `w-4 h-4 transition-transform ${ showHours ? 'rotate-180' : '' }` }/>
          </button>
          { showHours && (
            <ul id="husky-hours" className="mt-2 ml-8 space-y-0.5 text-sm tabular">
              { placeData.regularOpeningHours.weekdayDescriptions.map(day => (
                <li key={ day }>{ day }</li>
              )) }
            </ul>
          ) }
        </div>
      ) }

      { placeData.googleMapsURI && (
        <a
          href={ placeData.googleMapsURI }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block ml-8 font-semibold text-white underline underline-offset-4 decoration-2 hover:decoration-aquifer"
        >
          Get directions in Google Maps
        </a>
      ) }
    </div>
  )
}
