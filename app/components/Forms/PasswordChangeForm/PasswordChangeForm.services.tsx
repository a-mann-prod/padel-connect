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
  .superRefine(({ new_password, re_new_password }, ctx) =>
    refineFunctions.passwordsMatch(
      { password1: new_password, password2: re_new_password },
      ctx
    )
  )

export const passwordChangeFormServices = {
  getDefaultValues,
  schema,
}
