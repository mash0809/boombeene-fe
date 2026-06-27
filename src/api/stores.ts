import client from './client'
import type { Store, StoreCategory } from '../types'

interface NearbySearchParams {
  latitude: number
  longitude: number
  radius: number
  category: StoreCategory
}

export const searchNearby = async (params: NearbySearchParams): Promise<Store[]> => {
  const { data } = await client.post<Store[]>('/stores/nearby', params)
  return data
}
