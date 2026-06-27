import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { report } from '../../api/crowdReports'
import { useLocationStore } from '../../store/locationStore'
import type { CongestionLevel, Store } from '../../types'

const LEVELS: { value: CongestionLevel; label: string; emoji: string }[] = [
  { value: 'COMFORTABLE', label: '여유', emoji: '😊' },
  { value: 'NORMAL', label: '보통', emoji: '😐' },
  { value: 'CROWDED', label: '혼잡', emoji: '😰' },
]

interface Props {
  store: Store
  onSuccess: () => void
}

export default function ReportForm({ store, onSuccess }: Props) {
  const [selected, setSelected] = useState<CongestionLevel | null>(null)
  const { lat, lng, accuracy } = useLocationStore()
  const queryClient = useQueryClient()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: () =>
      report({
        storeId: store.id,
        latitude: lat!,
        longitude: lng!,
        gpsAccuracy: accuracy ?? 0,
        level: selected!,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['congestion', store.id] })
      onSuccess()
    },
  })

  return (
    <div>
      <h2 className="mb-1 text-xl font-bold">{store.name}</h2>
      <p className="mb-6 text-sm text-gray-500">현재 혼잡도를 알려주세요</p>
      <div className="mb-6 flex gap-3">
        {LEVELS.map(({ value, label, emoji }) => (
          <button
            key={value}
            type="button"
            onClick={() => setSelected(value)}
            className={`flex-1 rounded-xl border-2 py-4 text-center transition-colors ${
              selected === value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="mb-1 text-2xl">{emoji}</div>
            <div className="text-sm font-medium">{label}</div>
          </button>
        ))}
      </div>
      {isError && (
        <p className="mb-4 text-sm text-red-500">
          제보에 실패했습니다. 가게 근처에서만 제보할 수 있어요.
        </p>
      )}
      <button
        type="button"
        onClick={() => mutate()}
        disabled={!selected || isPending}
        className="w-full rounded-xl bg-blue-500 py-3 font-medium text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {isPending ? '제보 중...' : '제보하기'}
      </button>
    </div>
  )
}
