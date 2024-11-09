import { Entity, MatchType } from '@/services/api/types'

export type MatchFiltersResponse = Entity<{
  complex: number
  level_min: number
  level_max: number
  type: MatchType
}>
