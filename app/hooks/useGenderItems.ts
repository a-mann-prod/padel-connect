import { Sex } from '@/services/api/types'
import { useTranslate } from '@/services/i18n'

export const useGenderItems = () => {
  const t = useTranslate(undefined, { keyPrefix: 'gender' })
  const genders: Sex[] = [Sex.FEMALE, Sex.MALE, Sex.MIXED]

  return (
    genders.map((key) => ({
      value: key,
      label: t(key.toLowerCase()),
    })) || []
  )
}
