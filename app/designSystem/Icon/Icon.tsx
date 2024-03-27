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

export type IconProps = typeof GIcon.defaultProps & {
  name: IconName
  color?: any
}

export const Icon = ({ name, ...props }: IconProps) => {
  const color = useToken('colors', props?.color)

  return (
    <GIcon
      {...props}
      as={(innerProps: any) => (
        <FontAwesome name={name} {...innerProps} color={color} />
      )}
    />
  )
}
