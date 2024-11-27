import { Text, VStack } from '@gluestack-ui/themed'
import { useLocalSearchParams } from 'expo-router'

import { MatchTypeTile } from '@/components'
import { Button, Loader, ScrollView, Section, SectionRow } from '@/designSystem'
import { ListEmpty } from '@/designSystem/ListEmpty/ListEmpty'
import { useHeaderButton } from '@/hooks/useHeaderButton'
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

  if (isLoadingTournament) return <Loader />

  if (!tournament) return <ListEmpty title={t('tournamentNotFound')} />

  return (
    <ScrollView>
      <VStack p="$3" gap="$3">
        <MatchTypeTile isCompetitive={tournament.is_competitive} />
        <Section title={tournament.title}>
          <Text>{tournament.description}</Text>
        </Section>
        <Section>
          <SectionRow
            title={tGlobal('location')}
            icon="FAS-location-dot"
            rightComponent={() => <Text>{tournament.complex?.name}</Text>}
          />
          <SectionRow
            title={tGlobal('date')}
            icon="FAR-calendar"
            rightComponent={() => (
              <Text>{date.dayjs(tournament.datetime).format('LLL')}</Text>
            )}
          />
        </Section>
        <Button
          title={tGlobal('participate')}
          onPress={() => alert('Not available yet')}
          isDisabled={!me}
        />
      </VStack>
    </ScrollView>
  )
}
