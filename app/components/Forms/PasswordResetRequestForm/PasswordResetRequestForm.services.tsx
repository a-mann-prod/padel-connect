import { z } from 'zod'

import { validators } from '@/services/formValidator'

export type PasswordResetRequestFormValues = z.infer<typeof schema>

const getDefaultValues = (): PasswordResetRequestFormValues => ({
  email: '',
})

const schema = z.object({
  email: validators.string.email(),
})

export const passwordResetRequestFormServices = {
  getDefaultValues,
  schema,
}
