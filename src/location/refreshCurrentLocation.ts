import type { UserLocation } from './getCurrentLocation'

interface RefreshCurrentLocationParams {
  getLocation: () => Promise<UserLocation>
  setLocation: (lat: number, lng: number, accuracy: number) => void
  refreshNearbyStores: () => Promise<unknown>
}

export async function refreshCurrentLocation({
  getLocation,
  setLocation,
  refreshNearbyStores,
}: RefreshCurrentLocationParams): Promise<UserLocation> {
  const location = await getLocation()
  setLocation(location.lat, location.lng, location.accuracy)
  await refreshNearbyStores()
  return location
}
