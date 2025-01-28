import { Text, VStack } from '@gluestack-ui/themed'
import { useLocalSearchParams } from 'expo-router'

import { MatchTiles } from '@/components'
import { Button, Loader, ScrollView, Section, SectionRow } from '@/designSystem'
import { ListEmpty } from '@/designSystem/ListEmpty/ListEmpty'
import { useHeaderButton } from '@/hooks/useHeaderButton'
import { useHeaderTitle } from '@/hooks/useHeaderTitle'
import { useMe } from '@/hooks/useMe'
import { useTournament } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'

export default () => {
  const tGlobal = useTranslate()
  const t = useTranslate()
  const { data: me } = useMe()

  useHeaderButton(
    [
      {
        icon: 'FAS-share',
        onPress: () => alert('Not available yet'),
        condition: true,
      },
    ],
    'headerRight'
  )

  const local = useLocalSearchParams()
  const tournamentId = Number(local?.tournament)

  const { data: tournament, isLoading: isLoadingTournament } = useTournament({
    params: { id: tournamentId },
    options: { enabled: !!tournamentId },
  })

  useHeaderTitle(tournament?.competitionLevel)

  if (isLoadingTournament) return <Loader />

  if (!tournament) return <ListEmpty title={t('tournamentNotFound')} />

  const waitingListRegistration = tournament.remainingPlaces < 1

  return (
    <ScrollView>
      <VStack p="$3" gap="$3">
        <MatchTiles isCompetitive={tournament.isCompetitive} />
        <VStack>
          <Section>
            <SectionRow
              title={tGlobal('location')}
              icon="FAS-location-dot"
              rightComponent={() => <Text>{tournament.complexName}</Text>}
            />
            <SectionRow
              title={tGlobal('date')}
              icon="FAR-calendar"
              rightComponent={() => (
                <Text>{date.dayjs(tournament.startingDate).format('LL')}</Text>
              )}
            />
            <SectionRow
              title={tGlobal('time')}
              icon="FAR-clock"
              rightComponent={() => (
                <Text>{date.dayjs(tournament.startingDate).format('LT')}</Text>
              )}
            />
            <SectionRow
              title={tGlobal('gender.title')}
              icon="FAS-venus-mars"
              rightComponent={() => (
                <Text>{tGlobal(`gender.${tournament.sex.toLowerCase()}`)}</Text>
              )}
            />
          </Section>
          <VStack
            bgColor="$orange400"
            alignItems="center"
            borderBottomLeftRadius="$lg"
            borderBottomRightRadius="$lg"
          >
            <Text color="$white" p="$0.5">
              {waitingListRegistration
                ? tGlobal('waitingListRegistration')
                : tGlobal('remainingPlaces', {
                    count: tournament.remainingPlaces,
                  })}
            </Text>
          </VStack>
        </VStack>

        <Button
          title={tGlobal(
            waitingListRegistration ? 'registerOnWaitingList' : 'participate'
          )}
          onPress={() => alert('Not available yet')}
          isDisabled={!me}
        />
      </VStack>
    </ScrollView>
  )
}
