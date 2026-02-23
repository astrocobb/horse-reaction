import { serviceAreaCenter, serviceAreaCoords } from '~/data/husky-data'
import { Map } from '@vis.gl/react-google-maps'
import { Polygon } from './Polygon'

interface ServiceMapProps {
  mapId: string
}

export function ServiceMap({ mapId }: Readonly<ServiceMapProps>) {
  return (
    <div className="w-full h-[64vh]">
      <Map
        mapId={ mapId }
        defaultCenter={ serviceAreaCenter }
        defaultZoom={ 9 }
        gestureHandling={ 'cooperative' }
        colorScheme="DARK"
      >
        <Polygon
          paths={ serviceAreaCoords }
          strokeWeight={ 2 }
          strokeOpacity={ 0.8 }
          strokeColor={ '#3fa66b' }
          fillColor={ '#3fa66b' }
          fillOpacity={ 0.15 }
        />
      </Map>
    </div>
  )
}
