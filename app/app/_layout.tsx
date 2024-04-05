import { GluestackUIProvider } from '@gluestack-ui/themed'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Platform } from 'react-native'

import { SelfDeleteAlert } from '@/components'
import { AuthProvider } from '@/contexts'
import { useColorScheme } from '@/hooks/useColorScheme'
import { date } from '@/services/date'
import { useI18N, useInitLanguage } from '@/services/i18n'
import { config } from '@/services/theme/gluestack-ui/gluestack-ui.config' // Relative path to your ejected theme configuration
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

export default () => {
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
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded || !langLoaded) {
    return null
  }

  return <RootLayoutNav />
}

const RootLayoutNav = () => {
  const { language } = useI18N()
  date.setLocale(language)

  const colorScheme = useColorScheme() || 'light'

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
    <ThemeProvider value={DarkTheme}>
      <GluestackUIProvider config={config} colorMode={colorScheme}>
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
          </AuthProvider>
        </QueryClientProvider>
      </GluestackUIProvider>
    </ThemeProvider>
  )
}
