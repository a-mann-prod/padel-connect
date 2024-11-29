import { Pressable as GPressable } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'

export type PressableProps = typeof GPressable.defaultProps & {
  transparent?: boolean
  displayDisabledOpacity?: boolean
}

export const Pressable = ({
  children,
  transparent = false,
  displayDisabledOpacity = false,
  ...props
}: PropsWithChildren<PressableProps>) => {
  const { onPress, onPressIn, onPressOut, onLongPress } = props
  const active = !!onPress || !!onPressIn || !!onPressOut || !!onLongPress

  return (
    <GPressable
      disabled={!active}
      {...props}
      $active-opacity={0.5}
      opacity={displayDisabledOpacity && !active ? 0.5 : 1}
    >
      {children}
    </GPressable>
  )
}
