import { HStack } from '@gluestack-ui/themed'

import { MatchlistItemProps } from '../MatchListItem/MatchListItem'

import { Avatar, AvatarProps } from '@/designSystem'
import { ProfileResponse } from '@/services/api'
import { iterate } from '@/utils/array'

const MAX_PLAYER_NB = 4

export type PlayersAvatarsProps = {
  teams: MatchlistItemProps['teams']
} & Pick<AvatarProps, 'size'>

export const PlayersAvatars = ({ teams, ...props }: PlayersAvatarsProps) => {
  const players = teams.reduce<
    MatchlistItemProps['teams'][number]['participants']
  >((acc, curr) => [...acc, ...curr.participants], [])

  const emptySlots = MAX_PLAYER_NB - players.length

  const avatarItems = [
    ...players,
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
}: Partial<ProfileResponse> & Omit<PlayersAvatarsProps, 'teams'>) => {
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
