import { Linking, Platform } from 'react-native'

export const openUrl = (url: string) =>
  Platform.OS === 'web' ? window.open(url) : Linking.openURL(url)

export const extractIdFromUrl = (url: string, resource: string) => {
  const regex = new RegExp(`/${resource}/(\\d+)/`)
  const match = url.match(regex)

  if (match && match[1]) {
    return Number(match[1])
  } else {
    throw new Error('ID not found in the URL.')
  }
}
