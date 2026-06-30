import client from './client'
import type { User } from '../types'

export interface PointBalance {
  balance: number
}

export const getMe = async (): Promise<User> => {
  const { data } = await client.get<User>('/users/me')
  return data
}

export const getPointBalance = async (): Promise<PointBalance> => {
  const { data } = await client.get<PointBalance>('/points/balance')
  return data
}
