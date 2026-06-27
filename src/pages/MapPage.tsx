import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KakaoMap from '../components/map/KakaoMap'
import StoreMarker from '../components/map/StoreMarker'
import { useNearbyStores } from '../hooks/useNearbyStores'
import { useLocationStore } from '../store/locationStore'
import type { Store } from '../types'

export default function MapPage() {
  const navigate = useNavigate()
  const { lat, lng, setLocation } = useLocationStore()
  const [map, setMap] = useState<kakao.maps.Map | null>(null)
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const { data: stores = [] } = useNearbyStores(lat, lng)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy),
      () => setLocation(37.5665, 126.978, 0),
    )
  }, [setLocation])

  if (lat === null || lng === null) {
    return <div className="flex h-screen items-center justify-center text-gray-500">위치 확인 중...</div>
  }

  return (
    <div className="relative h-screen w-screen">
      <button
        type="button"
        onClick={() => navigate('/my')}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-md"
        aria-label="마이페이지"
      >
        👤
      </button>
      <KakaoMap lat={lat} lng={lng} onMapReady={setMap} />
      {map &&
        stores.map((store) => (
          <StoreMarker key={store.id} map={map} store={store} onClick={setSelectedStore} />
        ))}
      {selectedStore && <div className="sr-only">{selectedStore.name}</div>}
    </div>
  )
}
