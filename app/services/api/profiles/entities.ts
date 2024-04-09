import { Tables } from '@/services/supabase/database.types'

export type ProfileResponse = Tables<'profiles'>

export type ProfilesResponse = Tables<'profiles'>[]

export const profilesQueryCols =
  'id, last_name, first_name, avatar_url, manual_preference, side_preference, is_onboarding_completed, updated_at'
