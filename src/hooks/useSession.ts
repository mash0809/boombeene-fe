import { useQuery } from '@tanstack/react-query'
import { getMe } from '../api/users'
import { createSessionQueryOptions } from '../auth/sessionQueryOptions'

export function useSession() {
  return useQuery(createSessionQueryOptions(getMe))
}
