import { HStack, VStack, useColorMode } from '@gluestack-ui/themed'
import { Fragment } from 'react'
import { chunk } from 'remeda'

import { Avatar, AvatarProps, Icon, Pressable, Section } from '@/designSystem'
import { ProfileResponse } from '@/services/api'
import { DefaultMinimalProfileResponse, ScoreData } from '@/services/api/types'
import { isComplete, isWinner } from '@/utils/match'
import { MatchScoreSetButton } from '../MatchScoreSetButton/MatchScoreSetButton'
import { matchPlayersServices } from './MatchPlayers.services'

const { getAvatarItems, MAX_PLAYER_NB } = matchPlayersServices

export type MatchPlayersProps = {
  team_1_users?: DefaultMinimalProfileResponse[]
  team_2_users?: DefaultMinimalProfileResponse[]
  onPress?: (userId: number) => void
  onEmptyPress?: () => void
  hasPayedUserIds?: number[]
  isMatchPast: boolean
  score?: ScoreData
  isCompetitive?: boolean
  onScorePress?: () => void
  pendingUsers?: number[]
} & Pick<AvatarProps, 'size'>

export const MatchPlayers = ({
  team_1_users,
  team_2_users,
  score,
  isCompetitive = false,
  onScorePress,
  pendingUsers,
  ...props
}: MatchPlayersProps) => {
  const { team1, team2 } = getAvatarItems(
    isCompetitive,
    team_1_users,
    team_2_users
  )

  const avatarColumns = chunk(team1, MAX_PLAYER_NB / 2)

  if (isCompetitive) {
    return (
      <Section>
        <VStack gap="$5">
          <CompetitiveRow
            isMatchPast={props.isMatchPast}
            team_users={team1}
            score={score}
            team="team_1"
            onScorePress={onScorePress}
            pendingUsers={pendingUsers}
          />
          <CompetitiveRow
            isMatchPast={props.isMatchPast}
            team_users={team2}
            score={score}
            team="team_2"
            onScorePress={onScorePress}
            pendingUsers={pendingUsers}
          />
        </VStack>
      </Section>
    )
  }

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
  team_users: Partial<DefaultMinimalProfileResponse>[]
  score: MatchPlayersProps['score']
  team: 'team_1' | 'team_2'
  isMatchPast: boolean
  onScorePress: MatchPlayersProps['onScorePress']
  pendingUsers?: MatchPlayersProps['pendingUsers']
}

const CompetitiveRow = ({
  score,
  team_users,
  team,
  isMatchPast,
  onScorePress,
  pendingUsers,
}: CompetitiveRowProps) => {
  const otherTeam: 'team_1' | 'team_2' = team === 'team_1' ? 'team_2' : 'team_1'

  return (
    <HStack gap="$1" alignItems="center">
      <Icon
        name="FAS-trophy"
        opacity={isWinner(team, score) ? 1 : 0}
        color="$yellow500"
      />
      <HStack gap="$4">
        {team_users?.map((user) => (
          <AvatarItem
            isCompetitive
            isMatchPast={isMatchPast}
            key={user.id}
            isPending={!!user?.id && pendingUsers?.includes(user.id)}
            {...user}
          />
        ))}
      </HStack>
      <Pressable
        flex={1}
        onPress={onScorePress}
        isDisabled={!onScorePress}
        displayDisabledOpacity={false}
      >
        <HStack flex={1} gap="$4" h="$full">
          {score?.sets[team].map((set, index) => (
            <MatchScoreSetButton
              key={index}
              set={set?.toString() || '-'}
              isWinningPoint={
                isComplete(score) &&
                (set || 0) > (score?.sets[otherTeam][index] || 0)
              }
              tiebreak={score?.tie_breaks[team][index]?.toString()}
            />
          ))}
        </HStack>
      </Pressable>
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
  isCompetitive,
  isPending,
  ...props
}: Partial<ProfileResponse> &
  Omit<MatchPlayersProps, 'data' | 'pendingUsers'> & {
    isCompetitive?: boolean
    isPending?: boolean
  }) => {
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

  const competitiveProps: AvatarProps = isCompetitive
    ? {
        containerProps: {
          gap: '$1',
          w: '$20',
        },
        headingProps: {
          fontWeight: '$normal',
        },
      }
    : {}

  if (isEmpty) {
    return (
      <Avatar
        key={id}
        {...sharedProps}
        {...competitiveProps}
        fallBackIcon="FAS-plus"
        border={{
          color: colorMode === 'light' ? 'white' : 'backgroundDark950',
        }}
        onPress={onEmptyPress}
        fullName={isCompetitive ? undefined : ' '}
        {...props}
      />
    )
  }

  return (
    <Avatar
      key={id}
      {...sharedProps}
      {...competitiveProps}
      imageUrl={avatar_url}
      onPress={id && onPress ? () => onPress(id) : undefined}
      fullName={full_name}
      firstname={first_name}
      lastname={last_name}
      badgeType={isPending ? 'pending' : undefined}
      {...props}
    />
  )
}
