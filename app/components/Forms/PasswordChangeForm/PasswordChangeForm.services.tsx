import { z } from 'zod'

import { UpdateMePasswordParams } from '@/services/api'
import { refineFunctions, validators } from '@/services/formValidator'

export type PasswordChangeFormValues = UpdateMePasswordParams

const getDefaultValues = (): PasswordChangeFormValues => ({
  current_password: '',
  new_password: '',
  re_new_password: '',
})

const schema = z
  .object({
    new_password: validators.string.password(),
    re_new_password: validators.string.required(),
    current_password: validators.string.required(),
  })
  .superRefine(refineFunctions.passwordsMatch)

export const passwordChangeFormServices = {
  getDefaultValues,
  schema,
}
