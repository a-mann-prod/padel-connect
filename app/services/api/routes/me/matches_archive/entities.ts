import {
  DefaultMinimalProfileResponse,
  Entity,
  PaginatedResponse,
} from '@/services/api/types'

export type MatcheArchiveResponse = Entity<{
  complex: number
  datetime: string
  duration: number
  is_open_to_all_level: boolean
  is_competitive: boolean
  calculated_level_range: [number, number]
  level: number
  participants: DefaultMinimalProfileResponse[]
}>

export type MatchesArchiveResponse = PaginatedResponse<MatcheArchiveResponse>
