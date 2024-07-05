import { HStack, Heading } from '@gluestack-ui/themed'

import { Icon, IconNameProp, IconProps } from '../Icon/Icon'

export type TileProps = {
  title: string
  icon?: IconNameProp
  color?: IconProps['color']
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
      flexDirection={iconRight ? 'row-reverse' : 'row'}
      rounded="$lg"
      p="$3"
      gap="$3"
      {...props}
    >
      {icon && <Icon size="xl" name={icon} color={color} />}

      <Heading size="md" maxWidth="70%" color={color}>
        {title}
      </Heading>
    </HStack>
  )
}
