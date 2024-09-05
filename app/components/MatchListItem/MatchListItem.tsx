import { HStack, Heading, Text, VStack } from '@gluestack-ui/themed'

import { PlayersAvatars } from '../PlayersAvatars/PlayersAvatars'

import {
  Icon,
  IconNameProp,
  IconProps,
  Pressable,
  PressableProps,
} from '@/designSystem'
import { ProfilesWithAvatar } from '@/hooks/useProfilesWithAvatar'
import { MatchesResponse } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { Database } from '@/services/supabase/database.types'
import { getPublicAvatarUrl } from '@/utils/avatar'

export type MatchlistItemProps = {
  onPress: PressableProps['onPress']
} & MatchesResponse[number]

export const MatchListItem = ({
  onPress,
  level,
  slot_status,
  // type,
  datetime,
  complex,
  duration,
  match_requests,
}: MatchlistItemProps) => {
  const tGlobal = useTranslate()

  const players: ProfilesWithAvatar = match_requests.map(({ user }) => ({
    id: user?.id,
    avatar: user?.avatar_url ? getPublicAvatarUrl(user.avatar_url) : undefined,
  }))

  return (
    <Pressable onPress={onPress}>
      <VStack gap="$8" variant="colored" rounded="$lg" p="$3">
        <HStack alignItems="flex-start">
          <HStack flex={1} gap="$6">
            <DateFlag isoDate={datetime} />
            <VStack flex={1}>
              <Heading size="sm" lineHeight="$xs">
                {complex?.name}
              </Heading>
              <Text variant="subtitle">
                {/* {tGlobal(`matchType.${type.toLowerCase()}`)} -{' '} */}
                {tGlobal('level')} {level}
              </Text>
            </VStack>
          </HStack>
          <SlotStatusIcon status={slot_status} />
        </HStack>
        <HStack>
          <PlayersAvatars data={players} />
          <DurationFlag value={duration} />
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

type SlotStatus = Database['public']['Enums']['match_slot_status']

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
    BOOKED: '$green.500',
    UNAVAILABLE: '$red.500',
  }

  if (!status) return

  return (
    <HStack gap="$2" alignItems="center">
      <Icon name={mapStatusToIcon[status]} color={mapStatusToColor[status]} />
    </HStack>
  )
}
