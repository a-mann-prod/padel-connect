import { GluestackUIProvider } from '@gluestack-ui/themed'
import { ThemeProvider as RNThemeProvider } from '@react-navigation/native'
import { PropsWithChildren } from 'react'

import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme'
import { config } from '@/services/theme/gluestack-ui/gluestack-ui.config' // Relative path to your ejected theme configuration
import { useNavigationTheme } from '@/services/theme/react-navigation'

export type ThemeProps = {}

export const ThemeProvider = ({ children }: PropsWithChildren<ThemeProps>) => {
  const colorScheme = useColorScheme()

  return (
    <GluestackUIProvider config={config} colorMode={colorScheme}>
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
