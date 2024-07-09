import { HStack } from '@gluestack-ui/themed'
import { useNavigation } from 'expo-router'
import { useLayoutEffect } from 'react'

import { HeaderButton, HeaderButtonProps } from '@/designSystem'
import { when } from '@/utils/when'

type Props = HeaderButtonProps & {
  condition?: boolean
}

export const useHeaderButton = (
  arrayProps: Props[],
  side: 'headerLeft' | 'headerRight'
) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      [side]: () => (
        <HStack>
          {arrayProps
            .filter(({ condition }) => condition)
            .map(({ badgeCount, ...props }) => (
              <HeaderButton
                {...props}
                badgeCount={when(!!badgeCount, badgeCount)}
              />
            ))}
        </HStack>
      ),
    })
  }, [arrayProps, navigation, side])
}
