import { Box, Pressable as GPressable } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'

import { when } from '@/utils/when'

export type PressableProps = typeof GPressable.defaultProps & {
  transparent?: boolean
}

export const Pressable = ({
  children,
  transparent = false,
  ...props
}: PropsWithChildren<PressableProps>) => {
  const { onPress, onPressIn, onPressOut, onLongPress } = props
  const active = !!onPress || !!onPressIn || !!onPressOut || !!onLongPress

  return (
    <GPressable disabled={!active} {...props}>
      {({ pressed }: any) => <Box opacity={when(pressed, 0.5)}>{children}</Box>}
    </GPressable>
  )
}
