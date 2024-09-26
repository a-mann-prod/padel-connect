import { Icon, IconProps } from '@/designSystem'
import { Database } from '@/services/supabase/database.types'
import { mapTypeToIcon } from '@/utils/matchType'

type MatchTypeIconProps = {
  type: Database['public']['Enums']['match_type']
} & IconProps

export const MatchTypeIcon = ({ type, ...props }: MatchTypeIconProps) => {
  return <Icon name={mapTypeToIcon[type]} {...props} />
}
