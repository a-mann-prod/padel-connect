import { Linking, Platform } from 'react-native'

export const openUrl = (url: string) =>
  Platform.OS === 'web' ? window.open(url) : Linking.openURL(url)
