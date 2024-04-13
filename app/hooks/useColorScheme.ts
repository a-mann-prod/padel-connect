import { useColorScheme as useRNColorScheme } from 'react-native'

export type ColorScheme = 'dark' | 'light'

export const useColorScheme = () => {
  const colorScheme = useRNColorScheme()

  return (colorScheme || 'light') as ColorScheme
}
