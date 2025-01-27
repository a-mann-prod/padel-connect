import { MeResponse } from './entities'

export type UpdateMeEmailParams = {
  new_email: string
  re_new_email: string
  current_password: string
}

export type UpdateMePasswordParams = {
  new_password: string
  re_new_password: string
  current_password: string
}

export type DeleteMeParams = {
  current_password: string
}

export type UpdateMeParams = Partial<
  Pick<
    MeResponse,
    | 'language'
    | 'push_token'
    | 'is_onboarding_completed'
    | 'is_new_match_notification_enabled'
    | 'is_new_message_notification_enabled'
  >
>
