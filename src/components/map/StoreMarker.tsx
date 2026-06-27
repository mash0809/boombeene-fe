import { useEffect } from 'react'
import type { Store } from '../../types'

interface Props {
  map: kakao.maps.Map
  store: Store
  onClick: (store: Store) => void
}

export default function StoreMarker({ map, store, onClick }: Props) {
  useEffect(() => {
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(store.latitude, store.longitude),
      map,
      title: store.name,
    })

    const handler = () => onClick(store)
    window.kakao.maps.event.addListener(marker, 'click', handler)

    return () => {
      window.kakao.maps.event.removeListener(marker, 'click', handler)
      marker.setMap(null)
    }
  }, [map, store, onClick])

  return null
}
