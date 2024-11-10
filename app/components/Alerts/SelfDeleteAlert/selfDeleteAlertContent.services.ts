import { z } from 'zod'

import { DeleteMeParams } from '@/services/api'
import { validators } from '@/services/formValidator'

export type SelfDeleteFormValues = DeleteMeParams

const getDefaultValues = (): SelfDeleteFormValues => ({
  current_password: '',
})

const schema = z.object({
  current_password: validators.string.required(),
})

export const selfDeleteAlertServices = {
  getDefaultValues,
  schema,
}
