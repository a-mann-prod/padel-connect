import { z } from 'zod'

import { InsertMatchParams, MatchResponse } from '@/services/api'
import { validators } from '@/services/formValidator'
import { Database } from '@/services/supabase/database.types'
import { Nillable } from '@/types'

export type MatchFormValues = z.infer<typeof schema>

const getDefaultValues = (
  props?: Nillable<MatchFormValues>
): MatchFormValues => ({
  complex_id: props?.complex_id || '',
  datetime: props?.datetime || '',
  duration: props?.duration || '',
  level: props?.level || '',
  is_private: props?.is_private || false,
  type: props?.type || '',
})

const schema = z.object({
  complex_id: validators.string.required(),
  datetime: validators.string.required(),
  duration: validators.string.required(),
  level: validators.string.required(),
  is_private: validators.boolean.required(),
  type: validators.string.required(),
})

const formatToParams = (props: MatchFormValues): InsertMatchParams => ({
  ...props,
  type: props.type as Database['public']['Enums']['match_type'],
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
