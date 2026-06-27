import client from './client'
import type { User } from '../types'

export const getMe = async (): Promise<User> => {
  const { data } = await client.get<User>('/users/me')
  return data
}

export const getMyPoint = async (): Promise<{ balance: number }> => {
  const { data } = await client.get<{ balance: number }>('/users/me/point')
  return data
}
