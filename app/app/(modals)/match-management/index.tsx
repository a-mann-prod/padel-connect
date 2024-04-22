import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { MatchForm, MatchFormValues } from '@/components'
import { ScrollView } from '@/designSystem'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useMe } from '@/hooks/useMe'
import { useInsertMatch } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'

export default () => {
  const t = useTranslate()
  const onSuccess = useHandleSuccess()

  const { data: me } = useMe()

  const defaultValues: Nillable<MatchFormValues> = {
    owner_id: me?.id,
  }

  const { mutate, isPending } = useInsertMatch({
    onError: (e) => console.log(e),
    onSuccess: () => {
      onSuccess()
      router.back()
    },
  })

  return (
    <ScrollView>
      <VStack gap="$3" m="$5">
        <MatchForm
          onSubmit={(data) => mutate(data)}
          defaultValues={defaultValues}
          buttonTitle={t('create')}
          isLoading={isPending}
        />
      </VStack>
    </ScrollView>
  )
}
