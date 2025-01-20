import {
  DefaultMinimalProfileResponse,
  Entity,
  PaginatedResponse,
} from '@/services/api/types'
import { ComplexResponse } from '../../complexes'

export type MatchArchiveResponse = Entity<{
  user?: DefaultMinimalProfileResponse
  complex: ComplexResponse
  datetime: string
  duration: number
  is_open_to_all_level: boolean
  is_competitive: boolean
  calculated_level_range: [number, number]
  level: number
  team_1_users: DefaultMinimalProfileResponse[]
  team_2_users: DefaultMinimalProfileResponse[]
  four_padel_field_name: string
}>

export type MatchesArchiveResponse = PaginatedResponse<
  Omit<MatchArchiveResponse, 'complex' | 'user'> & {
    complex: number
  }
>
