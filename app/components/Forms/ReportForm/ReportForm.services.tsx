import { UserFeedback } from '@sentry/react-native'
import { z } from 'zod'

import { FileAsset } from '@/designSystem'
import { validators } from '@/services/formValidator'
import { Nillable } from '@/types'

export type ReportFormValues = Omit<UserFeedback, 'event_id'> & {
  attachment?: FileAsset
}

const getDefaultValues = (
  props?: Nillable<ReportFormValues>
): ReportFormValues => ({
  comments: props?.comments || '',
  email: props?.email || '',
  name: props?.name || '',
  attachment: props?.attachment || undefined,
})

const schema = z.object({
  comments: validators.string.required(),
  email: validators.string.required(),
  name: validators.string.required(),
  attachment: z
    .object({
      fileName: z.string().optional().nullable(),
      mimeType: z.string().optional().nullable(),
      uri: z.string(),
    })
    .optional(),
})

export const reportFormServices = {
  getDefaultValues,
  schema,
}
