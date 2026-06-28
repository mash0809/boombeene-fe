import CongestionBadge from '../common/CongestionBadge'
import { getReportDisabledMessage } from '../../congestion/reportPolicy'
import { useCongestion } from '../../hooks/useCongestion'
import { useLocationStore } from '../../store/locationStore'
import type { Store } from '../../types'

interface Props {
  store: Store
  onReport: () => void
}

export default function StoreDetail({ store, onReport }: Props) {
  const { lat, lng } = useLocationStore()
  const { data: congestion } = useCongestion(store.id, lat, lng)
  const reportDisabledMessage = getReportDisabledMessage(congestion?.distanceMeters)
  const isReportDisabled = reportDisabledMessage !== null

  return (
    <div>
      <h2 className="mb-1 text-xl font-bold">{store.name}</h2>
      <p className="mb-4 text-sm text-gray-500">
        {store.category === 'RESTAURANT' ? '음식점' : '카페'}
      </p>
      <div className="mb-6 flex items-center gap-2">
        <span className="text-sm text-gray-600">최근 30분간 혼잡도</span>
        <CongestionBadge
          level={congestion?.level ?? null}
          count={congestion?.count ?? 0}
        />
      </div>
      <p className="mb-4 text-sm text-gray-500">
        혼잡도 리뷰 {congestion?.count ?? 0}개
      </p>
      {reportDisabledMessage && (
        <p className="mb-4 text-sm text-red-500">{reportDisabledMessage}</p>
      )}
      <button
        type="button"
        onClick={onReport}
        disabled={isReportDisabled}
        className="w-full rounded-xl bg-blue-500 py-3 font-medium text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500"
      >
        혼잡도 제보하기
      </button>
    </div>
  )
}
