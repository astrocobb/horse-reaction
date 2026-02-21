import { useEffect } from 'react'
import { huskyLatLng } from '~/data/husky-data'
import { Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'


function HuskyMarker() {
  const map = useMap()
  const markerLib = useMapsLibrary('marker')

  useEffect(() => {
    if (!map || !markerLib) return

    const marker = new markerLib.AdvancedMarkerElement({
      position: huskyLatLng,
      map,
    })

    return () => {
      marker.map = null
    }
  }, [ map, markerLib ])

  return null
}

export default function HuskyMap() {
  return (
    <div className="w-full h-full">
      <Map
        mapId={ import.meta.env.VITE_MAP_ID }
        defaultCenter={ huskyLatLng }
        defaultZoom={ 15 }
        gestureHandling={ 'greedy' }
        colorScheme="DARK"
      >
        <HuskyMarker/>
      </Map>
    </div>
  )
}