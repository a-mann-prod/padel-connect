import FontAwesome from '@expo/vector-icons/FontAwesome6'
import { Icon as GIcon, useToken } from '@gluestack-ui/themed'

export type IconName =
  | 'user-gear'
  | 'house'
  | 'google'
  | 'apple'
  | 'user-large'
  | 'key'
  | 'fingerprint'
  | 'chevron-right'
  | 'file-lines'
  | 'arrow-right-from-bracket'
  | 'mug-hot'
  | 'message'
  | 'file-contract'
  | 'up-right-from-square'
  | 'shield-halved'
  | 'code-merge'
  | 'comment'
  | 'circle-xmark'
  | 'power-off'
  | 'user'
  | 'pen'
  | 'circle-exclamation'
  | 'at'
  | 'gear'
  | 'gears'
  | 'trash'
  | 'radiation'

export type IconProps = typeof GIcon.defaultProps & {
  name: IconName
  color?: any
}

export const Icon = ({ name, color, ...props }: IconProps) => {
  const colorToken = useToken('colors', color)

  return (
    <GIcon
      {...props}
      color={colorToken}
      as={(innerProps: any) => <FontAwesome name={name} {...innerProps} />}
    />
  )
}
