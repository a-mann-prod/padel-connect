import { z } from 'zod'

import { MatchFilterResponse, UpdateMatchFilterParams } from '@/services/api'
import { validators } from '@/services/formValidator'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'
import { isNilOrEmpty } from '@/utils/global'
import { getLevelRange } from '@/utils/level'

export type FiltersFormValues = z.infer<typeof schema>

const getDefaultValues = (
  props?: Nillable<FiltersFormValues> | null
): FiltersFormValues => ({
  complex_id: props?.complex_id || '',
  is_my_level_range: props?.is_my_level_range || false,
})

const schema = z.object({
  complex_id: validators.string.optional(),
  is_my_level_range: validators.boolean.required(),
})

const formatToParams = (props: FiltersFormValues): UpdateMatchFilterParams => ({
  ...props,
  complex_id: !isNilOrEmpty(props.complex_id) ? Number(props.complex_id) : null,
})

const formatToFormValues = (
  props: MatchFilterResponse | null | undefined
): Nillable<FiltersFormValues> => {
  if (!props) return {}

  return {
    ...props,
    complex_id: props.complex_id?.toString(),
  }
}

export const useDisplayLevelHelpMessage = () => {
  const t = useTranslate()

  return (currentLevel = 0) => {
    const [min, max] = getLevelRange(currentLevel)
    return t('levelRangeHelpMessage', { min, max })
  }
}

export const FiltersFormServices = {
  getDefaultValues,
  schema,
  formatToParams,
  formatToFormValues,
}
