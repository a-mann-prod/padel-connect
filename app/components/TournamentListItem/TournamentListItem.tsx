import { HStack, Text, VStack } from '@gluestack-ui/themed'

import { MatchTypeIcon } from '../MatchTypeIcon/MatchTypeIcon'

import { Pressable, PressableProps } from '@/designSystem'
import { TournamentResponse } from '@/services/api'
import { date } from '@/services/date'

export type TournamentListItemProps = TournamentResponse & {
  onPress: PressableProps['onPress']
}

export const TournamentListItem = ({
  id,
  complex,
  datetime,
  title,
  type,
  onPress,
}: TournamentListItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <HStack
        gap="$3"
        variant="colored"
        rounded="$lg"
        p="$3"
        alignItems="center"
      >
        <MatchTypeIcon type={type} size="xl" color="$primary500" />

        <VStack flex={1} gap="$2">
          <HStack alignItems="center">
            <Text flex={1}>{title}</Text>
            <HStack alignItems="center" gap="$2">
              <Text variant="subtitle">
                {date.dayjs(datetime).format('L HH:MM')}
              </Text>
            </HStack>
          </HStack>
          <Text variant="subtitle">{complex?.name}</Text>
        </VStack>
      </HStack>
    </Pressable>
  )
}
