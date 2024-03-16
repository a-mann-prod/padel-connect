import { validators } from '@/services/formValidator'
import { z } from 'zod'

export type LoginFormValues = z.infer<typeof schema>

const getDefaultValues = (): LoginFormValues => ({
  email: '',
  password: '',
})

const schema = z.object({
  email: validators.string.email(),
  password: validators.string.required(),
})

export const loginFormServices = {
  getDefaultValues,
  schema,
}
