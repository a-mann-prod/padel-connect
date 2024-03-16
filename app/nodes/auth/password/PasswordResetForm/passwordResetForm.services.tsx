import { z } from 'zod'

import { refineFunctions, validators } from '@/services/formValidator'

export type PasswordResetFormValues = z.infer<typeof schema>

const getDefaultValues = (): PasswordResetFormValues => ({
  password: '',
  confirmPassword: '',
})

const schema = z
  .object({
    password: validators.string.password(),
    confirmPassword: validators.string.required(),
  })
  .superRefine(refineFunctions.passwordsMatch)

export const passwordResetFormServices = {
  getDefaultValues,
  schema,
}
