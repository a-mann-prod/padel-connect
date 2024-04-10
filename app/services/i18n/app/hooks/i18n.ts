import i18next from 'i18next'

import { Language } from '../types'

export const i18n = () => ({
  ...i18next,
  language: i18next.language as Language,
})
