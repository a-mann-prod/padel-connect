import { Icon as GIcon, useToken } from '@gluestack-ui/themed'

import { FontAwesome, FontAwesomeProps } from './FontAwesome/FontAwesome'

export type IconProps = typeof GIcon.defaultProps & {
  name: FontAwesomeProps['name']
}

// @ts-ignore
export const Icon = ({ name, color, ...props }: IconProps) => {
  const colorToken = useToken('colors', color)

  return (
    <GIcon
      {...props}
      justifyContent="center"
      color={colorToken}
      w={'unset' as any}
      h={'unset' as any}
      as={(innerProps: any) => <FontAwesome name={name} {...innerProps} />}
    />
  )
}
