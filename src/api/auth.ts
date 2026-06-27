import client from './client'

export const signup = (email: string, password: string, nickname: string) =>
  client.post('/auth/signup', { email, password, nickname })

export const login = (email: string, password: string) =>
  client.post('/auth/login', { email, password })

export const logout = () => client.post('/auth/logout')
