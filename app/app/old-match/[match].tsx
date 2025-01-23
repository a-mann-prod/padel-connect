import { RefreshControl, SafeAreaView, VStack } from '@gluestack-ui/themed'
import { useLocalSearchParams } from 'expo-router'

import { MatchInfo, MatchPlayers, MatchTiles } from '@/components'
import { Loader, ScrollView } from '@/designSystem'
import { useMatchArchive } from '@/services/api'

export default () => {
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  const {
    data: match,
    isLoading,
    refetch,
    isRefetching,
  } = useMatchArchive({ params: { id: matchId } })

  if (isLoading) return <Loader />

  if (!match) return

  return (
    <>
      <SafeAreaView flex={1}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        >
          <VStack p="$3" gap="$3">
            <MatchTiles isPast isCompetitive={match.is_competitive} />
            <MatchInfo
              complexName={match.complex.name}
              datetime={match.datetime}
              duration={match.duration}
              fieldName={match.four_padel_field_name}
              isOpenToAll={match.is_open_to_all_level}
              levelRange={match.calculated_level_range}
              owner={match.user}
            />
            <MatchPlayers
              isMatchPast
              team_1_users={match.team_1_users}
              team_2_users={match.team_2_users}
              score={match.score_data}
            />
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
