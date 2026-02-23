import { huskyLatLng } from '~/data/husky-data'
import { AdvancedMarker, Map } from '@vis.gl/react-google-maps'

interface HuskyMapProps {
  mapId: string
}

export default function HuskyMap({ mapId }: Readonly<HuskyMapProps>) {
  return (
    <div className="w-full h-full">
      <Map
        mapId={ mapId }
        defaultCenter={ huskyLatLng }
        defaultZoom={ 15 }
        gestureHandling={ 'cooperative' }
        colorScheme="DARK"
      >
        <AdvancedMarker position={ huskyLatLng }/>
      </Map>
    </div>
  )
}
