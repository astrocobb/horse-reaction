import { huskyLatLng } from '~/data/husky-data'
import { AdvancedMarker, Map } from '@vis.gl/react-google-maps'
import { useTheme } from '~/utils/theme'

interface HuskyMapProps {
  mapId: string
}

export default function HuskyMap({ mapId }: Readonly<HuskyMapProps>) {
  const theme = useTheme()
  return (
    <div className="w-full h-full">
      {/* colorScheme only applies when the map is created, so remount on theme change */ }
      <Map
        key={ theme }
        mapId={ mapId }
        defaultCenter={ huskyLatLng }
        defaultZoom={ 15 }
        gestureHandling={ 'cooperative' }
        colorScheme={ theme === 'dark' ? 'DARK' : 'LIGHT' }
      >
        <AdvancedMarker position={ huskyLatLng }/>
      </Map>
    </div>
  )
}
