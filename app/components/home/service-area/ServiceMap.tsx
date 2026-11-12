import { serviceAreaCenter, serviceAreaCoords } from '~/data/husky-data'
import { Map } from '@vis.gl/react-google-maps'
import { Polygon } from './Polygon'

interface ServiceMapProps {
  mapId: string
}

export function ServiceMap({ mapId }: Readonly<ServiceMapProps>) {
  return (
    <div className="w-full h-full">
      <Map
        mapId={ mapId }
        defaultCenter={ serviceAreaCenter }
        defaultZoom={ 9 }
        gestureHandling={ 'cooperative' }
        colorScheme="LIGHT"
      >
        <Polygon
          paths={ serviceAreaCoords }
          strokeWeight={ 2.5 }
          strokeOpacity={ 0.9 }
          strokeColor={ '#a3242f' }
          fillColor={ '#a3242f' }
          fillOpacity={ 0.12 }
        />
      </Map>
    </div>
  )
}
