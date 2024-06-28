import { Icon as GIcon, useToken } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

import { FontAwesome, FontAwesomeProps } from './FontAwesome/FontAwesome'

type GIconProps = ComponentProps<typeof GIcon> & {
  color?: any
}

export type IconProps = GIconProps & {
  name: FontAwesomeProps['name']
}

export const Icon = ({ name, color, ...props }: IconProps) => {
  const colorToken = useToken('colors', color)

  return (
    <GIcon
      {...props}
      justifyContent="center"
      color={colorToken}
      w={null}
      h={null}
      as={(innerProps: any) => <FontAwesome name={name} {...innerProps} />}
    />
  )
}
