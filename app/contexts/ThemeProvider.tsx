import { GluestackUIProvider, StatusBar } from '@gluestack-ui/themed'
import { ThemeProvider as RNThemeProvider } from '@react-navigation/native'
import { PropsWithChildren, useMemo } from 'react'
import { StatusBarStyle } from 'react-native'

import { ColorScheme, useColorSchemeContext } from './ColorSchemeContext'

import { config } from '@/services/theme/gluestack-ui/gluestack-ui.config' // Relative path to your ejected theme configuration
import { useNavigationTheme } from '@/services/theme/react-navigation'

export type ThemeProps = object

export const ThemeProvider = ({ children }: PropsWithChildren<ThemeProps>) => {
  const { colorScheme } = useColorSchemeContext()

  const statusBarColor = useMemo<StatusBarStyle>(
    () => (colorScheme === 'dark' ? 'light-content' : 'dark-content'),
    [colorScheme]
  )

  return (
    <GluestackUIProvider config={config} colorMode={colorScheme}>
      <StatusBar barStyle={statusBarColor} />
      <InnerComponent colorScheme={colorScheme}>{children}</InnerComponent>
    </GluestackUIProvider>
  )
}

type InnerComponentProps = {
  colorScheme: ColorScheme
}

const InnerComponent = ({
  colorScheme,
  children,
}: PropsWithChildren<InnerComponentProps>) => {
  const theme = useNavigationTheme(colorScheme)
  return <RNThemeProvider value={theme}>{children}</RNThemeProvider>
}
