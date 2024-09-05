import { VStack } from '@gluestack-ui/themed'
import { router, useLocalSearchParams } from 'expo-router'

import { MatchForm, MatchFormValues, matchFormServices } from '@/components'
import { ScrollView } from '@/designSystem'
import { formDateTimePickerServices } from '@/designSystem/Forms/FormDateTimePicker/FormDateTimePicker.services'
import { useHandleError } from '@/hooks/useHandleError'
import { useInsertMatch } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { Nillable } from '@/types'

const { formatToParams } = matchFormServices

const { formatWithMinuteInterval } = formDateTimePickerServices

export default () => {
  const local = useLocalSearchParams()
  const datetime = local?.datetime as string | undefined

  const t = useTranslate()
  const onError = useHandleError()

  const defaultValues: Nillable<MatchFormValues> = {
    datetime: formatWithMinuteInterval(
      date.dayjs(datetime).toDate()
    ).toISOString(),
  }

  const { mutate, isPending } = useInsertMatch({
    onSuccess: (data) => {
      const newItem = data?.[0]
      router.replace(routing.match.path(newItem?.id))
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
