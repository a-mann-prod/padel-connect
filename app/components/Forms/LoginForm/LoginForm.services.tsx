import { z } from 'zod'

import { validators } from '@/services/formValidator'

export type LoginFormValues = z.infer<typeof schema>

const getDefaultValues = (): LoginFormValues => ({
  // TODO A REMOVE
  email: 'littojustine@gmail.com',
  password: 'Je@ndupond25',
})

const schema = z.object({
  email: validators.string.email(),
  password: validators.string.required(),
})

export const loginFormServices = {
  getDefaultValues,
  schema,
}
