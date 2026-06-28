import assert from 'node:assert/strict'
import test from 'node:test'
import {
  REPORTABLE_DISTANCE_METERS,
  canReportCongestion,
  getReportDisabledMessage,
} from './reportPolicy.ts'

test('allows congestion reports only within 50 meters', () => {
  assert.equal(REPORTABLE_DISTANCE_METERS, 50)
  assert.equal(canReportCongestion(50), true)
  assert.equal(canReportCongestion(50.1), false)
})

test('explains the 50 meter limit when a report is unavailable', () => {
  assert.equal(getReportDisabledMessage(51), '가게에서 50m 이내일 때만 제보할 수 있어요.')
  assert.equal(getReportDisabledMessage(50), null)
  assert.equal(getReportDisabledMessage(null), null)
})
