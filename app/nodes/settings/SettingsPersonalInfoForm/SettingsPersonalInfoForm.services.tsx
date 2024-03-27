import { z } from 'zod'

import { UseMe } from '@/hooks/useMe'
import { validators } from '@/services/formValidator'

export type SettingsPersonalInfoFormValues = z.infer<typeof schema>

const getDefaultValues = (
  data?: UseMe['data'] | null
): SettingsPersonalInfoFormValues => ({
  first_name: data?.first_name || '',
  last_name: data?.last_name || '',
})

const schema = z.object({
  first_name: validators.string.required(),
  last_name: validators.string.required(),
})

export const settingsPersonalInfoFormServices = {
  getDefaultValues,
  schema,
}
