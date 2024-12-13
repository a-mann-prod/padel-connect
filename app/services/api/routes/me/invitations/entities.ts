import {
  Entity,
  NotificationType,
  PaginatedResponse,
} from '@/services/api/types'

export type InvitationResponse = Entity<{
  title: string
  message: string
  type: NotificationType
  is_read: boolean
  associated_data: {
    id?: number
    url?: string
  }
}>

export type InvitationsResponse = PaginatedResponse<InvitationResponse>
