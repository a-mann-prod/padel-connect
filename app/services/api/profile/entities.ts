import { Tables } from '@/services/supabase/database.types'

export type ProfileResponse = Tables<'profiles'>

export const queryCols =
  'id, last_name, first_name, avatar_url, is_onboarding_completed, updated_at'
