import i18next from 'i18next'
import ICU from 'i18next-icu'
import { useEffect, useState } from 'react'
import { initReactI18next } from 'react-i18next'
import { resources } from '../resources'
import { getDefaultNS, getDevicePreferenceLanguage } from '../utils'

export const useInitLanguage = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    i18next
      .use(ICU)
      .use(initReactI18next)
      .init(
        {
          compatibilityJSON: 'v3',
          resources,
          fallbackLng: getDevicePreferenceLanguage(),
          defaultNS: getDefaultNS('global'),
          interpolation: {
            escapeValue: false,
          },
          initImmediate: false,
          parseMissingKeyHandler: () => '',
        },
        () => setLoaded(true)
      )
  }, [])

  return [loaded]
}
