import {
  DefaultProfileResponse,
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
  is_competitive: boolean
  is_reserved: boolean
  user: number
  teams: {
    id: number
    participants: number[]
    user: number
  }[]
}>

export type MatchesResponse = PaginatedResponse<
  Omit<MatchResponse, 'complex' | 'teams'> & {
    complex: number
    teams: {
      id: number
      participants: Pick<DefaultProfileResponse, 'id' | 'avatar_url'>[]
      user: number
    }[]
  }
>
