import { Box, HStack, Text, VStack } from '@gluestack-ui/themed'

import { Actionsheet, ActionsheetProps, Button } from '@/designSystem'
import { BookingsField } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'

export type BookFieldActionsheetProps = Omit<ActionsheetProps, 'isOpen'> & {
  fields: BookingsField[] | undefined
  onButtonPress: () => void
}

export const BookFieldActionsheet = ({
  fields,
  onButtonPress,
  ...props
}: BookFieldActionsheetProps) => {
  const t = useTranslate()

  return (
    <Actionsheet isOpen={!!fields} {...props}>
      <VStack py="$3" gap="$6">
        <HStack gap="$3" flexWrap="wrap" justifyContent="space-around">
          {fields?.map((field) => (
            <FieldItem
              key={field?.id}
              title={field?.name}
              durations={field.durations}
            />
          ))}
        </HStack>
        <Button title={t('next')} onPress={onButtonPress} />
      </VStack>
    </Actionsheet>
  )
}

type FieldItemProps = {
  title: string
  durations: number[]
}

const FieldItem = ({ title, durations }: FieldItemProps) => {
  const formatTime = (totalMinutes: number) => {
    const timeDuration = date.duration(totalMinutes, 'minutes')
    const hours = timeDuration.hours()
    const minutes = timeDuration.minutes()

    // Si les minutes sont 0, afficher uniquement les heures
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
            <Button
              key={duration}
              title={formatTime(duration)}
              onPress={() => console.log('test')}
              px="$2"
            />
          ))}
        </HStack>
      </VStack>
    </Box>
  )
}
