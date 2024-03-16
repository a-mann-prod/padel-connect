export type ProfileResponse = {
  last_name?: string
  first_name?: string
  avatar_url?: string
  is_onboarding_completed?: boolean
} | null

export const queryCols =
  'last_name, first_name, avatar_url, is_onboarding_completed'
