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
  .superRefine(({ password, confirmPassword }, ctx) =>
    refineFunctions.passwordsMatch(
      { password1: password, password2: confirmPassword },
      ctx
    )
  )

export const passwordResetFormServices = {
  getDefaultValues,
  schema,
}
