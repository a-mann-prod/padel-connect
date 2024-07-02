import { z } from 'zod'

import { UpdateProfileParams } from '@/services/api'
import { validators } from '@/services/formValidator'
import { Nillable } from '@/types'

export type NotificationAlertsFormValues = Pick<
  UpdateProfileParams,
  'is_new_match_notification_enabled' | 'is_new_message_notification_enabled'
>

const getDefaultValues = (
  props?: Nillable<NotificationAlertsFormValues>
): NotificationAlertsFormValues => ({
  is_new_match_notification_enabled:
    props?.is_new_match_notification_enabled || false,
  is_new_message_notification_enabled:
    props?.is_new_message_notification_enabled || false,
})

const schema = z.object({
  is_new_match_notification_enabled: validators.boolean.required(),
  is_new_message_notification_enabled: validators.boolean.required(),
})

export const NotificationAlertsFormServices = {
  getDefaultValues,
  schema,
}
