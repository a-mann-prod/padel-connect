import { useNavigation } from 'expo-router'
import { useLayoutEffect } from 'react'

export const useHeaderTitle = (title?: string) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title || '',
    })
  }, [navigation, title])
}
