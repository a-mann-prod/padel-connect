import {
  DefaultProfileResponse,
  Entity,
  RequestStatus,
} from '@/services/api/types'

export type MatchTeamInvitationResponse = Entity<{
  user: DefaultProfileResponse
  status: RequestStatus
}>
