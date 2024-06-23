import { routing } from '@/services/routing'
import { Linking, Platform } from 'react-native'

export const openUrl = (url: string) =>
  Platform.OS === 'web' ? window.open(url) : Linking.openURL(url)

export const findMatchingRoutes = (url: string) => {
  const urlParts = url.split('/').filter((part) => part !== '')
  const matches = []

  const matchRoute = (partialUrl: string[]) => {
    return Object.values(routing).some((route) => {
      const routeParts = route.split('/').filter((part) => part !== '')
      if (routeParts.length !== partialUrl.length) return false
      return routeParts.every(
        (part, i) => part === partialUrl[i] || part.startsWith('[')
      )
    })
  }

  for (let i = 1; i <= urlParts.length; i++) {
    const partialUrl = urlParts.slice(0, i)
    const partialUrlStr = '/' + partialUrl.join('/')
    if (matchRoute(partialUrl)) {
      matches.push(partialUrlStr)
    }
  }

  return matches
}
