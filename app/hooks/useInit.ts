import * as Sentry from '@sentry/react-native'
import Constants from 'expo-constants'
import { useFonts } from 'expo-font'
import { useNavigationContainerRef } from 'expo-router'
import { useEffect } from 'react'

import { date } from '@/services/date'
import { i18n, useInitLanguage } from '@/services/i18n'

export const useInit = () => {
  const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()
  const ref = useNavigationContainerRef()

  Sentry.init({
    enabled: process.env.EXPO_PUBLIC_ENV === 'production',
    dsn: process.env.EXPO_PUBLIC_SENTRY_URL,
    debug: process.env.EXPO_PUBLIC_ENV === 'locale',
    dist: Constants.expoConfig?.version,
    environment: process.env.EXPO_PUBLIC_ENV,
    integrations: [
      new Sentry.ReactNativeTracing({
        routingInstrumentation,
      }),
    ],
  })

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref)
    }
  }, [ref])

  const [langLoaded] = useInitLanguage()
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    FontAwesome6Solid: require('../assets/fonts/FontAwesome6-solid.ttf'),
    FontAwesome6Regular: require('../assets/fonts/FontAwesome6-regular.ttf'),
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (langLoaded) {
      date.setLocale(i18n.language)
    }
  }, [langLoaded])

  return { isLoading: !loaded || !langLoaded }
}
