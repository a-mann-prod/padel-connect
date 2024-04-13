import { useToken } from '@gluestack-style/react'
import { Theme } from '@react-navigation/native'

import { ColorScheme } from '@/hooks/useColorScheme'

export const useNavigationTheme = (colorScheme: ColorScheme) => {
  const primary = useToken('colors', 'primary500')
  const notification = useToken('colors', 'red600')

  const lightTheme: Theme = {
    dark: false,
    colors: {
      background: useToken('colors', 'backgroundLight50'),
      border: useToken('colors', 'backgroundLight100'),
      card: useToken('colors', 'white'),
      notification,
      primary,
      text: useToken('colors', 'textLight700'),
    },
  }

  const darkTheme: Theme = {
    dark: true,
    colors: {
      background: useToken('colors', 'black'),
      border: useToken('colors', 'backgroundDark900'),
      card: useToken('colors', 'backgroundDark950'),
      notification,
      primary,
      text: useToken('colors', 'textDark200'),
    },
  }

  return colorScheme === 'light' ? lightTheme : darkTheme
}
