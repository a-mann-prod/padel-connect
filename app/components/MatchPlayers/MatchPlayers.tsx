import { HStack, Heading, VStack } from '@gluestack-ui/themed'
import { chunk } from 'remeda'

import { Avatar, AvatarProps, Divider } from '@/designSystem'
import { ProfileWithAvatar } from '@/hooks/useProfileWithAvatar'
import { ProfilesWithAvatar } from '@/hooks/useProfilesWithAvatar'
import { useTranslate } from '@/services/i18n'
import { iterate } from '@/utils/array'

const MAX_PLAYER_NB = 4
const EMPTY_PREFIX = 'empty_'

const mapIndexToTeam: Record<number, string> = {
  0: 'A',
  1: 'B',
}

export type MatchPlayersProps = {
  data?: ProfilesWithAvatar
  onPress?: (userId: string) => void
  onEmptyPress?: () => void
} & Pick<AvatarProps, 'size'>

export const MatchPlayers = ({ data, ...props }: MatchPlayersProps) => {
  const t = useTranslate('match')
  const emptySlots = MAX_PLAYER_NB - (data?.length || 0)

  const avatarItems = [
    ...(data || []),
    ...iterate(emptySlots).map<ProfileWithAvatar>((i) => ({
      id: `${EMPTY_PREFIX}${i.toString()}`,
    })),
  ]

  const avatarColumns = chunk(avatarItems, 2)

  return (
    <HStack>
      {avatarColumns.map((col, index) => (
        <>
          <VStack flex={1} gap="$3" alignItems="center">
            <Heading size="sm">
              {t('team')} {mapIndexToTeam[index]}
            </Heading>
            <VStack flex={1} gap="$3">
              {col.map((avatar, index) => (
                <AvatarItem key={avatar.id} {...avatar} {...props} />
              ))}
            </VStack>
          </VStack>
          {index % 2 === 0 && index !== avatarColumns.length && (
            <Divider key={index} orientation="vertical" />
          )}
        </>
      ))}
    </HStack>
  )
}

const AvatarItem = ({
  id,
  avatar,
  first_name,
  last_name,
  onPress,
  onEmptyPress,
  ...props
}: ProfileWithAvatar & Omit<MatchPlayersProps, 'data'>) => {
  const isEmpty = id?.startsWith(EMPTY_PREFIX)

  const sharedProps: AvatarProps = {
    border: {
      color: isEmpty ? undefined : 'warning500',
    },
    size: 'md',
    bgColor: '$secondary300',
    '$dark-bgColor': '$secondary400',
  }

  if (isEmpty) {
    return (
      <Avatar
        key={id}
        {...sharedProps}
        fallBackIcon="FAS-plus"
        onPress={onEmptyPress}
        firstname=" "
        {...props}
      />
    )
  }

  return (
    <Avatar
      key={id}
      {...sharedProps}
      imageUrl={avatar}
      onPress={id && onPress ? () => onPress(id) : undefined}
      firstname={first_name}
      lastname={last_name}
      {...props}
    />
  )
}
