import { useTranslate } from '@/services/i18n'

export const useDurationItems = () => {
  const t = useTranslate(undefined, { keyPrefix: 'datetime' })

  return [
    { label: t('minute', { count: 90 }), value: '90' },
    {
      label: t('minute', { count: 120 }),
      value: '120',
    },
  ]
}
