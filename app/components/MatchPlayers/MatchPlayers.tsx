import { HStack, Heading, VStack, useColorMode } from '@gluestack-ui/themed'
import { Fragment } from 'react'
import { chunk } from 'remeda'

import { Avatar, AvatarProps, Section } from '@/designSystem'
import { ProfileResponse } from '@/services/api'
import { DefaultProfileResponse } from '@/services/api/types'
import { useTranslate } from '@/services/i18n'
import { iterate } from '@/utils/array'

const MAX_PLAYER_NB = 4

const mapIndexToTeam: Record<number, string> = {
  0: 'A',
  1: 'B',
}

export type MatchPlayersProps = {
  data?: Pick<DefaultProfileResponse, 'id' | 'avatar_url' | 'full_name'>[]
  onPress?: (userId: number) => void
  onEmptyPress?: () => void
  displayTeam?: boolean
  hasPayedUserIds?: number[]
  isMatchPast: boolean
} & Pick<AvatarProps, 'size'>

export const MatchPlayers = ({
  data,
  displayTeam = false,
  ...props
}: MatchPlayersProps) => {
  const t = useTranslate('match')
  const emptySlots = MAX_PLAYER_NB - (data?.length || 0)

  const avatarItems = [
    ...(data || []),
    ...iterate(emptySlots).map<Partial<ProfileResponse>>((i) => ({
      id: -1 + -i,
    })),
  ]

  const avatarColumns = chunk(avatarItems, 2)

  return (
    <Section>
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
                  <AvatarItem
                    key={avatar.id}
                    size="lg"
                    {...avatar}
                    {...props}
                  />
                ))}
              </VStack>
            </VStack>
            {/* {index % 2 === 0 && index !== avatarColumns.length && (
             <Divider orientation="vertical" />
          )} */}
          </Fragment>
        ))}
      </HStack>
    </Section>
  )
}

const AvatarItem = ({
  id,
  full_name,
  first_name,
  last_name,
  onPress,
  onEmptyPress,
  hasPayedUserIds,
  isMatchPast,
  avatar_url,
  ...props
}: Partial<ProfileResponse> & Omit<MatchPlayersProps, 'data'>) => {
  const colorMode = useColorMode()
  const isEmpty = (id || -1) < 0

  const defaultBorderColor =
    colorMode === 'light' ? 'white' : 'backgroundDark950'

  const sharedProps: AvatarProps = {
    border: {
      color: isEmpty
        ? undefined
        : id && hasPayedUserIds?.includes(id)
          ? 'success500'
          : isMatchPast
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
        fullName=" "
        {...props}
      />
    )
  }

  return (
    <Avatar
      key={id}
      {...sharedProps}
      imageUrl={avatar_url}
      onPress={id && onPress ? () => onPress(id) : undefined}
      fullName={full_name}
      firstname={first_name}
      lastname={last_name}
      {...props}
    />
  )
}
