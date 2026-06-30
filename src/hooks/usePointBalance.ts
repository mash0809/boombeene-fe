import { useQuery } from '@tanstack/react-query'
import { getPointBalance } from '../api/users'

export function usePointBalance() {
  return useQuery({
    queryKey: ['points', 'balance'],
    queryFn: getPointBalance,
    retry: false,
  })
}
