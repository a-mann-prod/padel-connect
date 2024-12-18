import { Text, VStack } from '@gluestack-ui/themed'
import * as AuthSession from 'expo-auth-session'
import { router } from 'expo-router'
import { Share } from 'react-native'

import { Actionsheet, ActionsheetProps, Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export type ShareMatchActionsheetProps = ActionsheetProps & {
  matchPath: string
  matchId: number
}

export const ShareMatchActionsheet = ({
  matchPath,
  matchId,
  ...props
}: ShareMatchActionsheetProps) => {
  const t = useTranslate('match')

  const onPressInApp = () => {
    router.navigate(routing.matchShareMatch.path(matchId))
    props.onClose?.()
  }

  const onPressOutApp = () => {
    Share.share({
      url: AuthSession.makeRedirectUri({ path: matchPath }),
      message: t('shareMessage'),
    })
    props.onClose?.()
  }

  return (
    <Actionsheet {...props}>
      <VStack py="$3" gap="$3">
        <Text>{t('shareMatchActionsheet')}</Text>
        <Button title={t('shareInApp')} onPress={onPressInApp} />
        <Button title={t('shareOutApp')} onPress={onPressOutApp} />
      </VStack>
    </Actionsheet>
  )
}
