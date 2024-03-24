import { Database } from '@/services/supabase/database.types'

export type ProfileResponse = Database['public']['Tables']['profiles']['Row']

export const queryCols =
  'id, last_name, first_name, avatar_url, is_onboarding_completed, updated_at'
