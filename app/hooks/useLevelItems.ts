import { useTranslate } from '@/services/i18n'
import { iterate } from '@/utils/array'

export const LEVEL_MIN = 1
export const LEVEL_MAX = 10

export const useLevelItems = () => {
  const t = useTranslate()

  return iterate(LEVEL_MAX).map((level) => {
    const value = (level + 1).toString()
    return {
      value,
      label: `${t('level')} ${value}`,
    }
  })
}
