import { router, useLocalSearchParams } from 'expo-router'

import {
  BookingMatchFieldForm,
  BookingMatchFieldFormValues,
} from '@/components'
import { useCreateMatchContext } from '@/contexts/CreateMatchContext'
import { routing } from '@/services/routing'

export default () => {
  const local = useLocalSearchParams()
  const datetime = local?.datetime as string | undefined

  const { setBookingFieldFormValues } = useCreateMatchContext()

  return (
    <BookingMatchFieldForm
      datetime={datetime}
      onSubmit={(data: BookingMatchFieldFormValues) => {
        setBookingFieldFormValues({
          datetime: data.startingDateZuluTime,
          duration: data.duration.toString(),
          complex_id: data.complex,
          four_padel_field_id: data.id.toString(),
          four_padel_field_name: data.name,
        })
        router.navigate(routing.matchParamMatch.path())
      }}
    />
  )
}
