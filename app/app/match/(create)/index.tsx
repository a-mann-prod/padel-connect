import { HStack, VStack } from '@gluestack-ui/themed'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'

import {
  BookFieldActionsheet,
  BookingsFieldData,
  DateCarouselFilter,
  TimeTable,
} from '@/components'
import { useCreateMatchContext } from '@/contexts/CreateMatchContext'
import { FormSelect } from '@/designSystem/Forms/FormSelect/FormSelect'
import { useComplexItems } from '@/hooks/useComplexItems'
import { BookingsField } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const tGlobal = useTranslate()

  const local = useLocalSearchParams()
  const datetime = local?.datetime as string | undefined

  const [dateFilter, setDateFilter] = useState(date.dayjs(datetime))
  const [fields, setFields] = useState<BookingsField[] | undefined>(undefined)
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  )
  const [complex, setComplex] = useState('')

  const complexItems = useComplexItems()

  const { setBookingFieldFormValues, setNames } = useCreateMatchContext()

  return (
    <>
      <VStack flex={1} mx="$3" mb="$3" gap="$3">
        <HStack gap="$3" pt="$3">
          <DateCarouselFilter onChange={setDateFilter} value={dateFilter} />
        </HStack>

        <FormSelect
          displayPlaceHolder
          formControlProps={{ title: tGlobal('complex') }}
          items={complexItems}
          onValueChange={setComplex}
          value={complex}
        />

        {!!Number(complex) && (
          <TimeTable
            selectedItem={selectedItem}
            complex={Number(complex)}
            date={dateFilter}
            onButtonPress={(fields, selectedItem) => {
              setFields(fields)
              setSelectedItem(selectedItem)
            }}
          />
        )}
      </VStack>

      <BookFieldActionsheet
        fields={fields}
        onClose={() => {
          setFields(undefined)
          setSelectedItem(undefined)
        }}
        onButtonPress={(data: BookingsFieldData) => {
          setFields(undefined)
          setSelectedItem(undefined)
          setBookingFieldFormValues({
            datetime: data.startingDateZuluTime,
            duration: data.duration.toString(),
            complex_id: complex,
            four_padel_field_id: data.id.toString(),
            four_padel_field_name: data.name,
          })
          router.navigate(routing.matchParamMatch.path())
        }}
      />
    </>
  )
}
