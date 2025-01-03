import { router, useLocalSearchParams } from 'expo-router'

import {
  BookingMatchFieldForm,
  BookingMatchFieldFormValues,
} from '@/components'
import { useCreateMatchContext } from '@/contexts/CreateMatchContext'
import { useMatchFilters } from '@/services/api'
import { routing } from '@/services/routing'

export default () => {
  const local = useLocalSearchParams()
  const datetime = local?.datetime as string | undefined

  const { data: matchFilters } = useMatchFilters()

  const { setBookingFieldFormValues } = useCreateMatchContext()

  return (
    <BookingMatchFieldForm
      complexId={matchFilters?.complex?.toString()}
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
