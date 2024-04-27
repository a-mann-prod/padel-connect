import { useNavigation } from 'expo-router'
import { useLayoutEffect } from 'react'

import { HeaderButton, HeaderButtonProps } from '@/designSystem'

type Props = HeaderButtonProps & {
  side: 'headerLeft' | 'headerRight'
  condition?: boolean
}

export const useHeaderButton = ({
  side,
  condition = true,
  ...props
}: Props) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    if (condition) {
      navigation.setOptions({
        [side]: () => <HeaderButton {...props} />,
      })
    }
  }, [condition, navigation, props, side])
}
