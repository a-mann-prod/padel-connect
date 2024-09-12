import { HStack, Heading, VStack, useColorMode } from '@gluestack-ui/themed'
import { Fragment } from 'react'
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
  displayTeam?: boolean
  hasPayedUserIds: string[]
  isMatchPassed: boolean
} & Pick<AvatarProps, 'size'>

export const MatchPlayers = ({
  data,
  displayTeam = true,
  ...props
}: MatchPlayersProps) => {
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
        <Fragment key={index}>
          <VStack flex={1} gap="$3" alignItems="center">
            {displayTeam && (
              <Heading size="sm">
                {t('team')} {mapIndexToTeam[index]}
              </Heading>
            )}
            <VStack flex={1} gap="$3">
              {col.map((avatar) => (
                <AvatarItem key={avatar.id} {...avatar} {...props} />
              ))}
            </VStack>
          </VStack>
          {index % 2 === 0 && index !== avatarColumns.length && (
            <Divider orientation="vertical" />
          )}
        </Fragment>
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
  hasPayedUserIds,
  isMatchPassed,
  ...props
}: ProfileWithAvatar & Omit<MatchPlayersProps, 'data'>) => {
  const colorMode = useColorMode()
  const isEmpty = id?.startsWith(EMPTY_PREFIX)

  const defaultBorderColor =
    colorMode === 'light' ? 'white' : 'backgroundDark950'

  const sharedProps: AvatarProps = {
    border: {
      color: isEmpty
        ? undefined
        : id && hasPayedUserIds.includes(id)
          ? 'success500'
          : isMatchPassed
            ? defaultBorderColor
            : 'warning500',
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
        border={{
          color: colorMode === 'light' ? 'white' : 'backgroundDark950',
        }}
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
