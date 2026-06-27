export interface UserLocation {
  lat: number
  lng: number
  accuracy: number
}

export const DEFAULT_LOCATION: UserLocation = {
  lat: 37.5665,
  lng: 126.978,
  accuracy: 0,
}

export const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 60_000,
}

export function getCurrentLocation(
  geolocation: Geolocation | undefined = navigator.geolocation,
): Promise<UserLocation> {
  if (!geolocation) {
    return Promise.resolve(DEFAULT_LOCATION)
  }

  return new Promise((resolve) => {
    geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }),
      () => resolve(DEFAULT_LOCATION),
      GEOLOCATION_OPTIONS,
    )
  })
}
