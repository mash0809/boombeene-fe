import { useQuery } from '@tanstack/react-query'
import { getCongestion } from '../api/crowdReports'

export function useCongestion(
  storeId: number | null,
  latitude: number | null,
  longitude: number | null,
) {
  return useQuery({
    queryKey: ['congestion', storeId, latitude, longitude],
    queryFn: () =>
      getCongestion({
        storeId: storeId!,
        latitude: latitude!,
        longitude: longitude!,
      }),
    enabled: storeId !== null && latitude !== null && longitude !== null,
    staleTime: 1000 * 30,
  })
}
