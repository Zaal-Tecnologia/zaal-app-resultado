import AsyncStorage from '@react-native-async-storage/async-storage'
import type { StateStorage } from 'zustand/middleware'

export const zustandStorage: StateStorage = {
  setItem: async (name, value) => {
    return await AsyncStorage.setItem(name, JSON.stringify(value))
  },
  getItem: async (name) => {
    const JSONStorage = await AsyncStorage.getItem(name)

    return JSONStorage != null ? JSON.parse(JSONStorage) : null
  },
  removeItem: async (name) => {
    return await AsyncStorage.removeItem(name)
  },
}
