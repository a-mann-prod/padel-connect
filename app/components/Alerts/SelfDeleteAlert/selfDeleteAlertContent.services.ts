import { z } from 'zod'

import { validators } from '@/services/formValidator'

export type SelfDeleteFormValues = z.infer<typeof schema>

const getDefaultValues = (): SelfDeleteFormValues => ({
  password: '',
})

const schema = z.object({
  password: validators.string.required(),
})

export const selfDeleteAlertServices = {
  getDefaultValues,
  schema,
}
