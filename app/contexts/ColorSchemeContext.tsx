import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'

import { buildContext } from '@/services/buildContext'
import { storage } from '@/services/storage'

const FALLBACK_COLOR_SCHEME: ColorScheme = 'light'
export const COLOR_SCHEME_PERSISTENCE_KEY = 'colorScheme'

export type ColorScheme = 'dark' | 'light'

export type DeviceColorScheme = ColorScheme | 'devicePreference'

type ColorSchemeContextProps = {
  colorScheme: ColorScheme
  deviceColorScheme: DeviceColorScheme
  setColorScheme: (_: DeviceColorScheme) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [_, Provider, useColorSchemeContext] =
  buildContext<ColorSchemeContextProps>('ColorSchemeContext')

export { useColorSchemeContext }

export const ColorSchemeProvider = ({
  children,
  preloadedColorScheme,
}: PropsWithChildren<{
  preloadedColorScheme: DeviceColorScheme | undefined
}>) => {
  const [deviceColorScheme, setDeviceColorScheme] =
    useState<DeviceColorScheme>('devicePreference')
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    FALLBACK_COLOR_SCHEME
  )
  const devicePreferenceColor = useColorScheme() || FALLBACK_COLOR_SCHEME

  const updateColorScheme = useCallback(
    (colorScheme: DeviceColorScheme) => {
      if (colorScheme === 'devicePreference') {
        setColorScheme(devicePreferenceColor)
      } else {
        setColorScheme(colorScheme)
      }
      setDeviceColorScheme(colorScheme)
      storage.setItem(COLOR_SCHEME_PERSISTENCE_KEY, colorScheme)
    },
    [devicePreferenceColor, setColorScheme]
  )

  useEffect(() => {
    // on devicePrefChange
    const nextColor = (preloadedColorScheme ||
      'devicePreference') as DeviceColorScheme
    updateColorScheme(nextColor)
  }, [devicePreferenceColor, preloadedColorScheme, updateColorScheme])

  return (
    <Provider
      value={{
        colorScheme,
        deviceColorScheme,
        setColorScheme: updateColorScheme,
      }}
    >
      {children}
    </Provider>
  )
}
