import { huskyLatLng } from '~/data/husky-data'
import { AdvancedMarker, Map, useMap } from '@vis.gl/react-google-maps'


function HuskyMarker() {
  const map = useMap()
  if (!map) return null
  return <AdvancedMarker position={ huskyLatLng }/>
}

export default function HuskyMap() {
  return (
    <div className="w-full h-full">
      <Map
        mapId={ import.meta.env.VITE_MAP_ID }
        defaultCenter={ huskyLatLng }
        defaultZoom={ 15 }
        gestureHandling={ 'greedy' }
        colorScheme="DARK"
      >
        <HuskyMarker/>
      </Map>
    </div>
  )
}