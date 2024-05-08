import { Database } from '@/services/supabase/database.types'

export type GetMessageParams = {
  id: number
}

export type GetMessagesParams = {
  match_id: number
}

export type InsertMessagesParams =
  Database['public']['Tables']['messages']['Insert']
