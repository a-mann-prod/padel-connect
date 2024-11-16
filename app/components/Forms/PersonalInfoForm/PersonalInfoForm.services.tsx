import { useMemo } from 'react'
import { z } from 'zod'

import { ChoiceButtonProps } from '@/designSystem'
import { UpdateMeProfileParams } from '@/services/api'
import { ManualPreference, SidePreference } from '@/services/api/types'
import { validators } from '@/services/formValidator'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types/nillable'

export const useManualPreferenceOptions = () => {
  const tGlobal = useTranslate(undefined, { keyPrefix: 'manualPreference' })

  return useMemo<(ChoiceButtonProps & { value: ManualPreference })[]>(
    () => [
      {
        value: ManualPreference.LEFT_HANDED,
        label: tGlobal('left_handed'),
        icon: 'FAR-hand',
        iconProps: {
          inverseX: true,
        },
      },
      {
        value: ManualPreference.RIGHT_HANDED,
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
      {
        value: SidePreference.LEFT,
        label: tGlobal('left'),
        icon: 'FAS-arrow-left',
      },
      {
        value: SidePreference.RIGHT,
        label: tGlobal('right'),
        icon: 'FAS-arrow-right',
      },
      {
        value: SidePreference.BOTH,
        label: tGlobal('both'),
        icon: 'FAS-arrows-left-right',
      },
    ],
    [tGlobal]
  )
}

export type PersonalInfoFormValues = Pick<
  UpdateMeProfileParams,
  'first_name' | 'last_name' | 'manual_preference' | 'side_preference'
>

const getDefaultValues = (
  props?: Nillable<PersonalInfoFormValues>
): PersonalInfoFormValues => ({
  first_name: props?.first_name || '',
  last_name: props?.last_name || '',
  manual_preference: props?.manual_preference || ('' as ManualPreference),
  side_preference: props?.side_preference || ('' as SidePreference),
})

const schema = z.object({
  first_name: validators.string.required(),
  last_name: validators.string.required(),
  manual_preference: validators.string.required(),
  side_preference: validators.string.required(),
})

export const personalInfoFormServices = {
  getDefaultValues,
  schema,
}
