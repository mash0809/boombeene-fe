import assert from 'node:assert/strict'
import test from 'node:test'
import {
  SESSION_QUERY_KEY,
  SESSION_STALE_TIME_MS,
  createSessionQueryOptions,
} from './sessionQueryOptions.ts'

test('session query does not refetch on focus and stays fresh briefly', () => {
  const options = createSessionQueryOptions(async () => ({
    id: 1,
    email: 'user@example.com',
    nickname: 'user',
  }))

  assert.deepEqual(options.queryKey, SESSION_QUERY_KEY)
  assert.equal(options.retry, false)
  assert.equal(options.refetchOnWindowFocus, false)
  assert.equal(options.staleTime, SESSION_STALE_TIME_MS)
  assert.ok(SESSION_STALE_TIME_MS >= 1000 * 60 * 5)
})
