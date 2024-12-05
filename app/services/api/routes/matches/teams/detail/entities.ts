import {
  DefaultProfileResponse,
  Entity,
  PaginatedResponse,
  RequestStatus,
} from '@/services/api/types'

export type MatchTeamResponse = Entity<{
  participants: DefaultProfileResponse[]
  calculated_level: number
  user: number
  status: RequestStatus
}>

export type MatchTeamsResponse = PaginatedResponse<MatchTeamResponse>

export type MatchTeamRequestResponse = Entity<{
  invitations: MatchTeamInvitationResponse[]
  status: RequestStatus
}>

export type MatchTeamInvitationResponse = Entity<{
  user: DefaultProfileResponse
  status: RequestStatus
}>
