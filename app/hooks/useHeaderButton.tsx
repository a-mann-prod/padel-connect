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
      [side]: () => {
        const array = arrayProps.filter(({ condition }) => condition)
        if (array.length > 0) {
          return (
            <HStack>
              {array.map(({ badgeCount, ...props }, index) => (
                <HeaderButton
                  key={index}
                  {...props}
                  badgeCount={when(!!badgeCount, badgeCount)}
                />
              ))}
            </HStack>
          )
        }
      },
    })
  }, [arrayProps, navigation, side])
}
