import { useToast } from './useToast'

import { useTranslate } from '@/services/i18n'

export const useHandleError = () => {
  const toast = useToast()
  const t = useTranslate(undefined, { keyPrefix: 'api.errors' })

  return (e: Error) => {
    const message = e.message.toLowerCase()
    console.error(e)
    toast.show({
      title: t([`${message}.title`, 'default']),
      message: t(`${message}.message`),
      action: 'error',
    })
  }
}
