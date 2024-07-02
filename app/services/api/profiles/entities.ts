import { Tables } from '@/services/supabase/database.types'

export type ProfileResponse = Pick<
  Tables<'profiles'>,
  | 'id'
  | 'last_name'
  | 'first_name'
  | 'avatar_url'
  | 'manual_preference'
  | 'side_preference'
  | 'is_onboarding_completed'
  | 'offense_level'
  | 'defense_level'
  | 'service_level'
  | 'is_new_match_notification_enabled'
  | 'is_new_message_notification_enabled'
  | 'updated_at'
  | 'created_at'
>

export type ProfilesResponse = ProfileResponse[]

export const profilesQueryCols =
  'id, last_name, first_name, avatar_url, manual_preference, side_preference, is_onboarding_completed, offense_level, defense_level, service_level, is_new_match_notification_enabled, is_new_message_notification_enabled, updated_at, created_at'
