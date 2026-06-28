export const REPORTABLE_DISTANCE_METERS = 50

export function canReportCongestion(distanceMeters: number | null | undefined) {
  if (distanceMeters == null) {
    return true
  }

  return distanceMeters <= REPORTABLE_DISTANCE_METERS
}

export function getReportDisabledMessage(distanceMeters: number | null | undefined) {
  if (canReportCongestion(distanceMeters)) {
    return null
  }

  return `가게에서 ${REPORTABLE_DISTANCE_METERS}m 이내일 때만 제보할 수 있어요.`
}
