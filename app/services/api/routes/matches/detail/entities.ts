import {
  DefaultMinimalProfileResponse,
  Entity,
  PaginatedResponse,
} from '../../../types'
import { ComplexResponse } from '../../complexes'

export type MatchResponse = Entity<{
  complex: ComplexResponse
  datetime: string
  duration: number
  is_private: boolean
  level: number
  calculated_level_range: [number, number]
  is_competitive: boolean
  is_reserved: boolean
  is_open_to_all_level: boolean
  user: number
  teams: {
    id: number
    participants: DefaultMinimalProfileResponse[]
    user: number
  }[]
}>

export type MatchesResponse = PaginatedResponse<
  Omit<MatchResponse, 'complex'> & {
    is_request: boolean
    complex: number
  }
>
