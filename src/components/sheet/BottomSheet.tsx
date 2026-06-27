import type { ReactNode } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export default function BottomSheet({ open, onClose, children }: Props) {
  if (!open) return null

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-10 bg-black/30"
        onClick={onClose}
        aria-label="닫기"
      />
      <div className="fixed bottom-0 left-0 right-0 z-20 max-h-[60vh] overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl">
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gray-300" />
        {children}
      </div>
    </>
  )
}
