import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed'

import { MatchTypeIcon } from '../MatchTypeIcon/MatchTypeIcon'

import { Pressable, PressableProps } from '@/designSystem'
import { TournamentsResponse } from '@/services/api'
import { date } from '@/services/date'

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
          <Text fontWeight="$semibold" flex={1}>
            {competitionLevel}
          </Text>
          <HStack alignItems="flex-end">
            <Text flex={1}>{complexName}</Text>
            <VStack
              alignItems="center"
              justifyContent="center"
              bgColor="$primary500"
              borderBottomRightRadius="$lg"
              borderTopLeftRadius="$lg"
              p="$2"
              m="-$3"
              gap="$0.5"
            >
              <VStack w="$24" justifyContent="center" alignItems="center">
                <Heading size="xs" color="$white">
                  {date.dayjs(startingDate).format('ll')}
                </Heading>
                <Text color="$white" size="sm" textAlign="center">
                  {date.dayjs(startingDate).format('LT')}
                </Text>
              </VStack>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  )
}
