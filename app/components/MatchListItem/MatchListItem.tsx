import { HStack, Heading, Text, VStack } from '@gluestack-ui/themed'

import { DateFlag } from '../DateFlag/DateFlag'
import { DurationFlag } from '../DurationFlag/DurationFlag'
import { MatchTypeIcon } from '../MatchTypeIcon/MatchTypeIcon'
import { PlayersAvatars } from '../PlayersAvatars/PlayersAvatars'
import { SlotStatusIcon } from '../SlotStatusIcon/SlotStatusIcon'

import { Pressable, PressableProps } from '@/designSystem'
import { ComplexesResponse } from '@/services/api'
import { DefaultMinimalProfileResponse } from '@/services/api/types'
import { useTranslate } from '@/services/i18n'

export type MatchlistItemProps = {
  onPress: PressableProps['onPress']
  complexes?: ComplexesResponse
  complex: number
  datetime: string
  duration: number
  level: number
  calculated_level_range: [number, number]
  is_competitive: boolean
  is_reserved?: boolean
  is_open_to_all_level: boolean
  is_request?: boolean
  participants: DefaultMinimalProfileResponse[]
  displayRequest?: boolean
}

export const MatchListItem = ({
  onPress,
  complexes,
  displayRequest = false,
  ...match
}: MatchlistItemProps) => {
  const tGlobal = useTranslate()

  const complex = complexes?.results.find(({ id }) => id === match.complex)

  const [level_min, level_max] = match.calculated_level_range

  const containerProps: any =
    displayRequest && match?.is_request
      ? {
          borderTopLeftRadius: '$lg',
          borderTopRightRadius: '$lg',
        }
      : {
          rounded: '$lg',
        }

  return (
    <Pressable onPress={onPress}>
      <VStack gap="$6" variant="colored" p="$3" {...containerProps}>
        <HStack alignItems="flex-start">
          <HStack flex={1} gap="$6">
            <DateFlag isoDate={match.datetime} />
            <VStack flex={1}>
              <Heading size="sm" lineHeight="$xs">
                {complex?.name}
              </Heading>
              <Text variant="subtitle">
                {match.is_open_to_all_level
                  ? tGlobal('allLevel')
                  : `${tGlobal('level')} ${level_min} - ${level_max}`}
              </Text>
            </VStack>
          </HStack>
          <HStack gap="$3">
            <MatchTypeIcon isCompetitive={match.is_competitive} />
            <SlotStatusIcon
              status={match.is_reserved ? 'BOOKED' : 'AVAILABLE'}
            />
          </HStack>
        </HStack>
        <HStack>
          <PlayersAvatars users={match.participants} />
          <DurationFlag
            value={match.duration}
            isRequest={displayRequest && match?.is_request}
          />
        </HStack>
      </VStack>
      {displayRequest && match?.is_request && (
        <VStack
          bgColor="$orange400"
          alignItems="center"
          borderBottomLeftRadius="$lg"
          borderBottomRightRadius="$lg"
        >
          <Text color="$white">{tGlobal('pendingRequest')}</Text>
        </VStack>
      )}
    </Pressable>
  )
}
