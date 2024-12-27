import * as Sentry from '@sentry/react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'expo-dev-client'
import * as ExpoNotifications from 'expo-notifications'
import { router, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import * as TaskManager from 'expo-task-manager'
import * as Updates from 'expo-updates'
import { useEffect } from 'react'
import { Platform } from 'react-native'

import { DefaultAlert, SelfDeleteAlert, UpdateLoader } from '@/components'
import {
  AuthProvider,
  ColorSchemeProvider,
  FiltersProvider,
  ThemeProvider,
} from '@/contexts'
import { NotificationsProvider } from '@/contexts/NotificationsContext'
import { useInit } from '@/hooks/useInit'
import { useMe } from '@/hooks/useMe'
import useScreenCaptureCallback from '@/hooks/useScreenCaptureCallback'
import { routing } from '@/services/routing'
import 'react-native-gesture-handler'
import 'react-native-reanimated'

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK'
TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async ({ data }) => {
  const badgeCount = await ExpoNotifications.getBadgeCountAsync()
  ExpoNotifications.setBadgeCountAsync(badgeCount + 1)
})

ExpoNotifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK).then(() =>
  console.log(`${BACKGROUND_NOTIFICATION_TASK} succcesfully registered`)
)

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
            <FiltersProvider>
              <NotificationsProvider>
                <RootLayoutNav />
                {Platform.OS === 'web' && (
                  <ReactQueryDevtools initialIsOpen={false} />
                )}
                <SelfDeleteAlert />
                <DefaultAlert />
              </NotificationsProvider>
            </FiltersProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorSchemeProvider>
  )
}

const RootLayoutNav = () => {
  const { data: me } = useMe()

  const { isUpdateAvailable } = Updates.useUpdates()

  useScreenCaptureCallback(
    !me ? () => router.navigate(routing.report.path()) : undefined
  )

  if (isUpdateAvailable) {
    return <UpdateLoader />
  }

  return (
    <>
      <Stack initialRouteName={unstable_settings.initialRouteName}>
        <Stack.Screen
          name={routing.modals.name}
          options={{
            presentation: 'containedModal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={routing.tabs.name}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routing.match.name}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routing.matchCreate.name}
          options={{
            presentation: 'containedModal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={routing.oldMatch.name}
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  )
}
