import { z } from 'zod'

import { validators } from '@/services/formValidator'
import { Nillable } from '@/types'

export type LevelEstimationFormValues = z.infer<typeof schema>

const getDefaultValues = (
  props?: Nillable<LevelEstimationFormValues>
): LevelEstimationFormValues => ({
  level: props?.level || '',
})

const schema = z.object({
  level: validators.string.required(),
})

export const LevelEstimationFormServices = {
  getDefaultValues,
  schema,
}
