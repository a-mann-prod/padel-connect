import { Badge, Box, HStack, Text, VStack } from '@gluestack-ui/themed'
import { Dayjs } from 'dayjs'

import { Loader, Pressable } from '@/designSystem'
import { BookingFieldsResponse, useBookingFields } from '@/services/api'
import { date as dateService } from '@/services/date'

const ITEMS_PER_ROW = 5

export type TimeTableProps = {
  date: Dayjs
  complex: number
  onButtonPress: (
    fields: BookingFieldsResponse['fields'],
    selectedItem: string
  ) => void
  selectedItem?: string
}

export const TimeTable = ({
  date,
  complex,
  onButtonPress,
  selectedItem,
}: TimeTableProps) => {
  const { data: bookingFields, isLoading } = useBookingFields({
    params: { date: date.format('YYYY-MM-DD'), complex },
  })

  const bookingsTable = bookingFields?.reduce<
    (BookingFieldsResponse | null)[][]
  >((acc, curr, index) => {
    const groupIndex = Math.floor(index / ITEMS_PER_ROW)
    if (!acc[groupIndex]) {
      acc[groupIndex] = []
    }
    acc[groupIndex].push(curr)

    if (index === bookingFields.length - 1) {
      while (acc[groupIndex].length < ITEMS_PER_ROW) {
        acc[groupIndex].push(null)
      }
    }

    return acc
  }, [])

  if (isLoading) return <Loader />

  return (
    <VStack gap="$3">
      {bookingsTable?.map((row, index) => (
        <HStack key={index} gap="$3">
          {row.map((booking, subIndex) => {
            const realSubIndex = `${index}${subIndex}`
            if (booking) {
              return (
                <TimeButton
                  key={realSubIndex}
                  startTime={booking.startingDateZuluTime}
                  onPress={
                    booking.fields.length > 0
                      ? () => onButtonPress(booking.fields, realSubIndex)
                      : undefined
                  }
                  isSelected={realSubIndex === selectedItem}
                  fieldCount={booking.fields.length}
                />
              )
            } else {
              return <Box key={realSubIndex} flex={1} />
            }
          })}
        </HStack>
      ))}
    </VStack>
  )
}

type TimeButtonProps = {
  startTime: string
  onPress?: () => void
  isSelected: boolean
  fieldCount: number
}

const TimeButton = ({
  startTime,
  onPress,
  isSelected,
  fieldCount,
}: TimeButtonProps) => {
  const selectedBoxProps = isSelected
    ? {
        bgColor: '$secondary300',
      }
    : {}

  const selectedTextProps = isSelected
    ? {
        color: 'white',
      }
    : {}

  return (
    <Pressable flex={1} onPress={onPress} displayDisabledOpacity>
      <Box
        {...selectedBoxProps}
        variant="colored"
        rounded="$lg"
        alignItems="center"
        justifyContent="center"
      >
        <Text {...selectedTextProps} p="$2">
          {dateService.dayjs(startTime).format('HH:mm')}
        </Text>
      </Box>
      {!!fieldCount && (
        <Badge
          zIndex={1}
          position="absolute"
          top="-$1.5"
          right="-$2"
          rounded="$full"
          bgColor="$primary500"
        >
          <Text color="$white" size="xs">
            {fieldCount > 9 ? '9+' : fieldCount}
          </Text>
        </Badge>
      )}
    </Pressable>
  )
}
