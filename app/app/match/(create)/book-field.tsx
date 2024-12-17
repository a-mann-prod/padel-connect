import { HStack, VStack } from '@gluestack-ui/themed'
import { useState } from 'react'

import {
  BookFieldActionsheet,
  DateCarouselFilter,
  TimeTable,
} from '@/components'
import { BookingsField } from '@/services/api'
import { date } from '@/services/date'

export default () => {
  const [dateFilter, setDateFilter] = useState(date.now())
  const [fields, setFields] = useState<BookingsField[] | undefined>(undefined)
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  )

  const complex = 1

  return (
    <>
      <VStack flex={1} mx="$3" mb="$3" gap="$3">
        <HStack gap="$3" pt="$3">
          <DateCarouselFilter onChange={setDateFilter} value={dateFilter} />
        </HStack>

        <TimeTable
          selectedItem={selectedItem}
          complex={complex}
          date={dateFilter}
          onButtonPress={(fields, selectedItem) => {
            setFields(fields)
            setSelectedItem(selectedItem)
          }}
        />
      </VStack>

      <BookFieldActionsheet
        fields={fields}
        onClose={() => {
          setFields(undefined)
          setSelectedItem(undefined)
        }}
      />
    </>
  )
}
