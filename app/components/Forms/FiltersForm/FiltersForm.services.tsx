import { z } from 'zod'

import { MatchFilters } from '@/contexts'
import { UpdateMatchFiltersParams } from '@/services/api'
import { MatchType } from '@/services/api/types'
import { validators } from '@/services/formValidator'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'
import { isNilOrEmpty } from '@/utils/global'

export type FiltersFormValues = z.infer<typeof schema>

const getDefaultValues = (
  props?: Nillable<FiltersFormValues> | null
): FiltersFormValues => ({
  complex: props?.complex || '',
  level_min: props?.level_min || 0,
  level_max: props?.level_max || 10,
  type: props?.type || '',
})

const schema = z.object({
  complex: validators.string.optional(),
  level_min: validators.number.required(),
  level_max: validators.number.required(),
  type: validators.string.optional(),
})

const formatToParams = (
  props: FiltersFormValues
): UpdateMatchFiltersParams => ({
  ...props,
  type: (!isNilOrEmpty ? props.type : null) as MatchType,
  complex: (!isNilOrEmpty(props.complex) ? Number(props.complex) : null) as
    | number
    | undefined,
})

const formatToFormValues = (
  props: MatchFilters
): Nillable<FiltersFormValues> => {
  if (!props) return {}

  return {
    ...props,
    complex: props.complex?.toString(),
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
