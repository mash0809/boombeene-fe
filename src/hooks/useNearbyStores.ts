import { useQuery } from '@tanstack/react-query'
import { searchNearby } from '../api/stores'
import type { StoreCategory } from '../types'

export function useNearbyStores(
  lat: number | null,
  lng: number | null,
  category: StoreCategory = 'CAFE',
) {
  return useQuery({
    queryKey: ['stores', 'nearby', lat, lng, category],
    queryFn: () => searchNearby({ latitude: lat!, longitude: lng!, radius: 50, category }),
    enabled: lat !== null && lng !== null,
    staleTime: 1000 * 60,
  })
}
