import { huskyCoords } from '~/data/husky-data'
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'


export default function HuskyMap() {
  return (
    <APIProvider apiKey={ import.meta.env.VITE_MAPS_API_KEY }>
      <div className="w-full h-[64vh]">
        <Map
          zoom={ 16 }
          zoomControl={ true }
          center={ huskyCoords }
          mapId={ import.meta.env.VITE_MAP_ID }
        >
          <AdvancedMarker position={ huskyCoords }></AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  )
}