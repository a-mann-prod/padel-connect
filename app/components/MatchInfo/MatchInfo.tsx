import { HStack, Text, VStack } from '@gluestack-ui/themed'
import { Dayjs } from 'dayjs'
import { router } from 'expo-router'

import { Section, SectionRow, Tile } from '@/designSystem'
import { MatchResponse, useProfiles } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { getUsername } from '@/utils/user'
import { MatchPlayers } from '../MatchPlayers/MatchPlayers'
import { MatchTypeTile } from '../MatchTypeTile/MatchTypeTile'

type MatchInfoProps = {
  match: MatchResponse
  isMatchPassed: boolean
  matchStartTime: Dayjs
  matchEndTime: Dayjs

  isParticipant: boolean

  hasPayedUserIds: number[]

  onEmptyPress?: () => void
}
export const MatchInfo = ({
  match,
  isMatchPassed,
  matchStartTime,
  matchEndTime,

  isParticipant,

  hasPayedUserIds,

  onEmptyPress,
}: MatchInfoProps) => {
  const tGlobal = useTranslate()
  const t = useTranslate('match')

  // TODO A REVOIR
  // const userIds = match.match_requests.map(({ user_id }) => user_id) || []

  const ownerId = match.user
  const userIds = [ownerId] as number[]

  const { data: playersResults } = useProfiles({
    params: { ids: userIds },
    options: { enabled: !!userIds.length },
  })

  const players = playersResults?.results

  const owner = players?.find(({ id }) => id === ownerId)

  const sortedPlayers = players?.sort(
    (a, b) => userIds.indexOf(a.id) - userIds.indexOf(b.id)
  )

  return (
    <VStack gap="$3">
      {isMatchPassed && (
        <Tile
          title={t('matchFinished')}
          bgColor="$secondary500"
          icon="FAS-calendar-check"
        />
      )}
      {match.is_private && (
        <Tile
          title={t('privateMatch')}
          bgColor="$secondary500"
          icon="FAS-lock"
        />
      )}
      <MatchTypeTile type={match.type} />
      <Section>
        <SectionRow
          title={tGlobal('location')}
          icon="FAS-location-dot"
          rightComponent={() => <Text>{match.complex?.name}</Text>}
        />
        <SectionRow
          title={tGlobal('date')}
          icon="FAR-calendar"
          rightComponent={() => <Text>{date.format(match.datetime)}</Text>}
        />
        <SectionRow
          title={t('duration')}
          icon="FAR-clock"
          rightComponent={() => (
            <HStack gap="$1">
              <Text>{matchStartTime.format('HH:mm')}</Text>
              <Text>-</Text>
              <Text>{matchEndTime.format('HH:mm')}</Text>
              <Text>
                ({tGlobal('datetime.minute', { count: match.duration })})
              </Text>
            </HStack>
          )}
        />
      </Section>

      <Section>
        <SectionRow
          title={tGlobal('captain')}
          icon="FAS-crown"
          rightComponent={() => (
            <Text>{getUsername(owner?.first_name, owner?.last_name)}</Text>
          )}
        />
        <SectionRow
          title={tGlobal('level')}
          icon="FAS-dumbbell"
          rightComponent={() => (
            <Text>
              {tGlobal('level')} {match.level}
            </Text>
          )}
        />
      </Section>

      <Section>
        <MatchPlayers
          size="lg"
          data={sortedPlayers}
          onPress={(id) =>
            router.navigate(routing.matchUser.path(match.id, id))
          }
          displayTeam={match.type === 'COMPETITION'}
          hasPayedUserIds={hasPayedUserIds}
          isMatchPassed={isMatchPassed}
        />
      </Section>
    </VStack>
  )
}
