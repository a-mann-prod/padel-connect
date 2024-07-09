import { HStack } from '@gluestack-ui/themed'

import { Avatar, AvatarProps } from '@/designSystem'
import { ProfileWithAvatar } from '@/hooks/useProfileWithAvatar'
import { ProfilesWithAvatar } from '@/hooks/useProfilesWithAvatar'
import { iterate } from '@/utils/array'

const MAX_PLAYER_NB = 4
const EMPTY_PREFIX = 'empty_'

export type PlayersAvatarsProps = {
  data?: ProfilesWithAvatar
} & Pick<AvatarProps, 'size'>

export const PlayersAvatars = ({ data, ...props }: PlayersAvatarsProps) => {
  const emptySlots = MAX_PLAYER_NB - (data?.length || 0)

  const avatarItems = [
    ...(data || []),
    ...iterate(emptySlots).map<ProfileWithAvatar>((i) => ({
      id: `${EMPTY_PREFIX}${i.toString()}`,
    })),
  ]

  return (
    <HStack flex={1} gap="$3">
      {avatarItems.map((avatar) => (
        <AvatarItem key={avatar.id} {...avatar} {...props} />
      ))}
    </HStack>
  )
}

const AvatarItem = ({
  id,
  avatar,
  first_name,
  last_name,
  ...props
}: ProfileWithAvatar & Omit<PlayersAvatarsProps, 'data'>) => {
  const sharedProps: AvatarProps = {
    size: 'md',
    bgColor: '$secondary300',
    '$dark-bgColor': '$secondary400',
  }

  if (id?.startsWith(EMPTY_PREFIX)) {
    return (
      <Avatar key={id} {...sharedProps} fallBackIcon="FAS-plus" {...props} />
    )
  }

  return <Avatar key={id} {...sharedProps} imageUrl={avatar} {...props} />
}
