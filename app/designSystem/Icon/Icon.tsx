import { Icon as GIcon, useToken } from '@gluestack-ui/themed'

import { FontAwesome, FontAwesomeProps } from './FontAwesome/FontAwesome'

export type IconProps = typeof GIcon.defaultProps & {
  name: FontAwesomeProps['name']
  color?: any
}

export const Icon = ({ name, color, ...props }: IconProps) => {
  const colorToken = useToken('colors', color)

  return (
    <GIcon
      {...props}
      justifyContent="center"
      color={colorToken}
      as={(innerProps: any) => <FontAwesome name={name} {...innerProps} />}
    />
  )
}
