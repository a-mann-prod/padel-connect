import * as Sentry from '@sentry/react-native'
import Constants, { ExecutionEnvironment } from 'expo-constants'
import { useFonts } from 'expo-font'
import { useNavigationContainerRef } from 'expo-router'
import { useEffect, useState } from 'react'

import { COLOR_SCHEME_PERSISTENCE_KEY, DeviceColorScheme } from '@/contexts'
import { config } from '@/services/config'
import { date } from '@/services/date'
import { i18n, useInitLanguage } from '@/services/i18n'
import { storage } from '@/services/storage'

export const useInit = () => {
  if (Constants.executionEnvironment !== ExecutionEnvironment.StoreClient) {
    const googleSigninModule = require('@react-native-google-signin/google-signin')
    googleSigninModule.GoogleSignin.configure({
      iosClientId: config.reversedClientId,
      scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'openid',
        'https://www.googleapis.com/auth/plus.login',
      ],
    })
  }

  const reactNavigationIntegration = Sentry.reactNavigationIntegration()
  const ref = useNavigationContainerRef()

  Sentry.init({
    enabled: config.env === 'production' || config.env === 'preview',
    dsn: config.sentryUrl,
    debug: config.env === 'local',
    dist: config.version,
    environment: config.env,
    integrations: [reactNavigationIntegration],
    attachScreenshot: true,
  })

  useEffect(() => {
    if (ref) {
      reactNavigationIntegration.registerNavigationContainer(ref)
    }
  }, [reactNavigationIntegration, ref])

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
      date.setLocale(i18n().language)
    }
  }, [langLoaded])

  const [colorScheme, setColorScheme] = useState<
    DeviceColorScheme | undefined
  >()
  const [isLoadingColorScheme, setIsLoadingColorScheme] = useState(true)

  useEffect(() => {
    storage
      .getItem(COLOR_SCHEME_PERSISTENCE_KEY)
      .then((color) => setColorScheme(color as DeviceColorScheme | undefined))
      .finally(() => setIsLoadingColorScheme(false))
  }, [])

  return {
    isLoading: !loaded || !langLoaded || isLoadingColorScheme,
    colorScheme,
  }
}
