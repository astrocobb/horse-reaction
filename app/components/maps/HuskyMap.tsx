import { huskyLatLng } from '~/data/husky-data'
import { Map } from '@vis.gl/react-google-maps'


export default function HuskyMap() {
  return (
    <div className="w-full h-full">
      <Map
        mapId={ import.meta.env.VITE_MAP_ID }
        defaultCenter={ huskyLatLng }
        defaultZoom={ 15 }
        gestureHandling={ 'greedy' }
        colorScheme="DARK"
      />
    </div>
  )
}