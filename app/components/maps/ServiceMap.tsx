import { serviceAreaCenter, serviceAreaCoords } from '~/data/husky-data'
import { Map } from '@vis.gl/react-google-maps'
import { Polygon } from './Polygon'


export function ServiceMap() {
  return (
    <div className="w-full h-[64vh]">
      <Map
        mapId={ import.meta.env.VITE_MAP_ID }
        center={ serviceAreaCenter }
        zoom={ 9 }
        gestureHandling={ 'greedy' }
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