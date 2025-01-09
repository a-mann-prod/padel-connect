import { getLocales } from 'expo-localization'

import { Namespace } from './resources'
import { Language } from './types'

export const getDefaultNS = (ns: Namespace) => ns

export const getDevicePreferenceLanguage = () => {
  const locale = getLocales()[0].languageCode as Language
  if (!['fr', 'en'].includes(locale)) return getFallbackLanguage()
  return locale
}

export const getFallbackLanguage = (): Language => 'fr'
