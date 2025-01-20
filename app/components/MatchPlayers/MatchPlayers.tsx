import { HStack, VStack, useColorMode } from '@gluestack-ui/themed'
import { Fragment } from 'react'
import { chunk } from 'remeda'

import { Avatar, AvatarProps, FormInput, Icon, Section } from '@/designSystem'
import { ProfileResponse } from '@/services/api'
import { DefaultProfileResponse } from '@/services/api/types'
import { iterate } from '@/utils/array'

const MAX_PLAYER_NB = 4

export type MatchPlayersProps = {
  team_1_users?: Pick<
    DefaultProfileResponse,
    'id' | 'avatar_url' | 'full_name'
  >[]
  team_2_users?: Pick<
    DefaultProfileResponse,
    'id' | 'avatar_url' | 'full_name'
  >[]
  participants?: Pick<
    DefaultProfileResponse,
    'id' | 'avatar_url' | 'full_name'
  >[]
  onPress?: (userId: number) => void
  onEmptyPress?: () => void
  hasPayedUserIds?: number[]
  isMatchPast: boolean
  score?: any
  isCompetitive?: boolean
} & Pick<AvatarProps, 'size'>

export const MatchPlayers = ({
  team_1_users,
  team_2_users,
  participants,
  score,
  isCompetitive = false,
  ...props
}: MatchPlayersProps) => {
  const players = participants || [
    ...(team_1_users || []),
    ...(team_2_users || []),
  ]
  const emptySlots = MAX_PLAYER_NB - (players.length || 0)

  const avatarItems = [
    ...players,
    ...iterate(emptySlots).map<Partial<ProfileResponse>>((i) => ({
      id: -1 + -i,
    })),
  ]

  const avatarColumns = chunk(avatarItems, 2)

  // return (
  //   <Section>
  //     <VStack gap="$5">
  //       {<CompetitiveRow isWinner />}
  //       {<CompetitiveRow />}
  //     </VStack>
  //   </Section>
  // )

  return (
    <Section>
      <HStack>
        {avatarColumns.map((col, index) => (
          <Fragment key={index}>
            <VStack flex={1} gap="$3" alignItems="center">
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
          </Fragment>
        ))}
      </HStack>
    </Section>
  )
}

type CompetitiveRowProps = {
  isWinner?: boolean
}

const CompetitiveRow = ({ isWinner }: CompetitiveRowProps) => {
  const avatarProps = {
    isMatchPast: false,
    full_name: 'Jean M.',
    id: 1,
  }

  return (
    <HStack gap="$2" alignItems="center">
      <Icon name="FAS-trophy" opacity={isWinner ? 1 : 0} />
      <HStack gap="$6">
        <AvatarItem {...avatarProps} />
        <AvatarItem {...avatarProps} />
      </HStack>
      <HStack gap="$2">
        <FormInput formControlProps={{ w: '$8' }} />
        <FormInput formControlProps={{ w: '$8' }} />
        <FormInput formControlProps={{ w: '$8' }} />
      </HStack>
    </HStack>
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
