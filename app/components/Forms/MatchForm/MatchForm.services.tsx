import { z } from 'zod'

import { CreateMatchParams, MatchResponse } from '@/services/api'
import { validators } from '@/services/formValidator'
import { Nillable } from '@/types'

export type MatchFormValues = z.infer<typeof schema> &
  Pick<CreateMatchParams, 'players' | 'send_invitations'>

const getDefaultValues = (
  props?: Nillable<MatchFormValues>
): MatchFormValues => ({
  complex_id: props?.complex_id || '',
  four_padel_field_id: props?.four_padel_field_id || '',
  four_padel_field_name: props?.four_padel_field_name || '',
  four_padel_field_price: props?.four_padel_field_price || '',
  datetime: props?.datetime || '',
  duration: props?.duration || '',
  is_private: props?.is_private || false,
  is_competitive: props?.is_competitive || false,
  is_open_to_all_level: props?.is_open_to_all_level || false,
  is_super_tie_break: props?.is_super_tie_break || false,
  is_decisive_point: props?.is_decisive_point || false,
})

const schema = z.object({
  complex_id: validators.string.required(),
  four_padel_field_id: validators.string.required(),
  four_padel_field_name: validators.string.required(),
  four_padel_field_price: validators.string.required(),
  datetime: validators.string.required(),
  duration: validators.string.required(),
  is_private: validators.boolean.required(),
  is_competitive: validators.boolean.required(),
  is_open_to_all_level: validators.boolean.required(),
  is_super_tie_break: validators.boolean.optional(),
  is_decisive_point: validators.boolean.optional(),
})

const formatToParams = (props: MatchFormValues): CreateMatchParams => ({
  ...props,
  four_padel_field_id: Number(props.four_padel_field_id),
  four_padel_field_price: Number(props.four_padel_field_price),
  complex_id: Number(props.complex_id),
  duration: Number(props.duration),
})

const formatToFormValues = (props: MatchResponse): MatchFormValues => {
  return {
    ...props,
    four_padel_field_id: props.four_padel_field_id.toString(),
    four_padel_field_price: props.four_padel_field_price.toString(),
    complex_id: props.complex.id.toString(),
    duration: props.duration.toString(),
  }
}

export const matchFormServices = {
  getDefaultValues,
  schema,
  formatToParams,
  formatToFormValues,
}
