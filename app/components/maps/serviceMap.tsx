import { serviceAreaCenter } from '~/data/husky-data'
import { APIProvider, Map } from '@vis.gl/react-google-maps'


export function ServiceMap() {
  return (
    <APIProvider apiKey={ import.meta.env.VITE_MAPS_API_KEY }>
      <div className="w-full h-[64vh]">
        <Map
          zoom={ 10 }
          gestureHandling="greedy"
          center={ serviceAreaCenter }
          mapId={ import.meta.env.VITE_MAP_ID }
        >
        </Map>
      </div>
    </APIProvider>
  )
}