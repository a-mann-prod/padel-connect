import { Text, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { Actionsheet, ActionsheetProps, Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export type UpdateMatchActionsheetProps = ActionsheetProps & {
  matchPath: string
  matchId: number
  datetime?: string
  complexId?: number
}

export const UpdateMatchActionsheet = ({
  matchPath,
  matchId,
  datetime,
  complexId,
  ...props
}: UpdateMatchActionsheetProps) => {
  const t = useTranslate('match')

  const onPressUpdateField = () => {
    router.navigate(
      routing.matchUpdateField.path(matchId, { datetime, complexId })
    )
    // a modif
    props.onClose?.()
  }

  const onPressUpdateMatchParam = () => {
    router.navigate(routing.matchUpdateParam.path(matchId))
    // a modif
    props.onClose?.()
  }

  return (
    <Actionsheet {...props}>
      <VStack py="$3" gap="$3">
        <Text>{t('updateMatchActionsheet')}</Text>
        <Button title={t('updateField')} onPress={onPressUpdateField} />
        <Button
          title={t('updateMatchParam')}
          onPress={onPressUpdateMatchParam}
        />
      </VStack>
    </Actionsheet>
  )
}
