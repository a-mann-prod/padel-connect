import {
  Entity,
  NotificationType,
  PaginatedResponse,
} from '@/services/api/types'

export type NotificationResponse = Entity<{
  title: string
  message: string
  type: NotificationType
  is_read: boolean
  associated_data: {
    id?: number
    url?: string
  }
}>

export type NotificationsResponse = PaginatedResponse<NotificationResponse>

export type UnreadNotificationsCountResponse = number
