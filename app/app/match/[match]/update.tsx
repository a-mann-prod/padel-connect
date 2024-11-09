import { VStack } from '@gluestack-ui/themed'
import { router, useLocalSearchParams } from 'expo-router'
import { Linking } from 'react-native'

import { MatchForm, WithMatch, matchFormServices } from '@/components'
import { Button, ScrollView } from '@/designSystem'
import { isMatchReserved } from '@/hooks/useManageMatch'
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

export default WithMatch(() => {
  const t = useTranslate('match')
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  const { show } = useOverlayStore()

  const { data: match } = useMatch({
    params: { id: matchId },
    options: { enabled: !!matchId },
  })

  const isReserved = match && isMatchReserved(match)

  const defaultValues = formatToFormValues(match as MatchResponse)

  const { mutate, isPending } = useUpdateMatch({
    options: {
      onSuccess: () => {
        router.back()
      },
    },
  })

  const { mutate: deleteMatch, isPending: isPendingDelete } = useDeleteMatch({
    options: {
      onSuccess: () => router.replace(routing.play.path()),
    },
  })

  return (
    <ScrollView>
      <VStack gap="$3" m="$5">
        <MatchForm
          onSubmit={(data) => mutate({ id: matchId, ...formatToParams(data) })}
          defaultValues={defaultValues}
          isLoading={isPending}
        />

        {isReserved ? (
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
      </VStack>
    </ScrollView>
  )
})
