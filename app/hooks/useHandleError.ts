import { BackendError } from '@/services/api/types'
import { useToast } from './useToast'

import { useTranslate } from '@/services/i18n'
import * as Sentry from '@sentry/react-native'

export const useHandleError = () => {
  const toast = useToast()
  const t = useTranslate(undefined, { keyPrefix: 'api.errors' })

  return (e: BackendError) => {
    const error = e?.response?.data?.error
    const code = error?.code[0]
    const detail = error?.detail[0]

    const title = t(`${code}.title`)

    console.error(e)

    // Unhandled error
    if (!title) {
      Sentry.captureException(e, { extra: { code, detail } })
    }

    console.error(code, detail)
    toast.show({
      title: title || t('default'),
      message: t(`${code}.message`),
      action: 'error',
    })
  }
}
