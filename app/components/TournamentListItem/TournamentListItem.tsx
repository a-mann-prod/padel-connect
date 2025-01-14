import { HStack, Text, VStack } from '@gluestack-ui/themed'

import { MatchTypeIcon } from '../MatchTypeIcon/MatchTypeIcon'

import { Pressable, PressableProps } from '@/designSystem'
import { TournamentsResponse } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'

export type TournamentListItemProps = TournamentsResponse[number] & {
  onPress: PressableProps['onPress']
}

export const TournamentListItem = ({
  id,
  name,
  isCompetitive,
  competitionLevel,
  onPress,
  startingDate,
  sex,
  complexName,
}: TournamentListItemProps) => {
  const t = useTranslate()
  return (
    <Pressable onPress={onPress}>
      <HStack
        gap="$3"
        variant="colored"
        rounded="$lg"
        p="$3"
        alignItems="center"
      >
        <MatchTypeIcon
          isCompetitive={isCompetitive}
          size="xl"
          color="$primary500"
        />

        <VStack flex={1} gap="$1">
          <Text flex={1}>{name}</Text>
          <Text flex={1}>{complexName}</Text>
          <Text variant="subtitle">
            {date.dayjs(startingDate).format('LLL')}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  )
}
