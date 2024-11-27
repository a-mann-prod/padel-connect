import { HStack, Heading, Text, VStack } from '@gluestack-ui/themed'

import { MatchTypeIcon } from '../MatchTypeIcon/MatchTypeIcon'
import { PlayersAvatars } from '../PlayersAvatars/PlayersAvatars'

import {
  Icon,
  IconNameProp,
  IconProps,
  Pressable,
  PressableProps,
} from '@/designSystem'
import { isMatchReserved } from '@/hooks/useManageMatch'
import { ComplexesResponse, MatchesResponse } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'

export type MatchlistItemProps = {
  onPress: PressableProps['onPress']
  complexes?: ComplexesResponse
} & MatchesResponse['results'][number]

export const MatchListItem = ({
  onPress,
  complexes,
  ...match
}: MatchlistItemProps) => {
  const tGlobal = useTranslate()

  const isReserved = isMatchReserved(match)

  const complex = complexes?.results.find(({ id }) => id === match.complex)

  return (
    <Pressable onPress={onPress}>
      <VStack gap="$8" variant="colored" rounded="$lg" p="$3">
        <HStack alignItems="flex-start">
          <HStack flex={1} gap="$6">
            <DateFlag isoDate={match.datetime} />
            <VStack flex={1}>
              <Heading size="sm" lineHeight="$xs">
                {complex?.name}
              </Heading>
              <Text variant="subtitle">
                {tGlobal('level')} {match.level}
              </Text>
            </VStack>
          </HStack>
          <HStack gap="$3">
            <MatchTypeIcon isCompetitive={match.is_competitive} />
            <SlotStatusIcon status={isReserved ? 'BOOKED' : 'AVAILABLE'} />
          </HStack>
        </HStack>
        <HStack>
          <PlayersAvatars teams={match.teams} />
          <DurationFlag value={match.duration} />
        </HStack>
      </VStack>
    </Pressable>
  )
}

type DateFlagProps = {
  isoDate: string
}
const DateFlag = ({ isoDate }: DateFlagProps) => {
  const formattedDate = date.dayjs(isoDate)
  return (
    <VStack
      alignItems="center"
      bgColor="$primary500"
      borderBottomRightRadius="$lg"
      borderTopLeftRadius="$lg"
      m="-$3"
      p="$2"
    >
      <Text color="$white" fontWeight="$bold">
        {formattedDate.format('D')}
      </Text>
      <Text size="sm" color="$white">
        {formattedDate.format('MMM')}
      </Text>
      <Text size="sm" color="$white" fontWeight="$bold">
        {formattedDate.format('HH:mm')}
      </Text>
    </VStack>
  )
}

type DurationFlagProps = {
  value: number
}
const DurationFlag = ({ value }: DurationFlagProps) => {
  return (
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
      <Heading size="sm" color="$white">
        {value} mn
      </Heading>
    </VStack>
  )
}

type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'UNAVAILABLE'

type SlotStatusIconProps = {
  status: SlotStatus | null
}

const SlotStatusIcon = ({ status }: SlotStatusIconProps) => {
  const mapStatusToIcon: Record<SlotStatus, IconNameProp> = {
    AVAILABLE: 'FAR-circle',
    BOOKED: 'FAR-circle-check',
    UNAVAILABLE: 'FAR-circle-xmark',
  }

  const mapStatusToColor: Record<SlotStatus, IconProps['color']> = {
    AVAILABLE: '',
    BOOKED: '$green500',
    UNAVAILABLE: '$red500',
  }

  if (!status) return

  return (
    <HStack gap="$2" alignItems="center">
      <Icon name={mapStatusToIcon[status]} color={mapStatusToColor[status]} />
    </HStack>
  )
}
