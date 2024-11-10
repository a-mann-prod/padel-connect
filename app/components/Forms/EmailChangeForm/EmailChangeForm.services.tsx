import { z } from 'zod'

import { UpdateMeEmailParams } from '@/services/api'
import { validators } from '@/services/formValidator'

export type EmailChangeFormValues = UpdateMeEmailParams

const getDefaultValues = (): EmailChangeFormValues => ({
  new_email: '',
  re_new_email: '',
  current_password: '',
})

const schema = z.object({
  new_email: validators.string.email(),
  re_new_email: validators.string.email(),
  current_password: validators.string.required(),
})

export const emailChangeFormServices = {
  getDefaultValues,
  schema,
}
