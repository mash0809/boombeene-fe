import { create } from 'zustand'

interface AuthState {
  isLoggedIn: boolean
  setLoggedIn: (v: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setLoggedIn: (v) => set({ isLoggedIn: v }),
}))
