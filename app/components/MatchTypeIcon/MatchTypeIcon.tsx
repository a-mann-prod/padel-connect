import { Icon, IconProps } from '@/designSystem'
import { MatchType } from '@/services/api/types'
import { mapTypeToIcon } from '@/utils/matchType'

type MatchTypeIconProps = {
  type: MatchType
} & IconProps

export const MatchTypeIcon = ({ type, ...props }: MatchTypeIconProps) => {
  return <Icon name={mapTypeToIcon[type]} {...props} />
}
