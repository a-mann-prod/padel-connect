import { useNavigation } from 'expo-router'
import { useLayoutEffect } from 'react'

import { HeaderButton, HeaderButtonProps } from '@/designSystem'
import { when } from '@/utils/when'

type Props = HeaderButtonProps & {
  side: 'headerLeft' | 'headerRight'
  condition?: boolean
}

export const useHeaderButton = ({
  side,
  condition = true,
  badgeCount,
  ...props
}: Props) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    if (condition) {
      navigation.setOptions({
        [side]: () => (
          <HeaderButton
            {...props}
            badgeCount={when(!!badgeCount, badgeCount)}
          />
        ),
      })
    }
  }, [condition, navigation, props, side, badgeCount])
}
