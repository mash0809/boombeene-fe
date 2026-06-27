import { useQuery } from '@tanstack/react-query'
import { getMe, getMyPoint } from '../api/users'

export function useMe() {
  return useQuery({ queryKey: ['users', 'me'], queryFn: getMe })
}

export function useMyPoint() {
  return useQuery({ queryKey: ['users', 'me', 'point'], queryFn: getMyPoint })
}
