import { useToast } from './useToast'

import { useTranslate } from '@/services/i18n'

export const useHandleSuccess = () => {
  const toast = useToast()
  const t = useTranslate(undefined, { keyPrefix: 'api.success' })

  return ({
    title,
    message,
  }: {
    title?: string
    message?: string
  } = {}) =>
    toast.show({
      title: title || t('default'),
      message,
      action: 'success',
    })
}
