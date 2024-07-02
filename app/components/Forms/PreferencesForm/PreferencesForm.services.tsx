import { useMemo } from 'react'
import { z } from 'zod'

import { ChoiceButtonProps } from '@/designSystem'
import { validators } from '@/services/formValidator'
import { useTranslate } from '@/services/i18n'
import { Database } from '@/services/supabase/database.types'
import { Nillable } from '@/types'

export type PreferencesFormValues = {
  manual_preference: ManualPreference | null | undefined
  side_preference: SidePreference | null | undefined
}

type ManualPreference = Database['public']['Enums']['manual_preference']
type SidePreference = Database['public']['Enums']['side_preference']

const getDefaultValues = (
  props?: Nillable<PreferencesFormValues>
): PreferencesFormValues => ({
  manual_preference: props?.manual_preference || null,
  side_preference: props?.side_preference || null,
})

const schema = z.object({
  manual_preference: validators.string.required(),
  side_preference: validators.string.required(),
})

export const useManualPreferenceOptions = () => {
  const tGlobal = useTranslate(undefined, { keyPrefix: 'manualPreference' })

  return useMemo<(ChoiceButtonProps & { value: ManualPreference })[]>(
    () => [
      {
        value: 'LEFT_HANDED',
        label: tGlobal('left_handed'),
        icon: 'FAR-hand',
        iconProps: {
          inverseX: true,
        },
      },
      {
        value: 'RIGHT_HANDED',
        label: tGlobal('right_handed'),
        icon: 'FAR-hand',
      },
    ],
    [tGlobal]
  )
}

export const useSidePreferenceOptions = () => {
  const tGlobal = useTranslate(undefined, { keyPrefix: 'sidePreference' })

  return useMemo<(ChoiceButtonProps & { value: SidePreference })[]>(
    () => [
      { value: 'LEFT', label: tGlobal('left'), icon: 'FAS-arrow-left' },
      { value: 'RIGHT', label: tGlobal('right'), icon: 'FAS-arrow-right' },
      { value: 'BOTH', label: tGlobal('both'), icon: 'FAS-arrows-left-right' },
    ],
    [tGlobal]
  )
}

export const preferencesFormServices = {
  getDefaultValues,
  schema,
}
