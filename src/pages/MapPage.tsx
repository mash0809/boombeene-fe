import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import KakaoMap from '../components/map/KakaoMap'
import StoreMarker from '../components/map/StoreMarker'
import BottomSheet from '../components/sheet/BottomSheet'
import ReportForm from '../components/sheet/ReportForm'
import StoreDetail from '../components/sheet/StoreDetail'
import { useNearbyStores } from '../hooks/useNearbyStores'
import { getCurrentLocation } from '../location/getCurrentLocation'
import { refreshCurrentLocation } from '../location/refreshCurrentLocation'
import { useLocationStore } from '../store/locationStore'
import type { Store } from '../types'

export default function MapPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { lat, lng, setLocation } = useLocationStore()
  const [map, setMap] = useState<kakao.maps.Map | null>(null)
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [showReport, setShowReport] = useState(false)
  const [isRefreshingLocation, setIsRefreshingLocation] = useState(false)
  const { data: stores = [], isFetching } = useNearbyStores(lat, lng)

  useEffect(() => {
    let cancelled = false

    getCurrentLocation().then(({ lat, lng, accuracy }) => {
      if (!cancelled) {
        setLocation(lat, lng, accuracy)
      }
    })

    return () => {
      cancelled = true
    }
  }, [setLocation])

  const handleRefreshLocation = async () => {
    setIsRefreshingLocation(true)
    setSelectedStore(null)
    setShowReport(false)

    try {
      await refreshCurrentLocation({
        getLocation: getCurrentLocation,
        setLocation,
        refreshNearbyStores: () =>
          queryClient.invalidateQueries({ queryKey: ['stores', 'nearby'] }),
      })
    } finally {
      setIsRefreshingLocation(false)
    }
  }

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
      <button
        type="button"
        onClick={handleRefreshLocation}
        disabled={isRefreshingLocation || isFetching}
        className="absolute right-4 top-16 z-10 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md disabled:opacity-60"
      >
        {isRefreshingLocation || isFetching ? '갱신 중...' : '현재 위치'}
      </button>
      <KakaoMap lat={lat} lng={lng} onMapReady={setMap} />
      {map &&
        stores.map((store) => (
          <StoreMarker
            key={store.id}
            map={map}
            store={store}
            onClick={(s) => {
              setSelectedStore(s)
              setShowReport(false)
            }}
          />
        ))}
      <BottomSheet
        open={!!selectedStore && !showReport}
        onClose={() => setSelectedStore(null)}
      >
        {selectedStore && (
          <StoreDetail store={selectedStore} onReport={() => setShowReport(true)} />
        )}
      </BottomSheet>
      <BottomSheet
        open={!!selectedStore && showReport}
        onClose={() => setShowReport(false)}
      >
        {selectedStore && (
          <ReportForm
            store={selectedStore}
            onSuccess={() => {
              setShowReport(false)
              setSelectedStore(null)
            }}
          />
        )}
      </BottomSheet>
    </div>
  )
}
