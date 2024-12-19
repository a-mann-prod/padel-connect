import { router, useLocalSearchParams } from 'expo-router'

import {
  BookingMatchFieldForm,
  BookingMatchFieldFormValues,
} from '@/components'
import { useUpdateMatch } from '@/services/api'

export default () => {
  const local = useLocalSearchParams()
  const datetime = local?.datetime as string | undefined
  const complexId = local?.complexId as string | undefined
  const matchId = Number(local?.match)

  const { mutate } = useUpdateMatch({
    options: {
      onSuccess: () => {
        router.canGoBack() && router.back()
      },
    },
  })

  return (
    <BookingMatchFieldForm
      datetime={datetime}
      complexId={complexId}
      onSubmit={(data: BookingMatchFieldFormValues) => {
        mutate({
          id: matchId,
          datetime: data.startingDateZuluTime,
          duration: data.duration,
          four_padel_field_id: data.id,
          four_padel_field_name: data.name,
          complex_id: Number(data.complex),
        })
      }}
    />
  )
}
