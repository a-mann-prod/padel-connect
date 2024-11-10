import { IconNameProp } from '@/designSystem'
import { MatchType } from '@/services/api/types'

export const mapTypeToIcon: Record<MatchType, IconNameProp> = {
  COMPETITION: 'FAS-trophy',
  LEISURE: 'FAR-hand-peace',
}
