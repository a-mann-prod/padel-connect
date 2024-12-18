import { Text, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { MatchPlayers } from '../MatchPlayers/MatchPlayers'
import { MatchTypeTile } from '../MatchTypeTile/MatchTypeTile'

import { Section, SectionRow, Tile } from '@/designSystem'
import { MatchResponse } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { getUsername } from '@/utils/user'
import { MatchRecap } from '../MatchRecap/MatchRecap'

type MatchInfoProps = {
  match: MatchResponse
  participants?: MatchResponse['teams'][number]['participants']
  isMatchPassed: boolean

  hasPayedUserIds: number[]
}
export const MatchInfo = ({
  match,
  participants,
  isMatchPassed,

  hasPayedUserIds,
}: MatchInfoProps) => {
  const tGlobal = useTranslate()
  const t = useTranslate('match')

  const ownerId = match.user

  const owner = participants?.find(({ id }) => id === ownerId)

  const sortedPlayers = participants || []

  const [level_min, level_max] = match.calculated_level_range

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
      <MatchTypeTile isCompetitive={match.is_competitive} />
      <MatchRecap
        complexName={match.complex.name}
        datetime={match.datetime}
        duration={match.duration}
        fieldName={match.four_padel_field_name}
      />

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
              {match.is_open_to_all_level
                ? tGlobal('allLevel')
                : `${level_min} - ${level_max}`}
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
          displayTeam={match.is_competitive}
          hasPayedUserIds={hasPayedUserIds}
          isMatchPassed={isMatchPassed}
        />
      </Section>
    </VStack>
  )
}
