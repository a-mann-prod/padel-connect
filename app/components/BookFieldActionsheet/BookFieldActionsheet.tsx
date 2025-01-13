import { Box, HStack, Text, VStack } from '@gluestack-ui/themed'

import { Actionsheet, ActionsheetProps, Pressable } from '@/designSystem'
import { Field, FieldExtra } from '@/services/api'
import { date } from '@/services/date'

export type FieldData = Omit<Field, 'durations'> & FieldExtra

export type BookFieldActionsheetProps = Omit<ActionsheetProps, 'isOpen'> & {
  fields: Field[] | undefined
  onButtonPress: (data: FieldData) => void
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
              extras={field?.extras}
              onPress={(extra) => {
                props.onClose?.()
                onButtonPress({ ...field, ...extra })
              }}
            />
          ))}
        </HStack>
      </VStack>
    </Actionsheet>
  )
}

type FieldItemProps = {
  title: string
  extras: FieldExtra[]
  onPress: (extra: FieldExtra) => void
}

const FieldItem = ({ title, extras, onPress }: FieldItemProps) => {
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
          {extras.map((extra) => (
            <Pressable key={extra.duration} onPress={() => onPress(extra)}>
              <Box
                variant="backgroundColored"
                rounded="$lg"
                alignItems="center"
                justifyContent="center"
              >
                <Text p="$2">{formatTime(extra.duration)}</Text>
              </Box>
            </Pressable>
          ))}
        </HStack>
      </VStack>
    </Box>
  )
}
