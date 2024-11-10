import { z } from 'zod'

import { GetInfiniteTournamentsParams } from '@/services/api'
import { MatchType } from '@/services/api/types'
import { validators } from '@/services/formValidator'
import { isNilOrEmpty } from '@/utils/global'

export type TournamentsFiltersFormValues = z.infer<typeof schema>

const getDefaultValues = (
  props?: TournamentsFiltersFormValues
): TournamentsFiltersFormValues => ({
  complex: props?.complex || '',
  type: props?.type || '',
  month: props?.month || '',
})

const schema = z.object({
  complex: validators.string.optional(),
  type: validators.string.optional(),
  month: validators.string.optional(),
})

const formatToParams = (
  props: TournamentsFiltersFormValues
): GetInfiniteTournamentsParams => ({
  ...props,
  month: props?.month || undefined,
  type: props?.type as MatchType,
  complex: !isNilOrEmpty(props.complex) ? Number(props.complex) : undefined,
})

const formatToFormValues = (
  props: GetInfiniteTournamentsParams
): TournamentsFiltersFormValues => {
  if (!props) return {}

  return {
    ...props,
    complex: props.complex?.toString(),
  }
}

export const tournamentsFiltersFormServices = {
  getDefaultValues,
  schema,
  formatToParams,
  formatToFormValues,
}
