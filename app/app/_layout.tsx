import * as Sentry from '@sentry/react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'expo-dev-client'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Platform } from 'react-native'

import { DefaultAlert, SelfDeleteAlert } from '@/components'
import { AuthProvider, ColorSchemeProvider, ThemeProvider } from '@/contexts'
import { NotificationsProvider } from '@/contexts/NotificationsContext'
import { HeaderBackButton } from '@/designSystem'
import { useInit } from '@/hooks/useInit'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import 'react-native-gesture-handler'
import 'react-native-reanimated'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default Sentry.wrap(() => {
  const { isLoading } = useInit()

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync()
    }
  }, [isLoading])

  if (isLoading) {
    return null
  }

  return <RootProvider />
})

const RootProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 3 * 1000 * 60,
        gcTime: 3 * 1000 * 60,
      },
      mutations: {
        retry: 0,
      },
    },
  })

  return (
    <ColorSchemeProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NotificationsProvider>
              <RootLayoutNav />
              {Platform.OS === 'web' && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
              <SelfDeleteAlert />
              <DefaultAlert />
            </NotificationsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorSchemeProvider>
  )
}

const RootLayoutNav = () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <Stack initialRouteName={unstable_settings.initialRouteName}>
      <Stack.Screen
        name={routing.modals.name}
        options={{
          presentation: 'containedModal',
          headerShown: false,
        }}
      />
      <Stack.Screen name={routing.tabs.name} options={{ headerShown: false }} />
      <Stack.Screen
        name={routing.match.name}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={routing.matchCreate.name}
        options={{
          title: t('matchCreate'),
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
          presentation: 'containedModal',
        }}
      />
    </Stack>
  )
}
