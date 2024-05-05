import { Database } from '@/services/supabase/database.types'

export type GetMatchRequestParams = {
  match_id: number
  user_id: string
}

export type GetMatchRequestsParams = {
  match_id: number
  search?: string
}

export type InsertMatchRequestParams =
  Database['public']['Tables']['match_requests']['Insert']

export type UpdateMatchRequestParams =
  Database['public']['Tables']['match_requests']['Update']

export type DeleteMatchRequestParams = {
  match_id: number
  user_id: string
}
