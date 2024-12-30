import { Pressable as GPressable } from '@gluestack-ui/themed'
import { ComponentProps, PropsWithChildren } from 'react'

type GPressableProps = ComponentProps<typeof GPressable>

export type PressableProps = Omit<GPressableProps, 'disabled'> & {
  displayDisabledOpacity?: boolean
  isDisabled?: boolean
}

export const Pressable = ({
  children,
  displayDisabledOpacity = true,
  isDisabled,
  ...props
}: PropsWithChildren<PressableProps>) => {
  return (
    <GPressable
      disabled={isDisabled}
      {...props}
      // reduce opacity on click
      $active-opacity={0.5}
      opacity={displayDisabledOpacity && isDisabled ? 0.5 : 1}
    >
      {children}
    </GPressable>
  )
}
