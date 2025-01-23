import { router, useLocalSearchParams } from 'expo-router'
import { Linking } from 'react-native'

import { MatchForm, matchFormServices } from '@/components'
import { Button, Container } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import {
  MatchResponse,
  useDeleteMatch,
  useMatch,
  useUpdateMatch,
} from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { useOverlayStore } from '@/services/overlaysStore'
import { routing } from '@/services/routing'

const { formatToParams, formatToFormValues } = matchFormServices

export default () => {
  const t = useTranslate('match')
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)
  const { data: me } = useMe()

  const { show } = useOverlayStore()

  const { data: match } = useMatch({
    params: { id: matchId },
    options: { enabled: !!matchId },
  })

  const defaultValues = formatToFormValues(match as MatchResponse)

  const { mutate, isPending } = useUpdateMatch({
    options: {
      onSuccess: () => {
        router.canGoBack() && router.back()
      },
    },
  })

  const { mutate: deleteMatch, isPending: isPendingDelete } = useDeleteMatch({
    options: {
      onSuccess: () => router.replace(routing.play.path()),
    },
  })

  return (
    <Container>
      <MatchForm
        onSubmit={(data) => mutate({ id: matchId, ...formatToParams(data) })}
        defaultValues={defaultValues}
        isLoading={isPending}
        ownerLevel={me?.calculated_level}
        hasPlayers={
          match && [...match.team_1_users, ...match.team_2_users].length > 1
        }
      />

      {match?.is_booked ? (
        <Button
          title={t('callComplex')}
          action="negative"
          onPress={() =>
            match?.complex?.phone_number &&
            Linking.openURL(`tel:${match?.complex?.phone_number}`)
          }
          isLoading={isPendingDelete}
          isDisabled={!match?.complex?.phone_number}
        />
      ) : (
        <Button
          title={t('deleteMatch')}
          action="negative"
          onPress={() =>
            show('defaultAlert', {
              message: t('deleteMatchMessage'),
              onContinueCallback: () => deleteMatch({ id: matchId }),
            })
          }
          isLoading={isPendingDelete}
        />
      )}
    </Container>
  )
}
