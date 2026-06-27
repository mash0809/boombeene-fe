import type { User } from '../types'

export const SESSION_QUERY_KEY = ['auth', 'session'] as const
export const SESSION_STALE_TIME_MS = 1000 * 60 * 5

export function createSessionQueryOptions(queryFn: () => Promise<User>) {
  return {
    queryKey: SESSION_QUERY_KEY,
    queryFn,
    retry: false,
    staleTime: SESSION_STALE_TIME_MS,
    refetchOnWindowFocus: false,
  }
}
