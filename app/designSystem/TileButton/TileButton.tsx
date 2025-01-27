import { HStack, Heading, VStack } from '@gluestack-ui/themed'

import { Icon, IconNameProp } from '../Icon/Icon'
import { Pressable, PressableProps } from '../Pressable/Pressable'

export type TileButtonProps = {
  title: string
  icon?: IconNameProp
  color?: any
} & PressableProps

export const TileButton = ({
  title,
  icon,
  color,
  ...props
}: TileButtonProps) => {
  return (
    <Pressable
      flexGrow={1}
      h="$20"
      rounded="$lg"
      p="$3"
      {...props}
      bgColor={props.isDisabled ? '$backgroundLight300' : props.bgColor}
    >
      <VStack flex={1} justifyContent="space-between">
        {icon && (
          <HStack justifyContent="flex-end">
            <Icon size="xl" name={icon} color={color} />
          </HStack>
        )}

        <Heading size="md" maxWidth="70%" color={color}>
          {title}
        </Heading>
      </VStack>
    </Pressable>
  )
}
