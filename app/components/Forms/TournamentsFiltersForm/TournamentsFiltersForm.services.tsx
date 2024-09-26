import { z } from 'zod'

import { UpdateMatchFilterParams } from '@/services/api'
import { validators } from '@/services/formValidator'
import { Database } from '@/services/supabase/database.types'
import { Nillable } from '@/types'
import { isNilOrEmpty } from '@/utils/global'

export type TournamentsFiltersFormValues = z.infer<typeof schema>

const getDefaultValues = (
  props?: Nillable<TournamentsFiltersFormValues> | null
): TournamentsFiltersFormValues => ({
  complex_id: props?.complex_id || '',
  type: props?.type || '',
  month: props?.month || '',
})

const schema = z.object({
  complex_id: validators.string.optional(),
  type: validators.string.optional(),
  month: validators.string.optional(),
})

const formatToParams = (
  props: TournamentsFiltersFormValues
): UpdateMatchFilterParams => ({
  ...props,
  type: props?.type as Database['public']['Enums']['match_type'],
  complex_id: !isNilOrEmpty(props.complex_id) ? Number(props.complex_id) : null,
})

const formatToFormValues = (
  props: any //MatchTournamentsFilters
): Nillable<TournamentsFiltersFormValues> => {
  if (!props) return {}

  return {
    ...props,
    complex_id: props.complex_id?.toString(),
  }
}

export const TournamentsFiltersFormServices = {
  getDefaultValues,
  schema,
  formatToParams,
  formatToFormValues,
}
