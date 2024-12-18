import { Box, HStack, Text, VStack } from '@gluestack-ui/themed'

import { Actionsheet, ActionsheetProps, Pressable } from '@/designSystem'
import { BookingsField } from '@/services/api'
import { date } from '@/services/date'

export type BookingsFieldData = Omit<BookingsField, 'durations'> & {
  duration: number
}

export type BookFieldActionsheetProps = Omit<ActionsheetProps, 'isOpen'> & {
  fields: BookingsField[] | undefined
  onButtonPress: (data: BookingsFieldData) => void
}

export const BookFieldActionsheet = ({
  fields,
  onButtonPress,
  ...props
}: BookFieldActionsheetProps) => {
  return (
    <Actionsheet isOpen={!!fields} {...props}>
      <VStack py="$3" gap="$6">
        <HStack gap="$3" flexWrap="wrap" justifyContent="space-around">
          {fields?.map((field) => (
            <FieldItem
              key={field?.id}
              title={field?.name}
              durations={field.durations}
              onPress={(duration) => onButtonPress({ ...field, duration })}
            />
          ))}
        </HStack>
      </VStack>
    </Actionsheet>
  )
}

type FieldItemProps = {
  title: string
  durations: number[]
  onPress: (duration: number) => void
}

const FieldItem = ({ title, durations, onPress }: FieldItemProps) => {
  const formatTime = (totalMinutes: number) => {
    const timeDuration = date.duration(totalMinutes, 'minutes')
    const hours = timeDuration.hours()
    const minutes = timeDuration.minutes()

    // Si min = 0, afficher uniquement les heures
    return minutes === 0 ? `${hours}h` : `${hours}h${minutes}`
  }

  return (
    <Box
      p="$2"
      rounded="$lg"
      gap="$2"
      borderColor="$backgroundDark500"
      borderWidth="$2"
    >
      <VStack alignItems="center">
        <Text>{title}</Text>
        <HStack gap="$2">
          {durations.map((duration) => (
            <Pressable onPress={() => onPress(duration)}>
              <Box
                variant="backgroundColored"
                rounded="$lg"
                alignItems="center"
                justifyContent="center"
              >
                <Text p="$2">{formatTime(duration)}</Text>
              </Box>
            </Pressable>
          ))}
        </HStack>
      </VStack>
    </Box>
  )
}
