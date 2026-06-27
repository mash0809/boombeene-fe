export type StoreCategory = 'RESTAURANT' | 'CAFE'

export type CongestionLevel = 'COMFORTABLE' | 'NORMAL' | 'CROWDED'

export interface Store {
  id: number
  name: string
  latitude: number
  longitude: number
  category: StoreCategory
}

export interface StoreCongestion {
  storeId: number
  level: CongestionLevel | null
  hasData: boolean
}

export interface User {
  id: number
  email: string
  nickname: string
}
