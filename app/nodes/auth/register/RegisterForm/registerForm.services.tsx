import { refineFunctions, validators } from '@/services/formValidator'
import { z } from 'zod'
export type RegisterFormValues = z.infer<typeof schema>

const getDefaultValues = (): RegisterFormValues => ({
  email: '',
  password: '',
  confirmPassword: '',
})

const schema = z
  .object({
    email: validators.string.email(),
    password: validators.string.password(),
    confirmPassword: validators.string.required(),
  })
  .superRefine(refineFunctions.passwordsMatch)

export const registerFormServices = {
  getDefaultValues,
  schema,
}
