import { HStack } from '@gluestack-ui/themed'

import { Avatar, AvatarProps } from '@/designSystem'
import { ProfileResponse, ProfilesResponse } from '@/services/api'
import { iterate } from '@/utils/array'

const MAX_PLAYER_NB = 4

export type PlayersAvatarsProps = {
  data?: ProfilesResponse
} & Pick<AvatarProps, 'size'>

export const PlayersAvatars = ({ data, ...props }: PlayersAvatarsProps) => {
  const emptySlots = MAX_PLAYER_NB - (data?.length || 0)

  const avatarItems = [
    ...(data || []),
    ...iterate(emptySlots).map<Partial<ProfileResponse>>((i) => ({
      id: -1 - i,
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
  avatar_url,
  first_name,
  last_name,
  ...props
}: Partial<ProfileResponse> & Omit<PlayersAvatarsProps, 'data'>) => {
  const sharedProps: AvatarProps = {
    size: 'md',
    bgColor: '$secondary300',
    '$dark-bgColor': '$secondary400',
  }

  if ((id || 0) < 0) {
    return (
      <Avatar key={id} {...sharedProps} fallBackIcon="FAS-plus" {...props} />
    )
  }

  return <Avatar key={id} {...sharedProps} imageUrl={avatar_url} {...props} />
}
