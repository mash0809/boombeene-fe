import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('exposes a separate point balance API', async () => {
  const usersApiSource = await readFile(new URL('./users.ts', import.meta.url), 'utf8')

  assert.equal(usersApiSource.includes('/points/balance'), true)
  assert.equal(usersApiSource.includes('getPointBalance'), true)
})
