import * as Sentry from '@sentry/react-native'
import { useFonts } from 'expo-font'
import { useNavigationContainerRef } from 'expo-router'
import { useEffect } from 'react'
import { LogBox } from 'react-native'

import { config } from '@/services/config'
import { date } from '@/services/date'
import { i18n, useInitLanguage } from '@/services/i18n'

const IGNORED_LOGS = ['fontFamily "FontAwesome6']

// TODO: check if not pb on android release
// this removes logs from IGNORED_LOGS
LogBox.ignoreLogs(IGNORED_LOGS)
if (__DEV__) {
  const withoutIgnored =
    (logger: any) =>
    (...args: any[]) => {
      const output = args.join(' ')

      if (!IGNORED_LOGS.some((log) => output.includes(log))) {
        logger(...args)
      }
    }

  console.log = withoutIgnored(console.log)
  console.info = withoutIgnored(console.info)
  console.warn = withoutIgnored(console.warn)
  console.error = withoutIgnored(console.error)
}

export const useInit = () => {
  const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()
  const ref = useNavigationContainerRef()

  Sentry.init({
    enabled: config.env === 'production',
    dsn: config.sentryUrl,
    debug: config.env === 'local',
    dist: config.version,
    environment: config.env,
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
      date.setLocale(i18n().language)
    }
  }, [langLoaded])

  return { isLoading: !loaded || !langLoaded }
}
