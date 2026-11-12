import { serviceAreaCenter, serviceAreaCoords } from '~/data/husky-data'
import { Map } from '@vis.gl/react-google-maps'
import { Polygon } from './Polygon'
import { useTheme } from '~/utils/theme'

interface ServiceMapProps {
  mapId: string
}

// Hex versions of the success (green) token (the polygon takes plain colors, not CSS variables)
const areaColor = { light: '#1e7546', dark: '#5ec386' }

export function ServiceMap({ mapId }: Readonly<ServiceMapProps>) {
  const theme = useTheme()
  return (
    <div className="w-full h-full">
      {/* colorScheme only applies when the map is created, so remount on theme change */ }
      <Map
        key={ theme }
        mapId={ mapId }
        defaultCenter={ serviceAreaCenter }
        defaultZoom={ 9 }
        gestureHandling={ 'cooperative' }
        colorScheme={ theme === 'dark' ? 'DARK' : 'LIGHT' }
      >
        <Polygon
          paths={ serviceAreaCoords }
          strokeWeight={ 2.5 }
          strokeOpacity={ 0.9 }
          strokeColor={ areaColor[theme] }
          fillColor={ areaColor[theme] }
          fillOpacity={ theme === 'dark' ? 0.18 : 0.12 }
        />
      </Map>
    </div>
  )
}
