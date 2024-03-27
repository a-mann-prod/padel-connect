import { z } from 'zod'

import { validators } from '@/services/formValidator'

export type EmailChangeFormValues = z.infer<typeof schema>

const getDefaultValues = (): EmailChangeFormValues => ({
  email: '',
})

const schema = z.object({
  email: validators.string.email(),
})

export const emailChangeFormServices = {
  getDefaultValues,
  schema,
}
