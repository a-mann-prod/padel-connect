import { VStack } from '@gluestack-ui/themed'
import { useUpsertItem } from '@supabase-cache-helpers/postgrest-react-query'
import { router, useLocalSearchParams } from 'expo-router'

import { MatchForm, MatchFormValues, matchFormServices } from '@/components'
import { ScrollView } from '@/designSystem'
import { useHandleError } from '@/hooks/useHandleError'
import { useMe } from '@/hooks/useMe'
import { useInsertMatch } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'

const { formatToParams } = matchFormServices

export default () => {
  const local = useLocalSearchParams()
  const datetime = local?.datetime as string | undefined

  const t = useTranslate()
  const upsert = useUpsertItem({
    primaryKeys: ['id'],
    schema: 'public',
    table: 'matches',
  })
  const onError = useHandleError()

  const { data: me } = useMe()

  const defaultValues: Nillable<MatchFormValues> = {
    owner_id: me?.id,
    datetime: datetime || date.now().toISOString(),
  }

  const { mutate, isPending } = useInsertMatch({
    onSuccess: ({ data }) => {
      const newItem = data?.[0]
      if (newItem) {
        upsert(newItem)
        router.replace(`/(tabs)/play/match/${newItem.id}`)
      }
    },
    onError,
  })

  return (
    <ScrollView>
      <VStack gap="$3" m="$5">
        <MatchForm
          onSubmit={(data) => mutate(formatToParams(data))}
          defaultValues={defaultValues}
          buttonTitle={t('create')}
          isLoading={isPending}
        />
      </VStack>
    </ScrollView>
  )
}
