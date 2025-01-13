import { HStack, VStack } from '@gluestack-ui/themed'
import { useState } from 'react'

import {
  BookFieldActionsheet,
  FieldData,
} from '@/components/BookFieldActionsheet/BookFieldActionsheet'
import { DateCarouselFilter } from '@/components/DateCarouselFilter/DateCarouselFilter'
import { TimeTable } from '@/components/TimeTable/TimeTable'
import { FormSelect } from '@/designSystem/Forms/FormSelect/FormSelect'
import { useComplexItems } from '@/hooks/useComplexItems'
import { Field } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'

export type BookingMatchFieldFormValues = FieldData & {
  complex: string
}

export type BookingMatchFieldFormProps = {
  onSubmit: (data: BookingMatchFieldFormValues) => void
  datetime?: string
  complexId?: string
}

export const BookingMatchFieldForm = ({
  onSubmit,
  datetime,
  complexId,
}: BookingMatchFieldFormProps) => {
  const tGlobal = useTranslate()

  const [dateFilter, setDateFilter] = useState(date.dayjs(datetime))
  const [fields, setFields] = useState<Field[] | undefined>(undefined)
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  )
  const [complex, setComplex] = useState(complexId)

  const complexItems = useComplexItems()

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
        onButtonPress={(data) => complex && onSubmit({ ...data, complex })}
      />
    </>
  )
}
