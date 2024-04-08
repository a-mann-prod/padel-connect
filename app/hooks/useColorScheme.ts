import { useColorScheme as useRNColorScheme } from 'react-native'

export const useColorScheme = () => {
  const colorScheme = useRNColorScheme()

  return colorScheme || 'light'
}
