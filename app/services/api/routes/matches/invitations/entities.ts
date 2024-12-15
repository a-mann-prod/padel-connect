import { Entity, PaginatedResponse } from '@/services/api/types'
import { MatchTeamInvitationResponse } from '../teams'

export type MatchInvitationResponse = Entity<{
  team: Entity<{
    invitations: MatchTeamInvitationResponse[]
    user: number
  }>
}>

export type MatchInvitationsResponse =
  PaginatedResponse<MatchInvitationResponse>
