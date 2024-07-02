import { Database } from '@/services/supabase/database.types'

export type GetProfileParams = {
  id: string
}

export type GetProfilesParams = {
  ids?: string[]
  current_user_id?: string
  search?: string
}

export type UpdateProfileParams =
  Database['public']['Tables']['profiles']['Update']
