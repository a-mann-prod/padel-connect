import { useTranslate } from '@/services/i18n'
import { useToast } from './useToast'

export const useHandleError = () => {
  const toast = useToast()
  const t = useTranslate(undefined, { keyPrefix: 'errors.api' })

  return (e: Error) =>
    toast.show({
      title: t([`${e.message}.title`, 'default']),
      message: t(`${e.message}.message`),
      action: 'error',
    })
}
