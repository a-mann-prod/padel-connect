import * as Sentry from '@sentry/react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Platform } from 'react-native'

import { DefaultAlert, SelfDeleteAlert } from '@/components'
import { AuthProvider, ColorSchemeProvider, ThemeProvider } from '@/contexts'
import { useInit } from '@/hooks/useInit'
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

  return <RootLayoutNav />
})

const RootLayoutNav = () => {
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
            <Stack initialRouteName={unstable_settings.initialRouteName}>
              <Stack.Screen
                name="(modals)"
                options={{
                  presentation: 'containedModal',
                  headerShown: false,
                }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            {Platform.OS === 'web' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
            <SelfDeleteAlert />
            <DefaultAlert />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorSchemeProvider>
  )
}
