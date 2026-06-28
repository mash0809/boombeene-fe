import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('does not expose a separate point API because points come from the me response', async () => {
  const usersApiSource = await readFile(new URL('./users.ts', import.meta.url), 'utf8')

  assert.equal(usersApiSource.includes('/users/me/point'), false)
  assert.equal(usersApiSource.includes('getMyPoint'), false)
})
