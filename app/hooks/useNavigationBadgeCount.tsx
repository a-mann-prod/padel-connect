import { useNavigation } from 'expo-router'
import { useLayoutEffect } from 'react'

export const useNavigationBadgeCount = (value?: number | null) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    if (!value) return
    navigation.getParent()?.setOptions({ tabBarBadge: value })
  }, [navigation, value])
}
