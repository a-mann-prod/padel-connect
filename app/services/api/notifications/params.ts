import { Database } from '@/services/supabase/database.types'

export type GetNotificationsParams = {
  user_id: string
}

export type UpdateNotificationsParams =
  Database['public']['Tables']['notifications']['Update']
