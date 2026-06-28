import { useEffect } from 'react'
import { createCurrentLocationMarker } from './createCurrentLocationMarker'

interface Props {
  map: kakao.maps.Map
  lat: number
  lng: number
}

export default function CurrentLocationMarker({ map, lat, lng }: Props) {
  useEffect(() => {
    const marker = createCurrentLocationMarker({ map, lat, lng })

    return () => marker.remove()
  }, [map, lat, lng])

  return null
}
