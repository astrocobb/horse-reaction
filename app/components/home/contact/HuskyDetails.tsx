import { huskyPlaceId } from '~/data/husky-data'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'
import { ChevronDown, Phone, Star } from 'lucide-react'
import { Link } from 'react-router'


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

  if (loading) return <p className="text-base-100">Loading Husky's Details...</p>
  if (error) return <p className="text-base-100">Error: { error.message }</p>
  if (!placeData) return <p className="text-base-100">Husky's data not found.</p>

  return (
    <div>

      {/* Business Name */}
      <h2 className="text-lg font-bold text-base-content">
        { placeData.displayName }
      </h2>

      {/* Business Address */}
      <p className="mt-1 text-sm text-base-150">
        { placeData.formattedAddress }
      </p>

      {/* Phone Number */}
      <Link to="tel:5058640779" className="group inline-flex items-center gap-2">
        <Phone size={ 18 } className="mt-2 text-success transition group-hover:scale-110 group-hover:text-secondary"></Phone>
        <p className="mt-2 font-medium text-base-150 transition group-hover:text-secondary">{ placeData.nationalPhoneNumber }</p>
      </Link>

      {/* Rating */}
      <div className="mt-1 flex items-center gap-2">
        <Star size={ 18 } className="text-warning"/>
        <p className="text-base-150 font-medium">{ placeData.rating }</p>
        { placeData.userRatingCount && (
          <p className="text-base-150 text-sm">({ placeData.userRatingCount } reviews)</p>
        ) }
      </div>

      {/* Open Status */}
      { openStatus !== null && (
        openStatus
          ? <p className="mt-1 font-medium text-success">Open now</p>
          : <p className="mt-1 font-medium text-error">Closed now</p>
      ) }

      {/* Hours Drop Down */ }
      { placeData.regularOpeningHours?.weekdayDescriptions && (
        <div className="relative mt-2">
          <button
            onClick={ () => setShowHours(prev => !prev) }
            className="flex items-center gap-1 font-medium text-secondary hover:cursor-pointer hover:underline"
          >
            <span>View Hours</span>
            <ChevronDown
              size={ 16 }
              className={ `transition-transform ${ showHours ? 'rotate-180' : '' }` }
            />
          </button>
          { showHours && (
            <div className="absolute bottom-full z-10 mb-2 p-3 text-sm space-y-1 bg-base-800 border border-base-700 rounded-md shadow-lg">
              { placeData.regularOpeningHours.weekdayDescriptions.map((day, i) => (
                <p key={ i } className="text-base-150">{ day }</p>
              )) }
            </div>
          ) }
        </div>
      ) }

      {/* Google Maps Link */}
      { placeData.googleMapsURI && (
        <Link to={ placeData.googleMapsURI } target="_blank" rel="noopener noreferrer"
              className="inline-block mt-2 font-medium text-secondary hover:underline">
          View on Google Maps →
        </Link>
      ) }
    </div>
  )
}