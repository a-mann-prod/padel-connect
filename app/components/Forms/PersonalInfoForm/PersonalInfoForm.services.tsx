import { z } from 'zod'

import { validators } from '@/services/formValidator'
import { Nillable } from '@/types/nillable'

export type PersonalInfoFormValues = z.infer<typeof schema>

const getDefaultValues = (
  props?: Nillable<PersonalInfoFormValues>
): PersonalInfoFormValues => ({
  first_name: props?.first_name || '',
  last_name: props?.last_name || '',
})

const schema = z.object({
  first_name: validators.string.required(),
  last_name: validators.string.required(),
})

export const personalInfoFormServices = {
  getDefaultValues,
  schema,
}
