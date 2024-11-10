import AsyncStorage from '@react-native-async-storage/async-storage'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants'

export const storage = {
  setItem: (key: string, data: string) => AsyncStorage.setItem(key, data),
  getItem: (key: string) => AsyncStorage.getItem(key) ?? '',
  removeItem: (key: string) => AsyncStorage.removeItem(key),
  printStorage: async () => {
    console.log('storage', {
      refresh: await AsyncStorage.getItem(REFRESH_TOKEN_KEY),
      access: await AsyncStorage.getItem(ACCESS_TOKEN_KEY),
    })
  },
}

export * from './constants'
