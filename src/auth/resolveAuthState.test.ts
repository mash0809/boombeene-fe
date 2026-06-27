import assert from 'node:assert/strict'
import test from 'node:test'
import { resolveAuthState } from './resolveAuthState.ts'

test('server session success authenticates even when memory state is false', () => {
  assert.equal(
    resolveAuthState({ isSessionValid: true, isSessionLoading: false }),
    'authenticated',
  )
})

test('session check keeps route pending while loading', () => {
  assert.equal(
    resolveAuthState({ isSessionValid: false, isSessionLoading: true }),
    'pending',
  )
})

test('session check failure redirects when memory state is false', () => {
  assert.equal(
    resolveAuthState({ isSessionValid: false, isSessionLoading: false }),
    'unauthenticated',
  )
})
