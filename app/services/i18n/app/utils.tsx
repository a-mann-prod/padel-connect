import { getLocales } from 'expo-localization'

import { Namespace } from './resources'
import { Language } from './types'

export const getDefaultNS = (ns: Namespace) => ns

export const getDevicePreferenceLanguage = () =>
  getLocales()[0].languageCode as Language

export const getFallbackLanguage = (): Language => 'en'
