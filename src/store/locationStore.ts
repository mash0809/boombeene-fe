import { create } from 'zustand'

interface LocationState {
  lat: number | null
  lng: number | null
  accuracy: number | null
  setLocation: (lat: number, lng: number, accuracy: number) => void
}

export const useLocationStore = create<LocationState>((set) => ({
  lat: null,
  lng: null,
  accuracy: null,
  setLocation: (lat, lng, accuracy) => set({ lat, lng, accuracy }),
}))
