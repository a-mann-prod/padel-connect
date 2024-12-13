import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

type MatchActionButtonsProps = {
  matchId: number
  isReserved: boolean

  onLeaveButtonPress: () => void
  isLeaveButtonLoading: boolean

  onPayButtonPress: () => void
  isPayButtonLoading: boolean

  isPlayer: boolean
  isOwner: boolean
  hasPayed: boolean
}

export const MatchActionButtons = ({
  matchId,
  isReserved,

  hasPayed,
  isOwner,
  isPlayer,

  onLeaveButtonPress,
  isLeaveButtonLoading,

  onPayButtonPress,
  isPayButtonLoading,
}: MatchActionButtonsProps) => {
  const t = useTranslate('match')

  const isParticipant = isOwner || isPlayer

  return (
    <VStack gap="$3">
      {isOwner && !isReserved && (
        <Button
          title={t('book')}
          icon="FAS-money-bill"
          iconRight
          action="positive"
          onPress={onPayButtonPress}
          isLoading={isPayButtonLoading}
        />
      )}
      {isPlayer && !hasPayed && isReserved && (
        <Button
          title={t('pay')}
          icon="FAS-money-bill"
          iconRight
          action="positive"
          onPress={onPayButtonPress}
          isLoading={isPayButtonLoading}
        />
      )}

      {isParticipant && (
        <>
          <Button
            title={t('chat')}
            icon="FAS-message"
            iconRight
            action="warning"
            onPress={() => router.navigate(routing.matchChat.path(matchId))}
          />
          {/* <Button
                title={t('enterScore')}
                icon="FAS-award"
                iconRight
              /> */}
        </>
      )}
      {isPlayer && (
        <Button
          title={t('leave')}
          action="negative"
          icon="FAS-person-walking-arrow-right"
          iconRight
          onPress={onLeaveButtonPress}
          isLoading={isLeaveButtonLoading}
        />
      )}
    </VStack>
  )
}
