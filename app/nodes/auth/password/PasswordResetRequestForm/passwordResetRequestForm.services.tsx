import { validators } from '@/services/formValidator'
import { z } from 'zod'

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
