import CongestionBadge from '../common/CongestionBadge'
import { useCongestion } from '../../hooks/useCongestion'
import type { Store } from '../../types'

interface Props {
  store: Store
  onReport: () => void
}

export default function StoreDetail({ store, onReport }: Props) {
  const { data: congestion } = useCongestion(store.id)

  return (
    <div>
      <h2 className="mb-1 text-xl font-bold">{store.name}</h2>
      <p className="mb-4 text-sm text-gray-500">
        {store.category === 'RESTAURANT' ? '음식점' : '카페'}
      </p>
      <div className="mb-6 flex items-center gap-2">
        <span className="text-sm text-gray-600">현재 혼잡도</span>
        <CongestionBadge
          level={congestion?.level ?? null}
          hasData={congestion?.hasData ?? false}
        />
      </div>
      <button
        type="button"
        onClick={onReport}
        className="w-full rounded-xl bg-blue-500 py-3 font-medium text-white hover:bg-blue-600"
      >
        혼잡도 제보하기
      </button>
    </div>
  )
}
