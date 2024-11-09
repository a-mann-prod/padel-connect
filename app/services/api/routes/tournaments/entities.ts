import { Entity, MatchType, PaginatedResponse } from '../../types'
import { ComplexResponse } from '../complexes'

export type TournamentResponse = Entity<{
  complex: ComplexResponse
  datetime: string
  title: string
  description: string
  type: MatchType
}>

export type TournamentsResponse = PaginatedResponse<TournamentResponse>
