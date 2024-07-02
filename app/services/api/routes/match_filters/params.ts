import { Database } from '@/services/supabase/database.types'

export type GetMatchFilterParams = {
  userId: string
}

export type UpdateMatchFilterParams =
  Database['public']['Tables']['match_filters']['Update']
