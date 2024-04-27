import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { MatchForm, MatchFormValues, matchFormServices } from '@/components'
import { ScrollView } from '@/designSystem'
import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useMe } from '@/hooks/useMe'
import { useInsertMatch } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'

const { formatToParams } = matchFormServices

export default () => {
  const t = useTranslate()
  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  const { data: me } = useMe()

  const defaultValues: Nillable<MatchFormValues> = {
    owner_id: me?.id,
  }

  const { mutate, isPending } = useInsertMatch({
    onSuccess: () => {
      onSuccess()
      router.back()
    },
    onError,
  })

  return (
    <ScrollView>
      <VStack gap="$3" m="$5">
        <MatchForm
          onSubmit={(data) => mutate([formatToParams(data)])}
          defaultValues={defaultValues}
          buttonTitle={t('create')}
          isLoading={isPending}
        />
      </VStack>
    </ScrollView>
  )
}
