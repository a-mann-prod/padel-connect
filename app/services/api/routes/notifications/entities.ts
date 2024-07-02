import { Tables } from '@/services/supabase/database.types'

export type NotificationResponse = Tables<'notifications'>

export type NotificationsResponse = Tables<'notifications'>[]

export const getNotificationsQueryCols =
  'id, title, subtitle, type, is_read, url, user_id, created_at'
