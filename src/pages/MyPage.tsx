import { useNavigate } from 'react-router-dom'
import { logout } from '../api/auth'
import { useMe } from '../hooks/useMe'
import { usePointBalance } from '../hooks/usePointBalance'
import { useAuthStore } from '../store/authStore'

export default function MyPage() {
  const navigate = useNavigate()
  const setLoggedIn = useAuthStore((s) => s.setLoggedIn)
  const { data: user } = useMe()
  const { data: pointBalance } = usePointBalance()

  const handleLogout = async () => {
    await logout()
    setLoggedIn(false)
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-sm p-6">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-4 text-sm font-medium text-blue-500 hover:underline"
        >
          ← 지도
        </button>
        <h1 className="mb-6 text-2xl font-bold">마이페이지</h1>
        <div className="mb-4 rounded-2xl bg-white p-4 shadow">
          <p className="mb-1 text-sm text-gray-500">닉네임</p>
          <p className="font-medium">{user?.nickname ?? '-'}</p>
        </div>
        <div className="mb-4 rounded-2xl bg-white p-4 shadow">
          <p className="mb-1 text-sm text-gray-500">이메일</p>
          <p className="font-medium">{user?.email ?? '-'}</p>
        </div>
        <div className="mb-6 rounded-2xl bg-white p-4 shadow">
          <p className="mb-1 text-sm text-gray-500">보유 포인트</p>
          <p className="text-2xl font-bold text-blue-600">
            {pointBalance?.balance.toLocaleString() ?? '-'} P
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-xl border border-red-400 py-3 text-red-500 hover:bg-red-50"
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}
