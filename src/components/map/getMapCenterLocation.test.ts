import assert from 'node:assert/strict'
import test from 'node:test'
import { getMapCenterLocation } from './getMapCenterLocation.ts'

test('returns latitude and longitude from the current map center', () => {
  const map = {
    getCenter: () => ({
      getLat: () => 37.51,
      getLng: () => 127.02,
    }),
  } as kakao.maps.Map

  assert.deepEqual(getMapCenterLocation(map), { lat: 37.51, lng: 127.02 })
})
