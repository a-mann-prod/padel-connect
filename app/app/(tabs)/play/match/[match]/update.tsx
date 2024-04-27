import { VStack } from '@gluestack-ui/themed'
import { router, useLocalSearchParams } from 'expo-router'

import { MatchForm, MatchFormValues, matchFormServices } from '@/components'
import { Button, Loader, ScrollView } from '@/designSystem'
import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useMatch, useUpdateMatch } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'

const { formatToParams, formatToFormValues } = matchFormServices

export default () => {
  const t = useTranslate('play')
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  const { data: match, isLoading } = useMatch({
    params: { id: matchId },
    options: { enabled: !!matchId },
  })

  const defaultValues: Nillable<MatchFormValues> = formatToFormValues(match)

  const { mutate, isPending } = useUpdateMatch({
    onSuccess: () => {
      onSuccess()
      router.back()
    },
    onError,
  })

  if (isLoading) return <Loader />

  return (
    <ScrollView>
      <VStack gap="$3" m="$5">
        <MatchForm
          onSubmit={(data) => mutate({ id: matchId, ...formatToParams(data) })}
          defaultValues={defaultValues}
          isLoading={isPending}
        />
        <Button title={t('deleteMatch')} action="negative" isDisabled />
      </VStack>
    </ScrollView>
  )
}
