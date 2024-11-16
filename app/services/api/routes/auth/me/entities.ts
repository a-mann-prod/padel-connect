import { Language } from '@/services/api/types'

export type MeResponse = {
  id: number
  email: string
  push_token: string
  language: Language
  is_onboarding_completed: boolean
  is_new_match_notification_enabled: boolean
  is_new_message_notification_enabled: boolean
}
