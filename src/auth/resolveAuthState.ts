export type AuthRouteState = 'pending' | 'authenticated' | 'unauthenticated'

interface ResolveAuthStateParams {
  isSessionValid: boolean
  isSessionLoading: boolean
}

export function resolveAuthState({
  isSessionValid,
  isSessionLoading,
}: ResolveAuthStateParams): AuthRouteState {
  if (isSessionLoading) {
    return 'pending'
  }

  return isSessionValid ? 'authenticated' : 'unauthenticated'
}
