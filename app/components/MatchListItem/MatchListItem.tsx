import { HStack, Heading, Text, VStack } from '@gluestack-ui/themed'

import { Icon, Pressable, PressableProps } from '@/designSystem'
import { ProfilesWithAvatar } from '@/hooks/useProfilesWithAvatar'
import { PlayersAvatars } from '@/nodes/play'
import { MatchesResponse } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { getPublicAvatarUrl } from '@/utils/avatar'
import { isNilOrEmpty } from '@/utils/global'

export type MatchlistItemProps = {
  onPress: PressableProps['onPress']
} & MatchesResponse[number]

export const MatchListItem = ({
  onPress,
  level,
  booked_url,
  // type,
  datetime,
  complex,
  duration,
  owner,
  match_requests,
}: MatchlistItemProps) => {
  const tGlobal = useTranslate()

  const players: ProfilesWithAvatar = [
    {
      id: owner?.id,
      avatar: owner?.avatar_url
        ? getPublicAvatarUrl(owner.avatar_url)
        : undefined,
    },
    ...match_requests.map(({ user }) => ({
      id: user?.id,
      avatar: user?.avatar_url
        ? getPublicAvatarUrl(user.avatar_url)
        : undefined,
    })),
  ]

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
          <BookedStatus isBooked={!isNilOrEmpty(booked_url)} />
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

type BookedStatusProps = {
  isBooked: boolean
}

const BookedStatus = ({ isBooked }: BookedStatusProps) => {
  const t = useTranslate('play')

  return (
    <HStack gap="$2" alignItems="center">
      {isBooked ? (
        <HStack alignItems="center" gap="$2">
          <Text>{t('booked')}</Text>
          <Icon name="FAS-circle-check" color="$green500" />
        </HStack>
      ) : (
        <Icon name="FAR-circle-check" />
      )}
    </HStack>
  )
}
