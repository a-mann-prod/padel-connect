import { z } from 'zod'

import { InsertMatchParams, MatchResponse } from '@/services/api'
import { validators } from '@/services/formValidator'
import { Nillable } from '@/types'

export type MatchFormValues = z.infer<typeof schema>

const getDefaultValues = (
  props?: Nillable<MatchFormValues>
): MatchFormValues => ({
  complex_id: props?.complex_id || '',
  owner_id: props?.owner_id || '',
  datetime: props?.datetime || '',
  duration: props?.duration || '',
  level: props?.level || '',
  booked_url: props?.booked_url || '',
})

const schema = z.object({
  complex_id: validators.string.required(),
  owner_id: validators.string.required(),
  datetime: validators.string.required(),
  duration: validators.string.required(),
  level: validators.string.required(),
  booked_url: validators.string.optional(),
})

const formatToParams = (props: MatchFormValues): InsertMatchParams => ({
  ...props,
  complex_id: Number(props.complex_id),
  duration: Number(props.duration),
  level: Number(props.level),
})

const formatToFormValues = (
  props: MatchResponse | null | undefined
): Nillable<MatchFormValues> => {
  if (!props) return {}

  return {
    ...props,
    owner_id: props.owner_id,
    complex_id: props.complex?.id.toString(),
    duration: props.duration.toString(),
    level: props.level.toString(),
  }
}

export const matchFormServices = {
  getDefaultValues,
  schema,
  formatToParams,
  formatToFormValues,
}
