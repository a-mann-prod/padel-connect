import { Box } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'
import { Platform } from 'react-native'

import { when } from '@/utils/when'

export type HeaderButtonContainerProps = {
  isInModal?: boolean
}

export const HeaderButtonContainer = ({
  isInModal,
  children,
}: PropsWithChildren<HeaderButtonContainerProps>) => {
  if (!isInModal && Platform.OS !== 'web') return <Box mx="$3">{children}</Box>

  return (
    <Box
      marginLeft={when(Platform.OS === 'ios', -15)}
      marginRight={when(Platform.OS === 'ios', 15)}
    >
      {children}
    </Box>
  )
}
