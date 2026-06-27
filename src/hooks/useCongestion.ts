import { useQuery } from '@tanstack/react-query'
import { getCongestion } from '../api/crowdReports'

export function useCongestion(storeId: number | null) {
  return useQuery({
    queryKey: ['congestion', storeId],
    queryFn: () => getCongestion(storeId!),
    enabled: storeId !== null,
    staleTime: 1000 * 30,
  })
}
