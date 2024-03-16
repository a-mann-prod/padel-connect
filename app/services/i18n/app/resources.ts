import { keys } from 'remeda'

import { translations } from './translations'
import { availableLanguages } from './types'

export type Namespace = keyof typeof translations

type TranslationKey = keyof typeof translations

export const resources = availableLanguages.reduce(
  (acc, lng) => ({
    ...acc,
    [lng]: keys(translations).reduce(
      (acc, key) => ({
        ...acc,
        [key]: translations[key as TranslationKey][lng],
      }),
      {}
    ),
  }),
  {}
)
