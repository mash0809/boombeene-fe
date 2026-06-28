import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import CurrentLocationMarker from '../components/map/CurrentLocationMarker'
import { getMapCenterLocation } from '../components/map/getMapCenterLocation'
import KakaoMap from '../components/map/KakaoMap'
import StoreMarker from '../components/map/StoreMarker'
import BottomSheet from '../components/sheet/BottomSheet'
import ReportForm from '../components/sheet/ReportForm'
import StoreDetail from '../components/sheet/StoreDetail'
import { useNearbyStores } from '../hooks/useNearbyStores'
import { getCurrentLocation } from '../location/getCurrentLocation'
import { refreshCurrentLocation } from '../location/refreshCurrentLocation'
import { useLocationStore } from '../store/locationStore'
import type { Store, StoreCategory } from '../types'

const STORE_CATEGORY_OPTIONS: Array<{ value: StoreCategory; label: string }> = [
  { value: 'RESTAURANT', label: '음식점' },
  { value: 'CAFE', label: '카페' },
]

export default function MapPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { lat, lng, setLocation } = useLocationStore()
  const [map, setMap] = useState<kakao.maps.Map | null>(null)
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [showReport, setShowReport] = useState(false)
  const [searchCenter, setSearchCenter] = useState<{ lat: number; lng: number } | null>(null)
  const [hasMapMovedSinceSearch, setHasMapMovedSinceSearch] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isRefreshingLocation, setIsRefreshingLocation] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<StoreCategory>('CAFE')
  const toastTimeoutRef = useRef<number | null>(null)
  const nearbyLat = searchCenter?.lat ?? lat
  const nearbyLng = searchCenter?.lng ?? lng
  const { data: stores = [], isFetching } = useNearbyStores(nearbyLat, nearbyLng, selectedCategory)

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

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!map) return

    const handleMapDragged = () => setHasMapMovedSinceSearch(true)

    window.kakao.maps.event.addListener(map, 'dragend', handleMapDragged)

    return () => {
      window.kakao.maps.event.removeListener(map, 'dragend', handleMapDragged)
    }
  }, [map])

  const handleRefreshLocation = async () => {
    setIsRefreshingLocation(true)
    setSelectedStore(null)
    setShowReport(false)
    setSearchCenter(null)
    setHasMapMovedSinceSearch(false)
    setToastMessage(null)
    if (toastTimeoutRef.current !== null) {
      window.clearTimeout(toastTimeoutRef.current)
      toastTimeoutRef.current = null
    }

    try {
      const location = await refreshCurrentLocation({
        getLocation: getCurrentLocation,
        setLocation,
        refreshNearbyStores: () =>
          queryClient.invalidateQueries({ queryKey: ['stores', 'nearby'] }),
      })

      map?.setCenter(new window.kakao.maps.LatLng(location.lat, location.lng))
      setHasMapMovedSinceSearch(false)
    } finally {
      setIsRefreshingLocation(false)
    }
  }

  const handleSearchThisArea = () => {
    if (!map) return

    setSearchCenter(getMapCenterLocation(map))
    setHasMapMovedSinceSearch(false)
    setSelectedStore(null)
    setShowReport(false)
  }

  const handleCategoryChange = (category: StoreCategory) => {
    setSelectedCategory(category)
    setSelectedStore(null)
    setShowReport(false)
  }

  const handleReportSuccess = () => {
    setShowReport(false)
    setToastMessage('혼잡도 제보가 완료되었습니다')

    if (toastTimeoutRef.current !== null) {
      window.clearTimeout(toastTimeoutRef.current)
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null)
      toastTimeoutRef.current = null
    }, 2000)
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
      <div className="absolute left-4 top-16 z-10 flex rounded-full bg-white p-1 shadow-md">
        {STORE_CATEGORY_OPTIONS.map((option) => {
          const isSelected = selectedCategory === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleCategoryChange(option.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isSelected ? 'bg-gray-900 text-white' : 'text-gray-600'
              }`}
              aria-pressed={isSelected}
            >
              {option.label}
            </button>
          )
        })}
      </div>
      {map && hasMapMovedSinceSearch && (
        <button
          type="button"
          onClick={handleSearchThisArea}
          disabled={isFetching}
          className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-md disabled:opacity-60"
        >
          {isFetching ? '검색 중...' : '이 주변 검색'}
        </button>
      )}
      <KakaoMap lat={lat} lng={lng} onMapReady={setMap} />
      {map && <CurrentLocationMarker map={map} lat={lat} lng={lng} />}
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
      {toastMessage && (
        <div
          role="status"
          className="fixed left-1/2 top-24 z-30 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg"
        >
          {toastMessage}
        </div>
      )}
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
            onSuccess={handleReportSuccess}
          />
        )}
      </BottomSheet>
    </div>
  )
}
