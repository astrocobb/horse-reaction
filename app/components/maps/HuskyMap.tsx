import { huskyLatLng } from '~/data/husky-data'
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'


export default function HuskyMap() {
  return (
    <div className="w-full h-[64vh]">
      <Map
        mapId={ import.meta.env.VITE_MAP_ID }
        center={ huskyLatLng }
        zoom={ 16 }
        gestureHandling={ 'greedy' }
        colorScheme="DARK"
      >
        <AdvancedMarker position={ huskyLatLng }/>
      </Map>
    </div>
  )
}