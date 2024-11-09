import { Entity, MatchType, PaginatedResponse } from '../../../types'
import { ComplexResponse } from '../../complexes'

export type MatchResponse = Entity<{
  complex: ComplexResponse
  datetime: string
  duration: number
  is_private: boolean
  level: number
  type: MatchType
  user: number
}>

export type MatchesResponse = PaginatedResponse<MatchResponse>
