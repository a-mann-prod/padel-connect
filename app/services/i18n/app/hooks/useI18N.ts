import { useTranslation } from 'react-i18next'

import { Language } from '../types'

export const useI18N = () => {
  const { i18n } = useTranslation()
  const { language: i18nLang, ...rest } = i18n

  return { language: i18nLang as Language, ...rest }
}
