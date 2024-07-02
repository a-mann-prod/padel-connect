import { z } from 'zod'

import { refineFunctions, validators } from '@/services/formValidator'

export type PasswordChangeFormValues = z.infer<typeof schema>

const getDefaultValues = (): PasswordChangeFormValues => ({
  password: '',
  confirmPassword: '',
})

const schema = z
  .object({
    password: validators.string.password(),
    confirmPassword: validators.string.required(),
  })
  .superRefine(refineFunctions.passwordsMatch)

export const passwordChangeFormServices = {
  getDefaultValues,
  schema,
}
