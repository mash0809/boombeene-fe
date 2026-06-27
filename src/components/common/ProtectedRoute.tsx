import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { resolveAuthState } from '../../auth/resolveAuthState'
import { useMe } from '../../hooks/useMe'
import { useAuthStore } from '../../store/authStore'

export default function ProtectedRoute() {
  const setLoggedIn = useAuthStore((s) => s.setLoggedIn)
  const { data: user, isError, isLoading } = useMe()
  const authState = resolveAuthState({
    isSessionValid: !!user && !isError,
    isSessionLoading: isLoading,
  })

  useEffect(() => {
    if (authState === 'pending') return
    setLoggedIn(authState === 'authenticated')
  }, [authState, setLoggedIn])

  if (authState === 'pending') {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        로그인 상태 확인 중...
      </div>
    )
  }

  return authState === 'authenticated' ? <Outlet /> : <Navigate to="/login" replace />
}
