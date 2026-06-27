import { useEffect } from 'react'
import KakaoMap from '../components/map/KakaoMap'
import { useLocationStore } from '../store/locationStore'

export default function MapPage() {
  const { lat, lng, setLocation } = useLocationStore()

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
    <div className="h-screen w-screen">
      <KakaoMap lat={lat} lng={lng} />
    </div>
  )
}
