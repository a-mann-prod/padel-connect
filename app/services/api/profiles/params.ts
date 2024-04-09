import { Database } from '@/services/supabase/database.types'

export type GetProfileParams = {
  id: string
}

export type GetProfilesParams = {
  current_user_id: string
}

export type UpdateProfileParams =
  Database['public']['Tables']['profiles']['Update']
