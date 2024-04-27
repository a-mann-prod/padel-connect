import { HStack, VStack } from '@gluestack-ui/themed'
import { chunk } from 'remeda'

import { Avatar, AvatarProps } from '@/designSystem'
import { ProfileWithAvatar } from '@/hooks/useProfileWithAvatar'
import { ProfilesWithAvatar } from '@/hooks/useProfilesWithAvatar'
import { iterate } from '@/utils/array'
import { when } from '@/utils/when'

const MAX_PLAYER_NB = 4
const EMPTY_PREFIX = 'empty_'

export type PlayersAvatarsProps = {
  data?: ProfilesWithAvatar
  onPress?: (userId: string) => void
  displayName?: boolean
  orientation?: 'row' | 'column'
} & Pick<AvatarProps, 'size'>

export const PlayersAvatars = ({ data, ...props }: PlayersAvatarsProps) => {
  const emptySlots = MAX_PLAYER_NB - (data?.length || 0)

  const avatarItems = [
    ...(data || []),
    ...iterate(emptySlots).map<ProfileWithAvatar>((i) => ({
      id: `${EMPTY_PREFIX}${i.toString()}`,
    })),
  ]

  const avatarRows = chunk(
    avatarItems,
    props.orientation === 'column' ? 2 : MAX_PLAYER_NB
  )

  return (
    <VStack flex={1} gap="$3">
      {avatarRows.map((row, index) => (
        <HStack key={index} gap="$3">
          {row.map((avatar) => (
            <AvatarItem key={avatar.id} {...avatar} {...props} />
          ))}
        </HStack>
      ))}
    </VStack>
  )
}

const AvatarItem = ({
  id,
  avatar,
  first_name,
  last_name,
  onPress,
  displayName,
  orientation,
  ...props
}: ProfileWithAvatar & Omit<PlayersAvatarsProps, 'data'>) => {
  const sharedProps: AvatarProps = {
    size: 'md',
    bgColor: '$secondary300',
    '$dark-bgColor': '$secondary400',
    containerProps: { flex: orientation === 'column' ? 1 : undefined },
  }

  if (id?.startsWith(EMPTY_PREFIX)) {
    return (
      <Avatar key={id} {...sharedProps} fallBackIcon="FAS-plus" {...props} />
    )
  }

  return (
    <Avatar
      key={id}
      {...sharedProps}
      imageUrl={avatar}
      onPress={id && onPress ? () => onPress(id) : undefined}
      firstname={when(displayName, first_name)}
      lastname={when(displayName, last_name)}
      {...props}
    />
  )
}
