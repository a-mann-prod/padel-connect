import * as Sentry from '@sentry/react-native'
import i18next from 'i18next'
import { useEffect, useState } from 'react'
import { initReactI18next } from 'react-i18next'

import { resources } from '../resources'
import { getDefaultNS, getDevicePreferenceLanguage } from '../utils'

import { config } from '@/services/config'

export const useInitLanguage = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    i18next.use(initReactI18next).init(
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
        debug: config.env === 'local',
      },
      (e) => {
        if (e) {
          Sentry.captureException(e)
        }
        setLoaded(true)
      }
    )
  }, [])

  return [loaded]
}
