import { UserFeedback } from '@sentry/react-native'
import { z } from 'zod'

import { validators } from '@/services/formValidator'
import { Nillable } from '@/types'

export type ReportFormValues = Omit<UserFeedback, 'event_id'>

const getDefaultValues = (
  props?: Nillable<ReportFormValues>
): ReportFormValues => ({
  comments: props?.comments || '',
  email: props?.email || '',
  name: props?.name || '',
})

const schema = z.object({
  comments: validators.string.required(),
  email: validators.string.required(),
  name: validators.string.required(),
})

export const reportFormServices = {
  getDefaultValues,
  schema,
}
