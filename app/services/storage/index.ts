import AsyncStorage from '@react-native-async-storage/async-storage'

export const storage = {
  setItem: (key: string, data: string) => AsyncStorage.setItem(key, data),
  getItem: (key: string) => AsyncStorage.getItem(key) ?? '',
  removeItem: (key: string) => AsyncStorage.removeItem(key),
}
