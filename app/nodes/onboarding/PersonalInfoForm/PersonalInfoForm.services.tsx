import { validators } from '@/services/formValidator'
import { z } from 'zod'

export type PersonalInfoFormValues = z.infer<typeof schema>

const getDefaultValues = (): PersonalInfoFormValues => ({
  first_name: '',
  last_name: '',
})

const schema = z.object({
  first_name: validators.string.required(),
  last_name: validators.string.required(),
})

export const personalInfoFormServices = {
  getDefaultValues,
  schema,
}
