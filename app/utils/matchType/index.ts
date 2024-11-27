import { IconNameProp } from '@/designSystem'

export const getMatchTypeIcon = (isCompetitive: boolean): IconNameProp =>
  isCompetitive ? 'FAS-trophy' : 'FAR-hand-peace'

export const getMatchTypeKey = (isCompetitive: boolean): string =>
  `matchType.${isCompetitive ? 'competition' : 'leisure'}`
