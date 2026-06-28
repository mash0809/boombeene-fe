import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('passes selected store category to nearby search', async () => {
  const mapPageSource = await readFile(new URL('./MapPage.tsx', import.meta.url), 'utf8')

  assert.match(mapPageSource, /useState<StoreCategory>\('CAFE'\)/)
  assert.match(mapPageSource, /useNearbyStores\(nearbyLat,\s*nearbyLng,\s*selectedCategory\)/)
})
