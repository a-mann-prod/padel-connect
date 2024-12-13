import { z } from 'zod'

import { CreateMatchParams, MatchResponse } from '@/services/api'
import { validators } from '@/services/formValidator'
import { Nillable } from '@/types'

export type MatchFormValues = z.infer<typeof schema> &
  Pick<CreateMatchParams, 'players'>

const getDefaultValues = (
  props?: Nillable<MatchFormValues>
): MatchFormValues => ({
  complex_id: props?.complex_id || '',
  datetime: props?.datetime || '',
  duration: props?.duration || '',
  level: props?.level || '',
  is_private: props?.is_private || false,
  is_competitive: props?.is_competitive || false,
  is_open_to_all_level: props?.is_open_to_all_level || false,
})

const schema = z.object({
  complex_id: validators.string.required(),
  datetime: validators.string.required(),
  duration: validators.string.required(),
  level: validators.string.required(),
  is_private: validators.boolean.required(),
  is_competitive: validators.boolean.required(),
  is_open_to_all_level: validators.boolean.required(),
})

const formatToParams = (props: MatchFormValues): CreateMatchParams => ({
  ...props,
  complex_id: Number(props.complex_id),
  duration: Number(props.duration),
  level: Number(props.level),
})

const formatToFormValues = (props: MatchResponse): MatchFormValues => {
  return {
    ...props,
    complex_id: props.complex.id.toString(),
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
