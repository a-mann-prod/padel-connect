import { Entity, PaginatedResponse } from '../../types'
import { ComplexResponse } from '../complexes'

export type TournamentResponse = Entity<{
  complex: ComplexResponse
  datetime: string
  title: string
  description: string
  is_competitive: boolean
}>

export type TournamentsResponse = PaginatedResponse<TournamentResponse>
