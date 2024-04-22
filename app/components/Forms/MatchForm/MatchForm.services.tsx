import { z } from 'zod'

import { validators } from '@/services/formValidator'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'
import { iterate } from '@/utils/array'

export const useLevelItems = () => {
  const t = useTranslate()

  return iterate(10).map((level) => {
    const value = (level + 1).toString()
    return {
      value,
      label: `${t('level')} ${value}`,
    }
  })
}

export const useDurationItems = () => {
  const t = useTranslate(undefined, { keyPrefix: 'datetime' })

  return [
    { label: t('minute', { count: 60 }), value: '60' },
    { label: t('minute', { count: 90 }), value: '90' },
    {
      label: t('minute', { count: 120 }),
      value: '120',
    },
  ]
}

export type MatchFormValues = z.infer<typeof schema>

const getDefaultValues = (
  props?: Nillable<MatchFormValues>
): MatchFormValues => ({
  complex_id: props?.complex_id || '',
  owner_id: props?.owner_id || '',
  datetime: props?.datetime || '',
  duration: props?.duration || '',
  price: props?.price || '',
  level: props?.level || '',
  booked_url: props?.booked_url || '',
})

const schema = z.object({
  complex_id: validators.string.required(),
  owner_id: validators.string.required(),
  datetime: validators.string.required(),
  duration: validators.string.required(),
  price: validators.string.required(),
  level: validators.string.required(),
  booked_url: validators.string.optional(),
})

export const matchFormServices = {
  getDefaultValues,
  schema,
}
