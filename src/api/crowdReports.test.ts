import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('requests congestion with the current user location', async () => {
  const crowdReportsSource = await readFile(new URL('./crowdReports.ts', import.meta.url), 'utf8')

  assert.match(crowdReportsSource, /latitude: number/)
  assert.match(crowdReportsSource, /longitude: number/)
  assert.match(crowdReportsSource, /params:\s*\{\s*latitude,\s*longitude\s*\}/s)
})
