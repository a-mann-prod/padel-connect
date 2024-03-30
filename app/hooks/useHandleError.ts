import { useToast } from './useToast'

import { useTranslate } from '@/services/i18n'

export const useHandleError = () => {
  const toast = useToast()
  const t = useTranslate(undefined, { keyPrefix: 'api.errors' })

  return (e: Error) => {
    console.log(e)
    toast.show({
      title: t([`${e.message}.title`, 'default']),
      message: t(`${e.message}.message`),
      action: 'error',
    })
  }
}
