import assert from 'node:assert/strict'
import test from 'node:test'
import {
  DEFAULT_LOCATION,
  GEOLOCATION_OPTIONS,
  getCurrentLocation,
} from './getCurrentLocation.ts'

test('passes timeout options to geolocation request', async () => {
  let receivedOptions: PositionOptions | undefined
  const geolocation = {
    getCurrentPosition(
      success: PositionCallback,
      _error?: PositionErrorCallback | null,
      options?: PositionOptions,
    ) {
      receivedOptions = options
      success({
        coords: {
          latitude: 37.1,
          longitude: 127.1,
          accuracy: 12,
        },
      } as GeolocationPosition)
    },
  } as Geolocation

  const location = await getCurrentLocation(geolocation)

  assert.deepEqual(location, { lat: 37.1, lng: 127.1, accuracy: 12 })
  assert.equal(receivedOptions?.timeout, GEOLOCATION_OPTIONS.timeout)
  assert.equal(typeof receivedOptions?.timeout, 'number')
})

test('falls back to default location when geolocation fails', async () => {
  const geolocation = {
    getCurrentPosition(
      _success: PositionCallback,
      error?: PositionErrorCallback | null,
      _options?: PositionOptions,
    ) {
      error?.({ code: 3, message: 'Timeout' } as GeolocationPositionError)
    },
  } as Geolocation

  const location = await getCurrentLocation(geolocation)

  assert.deepEqual(location, DEFAULT_LOCATION)
})
