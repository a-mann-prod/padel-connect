import { useToast } from './useToast'

import { useTranslate } from '@/services/i18n'

export const useHandleError = () => {
  const toast = useToast()
  const t = useTranslate(undefined, { keyPrefix: 'api.errors' })

  return (e: Error) => {
    // clean error code
    const message = e.message.toLowerCase().replaceAll('.', '')
    console.error(e, message)
    toast.show({
      title: t([`${message}.title`, 'default']),
      message: t(`${message}.message`),
      action: 'error',
    })
  }
}
