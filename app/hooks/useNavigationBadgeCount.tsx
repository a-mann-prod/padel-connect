import { useNavigation } from 'expo-router'
import { useLayoutEffect } from 'react'

export const useNavigationBadgeCount = (value?: number | null) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({ tabBarBadge: value || undefined })
  }, [navigation, value])
}
