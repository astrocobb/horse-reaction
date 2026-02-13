import { huskyCoords } from '~/data/husky-data'
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'


export default function HuskyMap() {
  return (
    <APIProvider apiKey={ import.meta.env.VITE_MAPS_API_KEY }>
      <div className="w-full h-[64vh]">
        <Map
          mapId={ import.meta.env.VITE_MAP_ID }
          center={ huskyCoords }
          zoom={ 16 }
          gestureHandling={ 'greedy' }
          colorScheme="DARK"
        >
          <AdvancedMarker position={ huskyCoords }></AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  )
}