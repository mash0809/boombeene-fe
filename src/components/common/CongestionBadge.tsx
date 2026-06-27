import type { CongestionLevel } from '../../types'

const LABEL: Record<CongestionLevel, string> = {
  COMFORTABLE: '여유',
  NORMAL: '보통',
  CROWDED: '혼잡',
}

const COLOR: Record<CongestionLevel, string> = {
  COMFORTABLE: 'bg-green-100 text-green-700',
  NORMAL: 'bg-yellow-100 text-yellow-700',
  CROWDED: 'bg-red-100 text-red-700',
}

interface Props {
  level: CongestionLevel | null
  hasData: boolean
}

export default function CongestionBadge({ level, hasData }: Props) {
  if (!hasData || !level) {
    return <span className="text-sm text-gray-400">정보 없음</span>
  }

  return (
    <span className={`rounded-full px-2 py-1 text-sm font-medium ${COLOR[level]}`}>
      {LABEL[level]}
    </span>
  )
}
