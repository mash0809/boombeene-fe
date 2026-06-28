import client from './client'
import type { CongestionLevel, StoreCongestion } from '../types'

interface ReportParams {
  storeId: number
  latitude: number
  longitude: number
  gpsAccuracy: number
  level: CongestionLevel
}

interface CongestionParams {
  storeId: number
  latitude: number
  longitude: number
}

export const report = async (params: ReportParams) => {
  const { data } = await client.post<{ reportId: number }>('/crowd-reports', params)
  return data
}

export const getCongestion = async ({
  storeId,
  latitude,
  longitude,
}: CongestionParams): Promise<StoreCongestion> => {
  const { data } = await client.get<StoreCongestion>(
    `/crowd-reports/stores/${storeId}/congestion`,
    { params: { latitude, longitude } },
  )
  return data
}
