import {
  DefaultProfileResponse,
  Entity,
  PaginatedResponse,
} from '../../../types'

export type MatchTeamResponse = Entity<{
  participants: DefaultProfileResponse[]
  calculated_level: number
  user: number
}>

export type MatchTeamsResponse = PaginatedResponse<MatchTeamResponse>
