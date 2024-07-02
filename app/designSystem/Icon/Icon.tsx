import { Icon as GIcon, useToken } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

import { FontAwesome, FontAwesomeProps } from './FontAwesome/FontAwesome'

type GIconProps = ComponentProps<typeof GIcon>

export type IconProps = GIconProps & {
  color?: any
  inverseY?: boolean
  inverseX?: boolean
}

export type IconNameProp = FontAwesomeProps['name']

export const Icon = ({
  name,
  color,
  inverseX,
  inverseY,
  ...props
}: IconProps & { name: IconNameProp }) => {
  const colorToken = useToken('colors', color)

  return (
    <GIcon
      {...props}
      transform={[{ scaleX: inverseX ? -1 : 1 }, { scaleY: inverseY ? -1 : 1 }]}
      justifyContent="center"
      color={colorToken}
      w={null}
      h={null}
      as={(innerProps: any) => <FontAwesome name={name} {...innerProps} />}
    />
  )
}
