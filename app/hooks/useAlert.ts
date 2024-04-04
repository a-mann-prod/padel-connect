import { useCallback } from 'react'
import { Alert, AlertButton } from 'react-native'

import { useTranslate } from '@/services/i18n'

type AlertButtonsProps = {
  onContinueCallback?: () => void
}

type ShowProps = {
  message: string
} & Pick<AlertButtonsProps, 'onContinueCallback'>

export const useAlert = () => {
  const tGlobal = useTranslate()

  const renderAlertButtons = useCallback(
    ({ onContinueCallback }: AlertButtonsProps): AlertButton[] => [
      {
        text: tGlobal('continue'),
        style: 'destructive',
        onPress: onContinueCallback,
      },
      { text: tGlobal('cancel'), style: 'default' },
    ],
    [tGlobal]
  )

  const show = useCallback(
    ({ message, onContinueCallback }: ShowProps) =>
      Alert.alert(
        tGlobal('warning'),
        message,
        renderAlertButtons({ onContinueCallback })
      ),
    [renderAlertButtons, tGlobal]
  )

  return { show }
}
