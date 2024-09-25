import { z } from 'zod'

import { MatchFilters } from '@/contexts'
import { UpdateMatchFilterParams } from '@/services/api'
import { validators } from '@/services/formValidator'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'
import { isNilOrEmpty } from '@/utils/global'

export type FiltersFormValues = z.infer<typeof schema>

const getDefaultValues = (
  props?: Nillable<FiltersFormValues> | null
): FiltersFormValues => ({
  complex_id: props?.complex_id || '',
  level_range: props?.level_range || [0, 10],
  match_type: props?.match_type || '',
})

const schema = z.object({
  complex_id: validators.string.optional(),
  level_range: validators.number.required().array(),
  match_type: validators.string.optional(),
})

const formatToParams = (props: FiltersFormValues): UpdateMatchFilterParams => ({
  ...props,
  complex_id: !isNilOrEmpty(props.complex_id) ? Number(props.complex_id) : null,
})

const formatToFormValues = (
  props: MatchFilters
): Nillable<FiltersFormValues> => {
  if (!props) return {}

  return {
    ...props,
    complex_id: props.complex_id?.toString(),
  }
}

export const useDisplayLevelHelpMessage = () => {
  const t = useTranslate()

  return ([min, max]: number[]) => {
    return t('levelRangeHelpMessage', { min, max })
  }
}

export const FiltersFormServices = {
  getDefaultValues,
  schema,
  formatToParams,
  formatToFormValues,
}
