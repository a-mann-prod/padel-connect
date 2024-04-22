import { HStack, Heading } from '@gluestack-ui/themed'

import { Icon, IconProps } from '../Icon/Icon'

export type TileProps = {
  title: string
  icon?: IconProps['name']
  color?: any
  iconRight?: boolean
} & typeof HStack.defaultProps

export const Tile = ({
  title,
  icon,
  color = '$white',
  iconRight,
  ...props
}: TileProps) => {
  return (
    <HStack
      justifyContent="space-between"
      flexDirection={iconRight ? 'row-reverse' : 'row'}
      rounded="$lg"
      p="$3"
      {...props}
    >
      <Icon size="xl" name={icon} color={color} />

      <Heading size="md" maxWidth="70%" color={color}>
        {title}
      </Heading>
    </HStack>
  )
}
