import { HStack } from '@gluestack-ui/themed'

import { Avatar, AvatarProps } from '@/designSystem'
import { DefaultMinimalProfileResponse } from '@/services/api/types'
import { iterate } from '@/utils/array'

const MAX_PLAYER_NB = 4

export type PlayersAvatarsProps = {
  users: DefaultMinimalProfileResponse[]
} & Pick<AvatarProps, 'size'>

export const PlayersAvatars = ({ users, ...props }: PlayersAvatarsProps) => {
  const emptySlots = MAX_PLAYER_NB - users.length

  const avatarItems = [
    ...users,
    ...iterate(emptySlots).map<Partial<DefaultMinimalProfileResponse>>((i) => ({
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
  full_name,
  ...props
}: Partial<DefaultMinimalProfileResponse> &
  Omit<PlayersAvatarsProps, 'users'>) => {
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

  return (
    <Avatar
      key={id}
      {...sharedProps}
      imageUrl={avatar_url}
      firstname={first_name}
      lastname={last_name}
      {...props}
    />
  )
}
