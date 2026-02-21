import { huskyPlaceId } from '~/data/husky-data'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'


interface PlaceData {
  displayName: string | null
  formattedAddress: string | null
  nationalPhoneNumber: string | null
  rating: number | null
  regularOpeningHours: google.maps.places.OpeningHours | null
  googleMapsURI: string | null
  location: google.maps.LatLng | null
}

export function HuskyDetails() {

  const placesLibrary = useMapsLibrary('places')
  const [ placeData, setPlaceData ] = useState<PlaceData | null>(null)
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
             'regularOpeningHours',
             'googleMapsURI',
             'location'
           ]
         })

         // read data directly from the place object
         setPlaceData({
           displayName: place.displayName,
           formattedAddress: place.formattedAddress,
           nationalPhoneNumber: place.nationalPhoneNumber,
           rating: place.rating,
           isOpen: place.isOpen,
           regularOpeningHours: place.regularOpeningHours,
           googleMapsURI: place.googleMapsURI
         })

       } catch (error) {
         setError(error instanceof Error ? error : new Error('Failed to fetch place'))
       } finally {
         setLoading(false)
       }
    }

    fetchPlace()

  }, [ placesLibrary ])

  if (loading) return <p>Loading Husky's Details...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!placeData) return <p>Husky's data not found.</p>

  return (
    <div>
      <h2 className="text-lg font-bold text-base-content">{placeData.displayName}</h2>
      <p className="text-base-100 text-sm mt-1">{placeData.formattedAddress}</p>
      <p>📞 {placeData.nationalPhoneNumber}</p>
      <Star/><span> {placeData.rating}</span>
      {placeData.googleMapsURI && (
        <a href={placeData.googleMapsURI} target="_blank" rel="noopener noreferrer">
          View on Google Maps
        </a>
      )}
    </div>
  )
}