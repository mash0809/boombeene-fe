import assert from 'node:assert/strict'
import test from 'node:test'
import { refreshCurrentLocation } from './refreshCurrentLocation.ts'

test('updates current location and refreshes nearby stores', async () => {
  const calls: string[] = []
  const location = { lat: 37.5, lng: 127.1, accuracy: 8 }

  const result = await refreshCurrentLocation({
    getLocation: async () => {
      calls.push('getLocation')
      return location
    },
    setLocation: (lat, lng, accuracy) => {
      calls.push(`setLocation:${lat}:${lng}:${accuracy}`)
    },
    refreshNearbyStores: async () => {
      calls.push('refreshNearbyStores')
    },
  })

  assert.deepEqual(result, location)
  assert.deepEqual(calls, ['getLocation', 'setLocation:37.5:127.1:8', 'refreshNearbyStores'])
})
