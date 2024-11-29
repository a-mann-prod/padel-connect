import { VStack } from '@gluestack-ui/themed'
import { router, useLocalSearchParams } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'

import { TeamListItem, WithMatch } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { MatchTeamsResponse, useInfiniteMatchTeams } from '@/services/api'
import { routing } from '@/services/routing'

export default WithMatch(() => {
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  const {
    data: matchTeamsPages,
    isLoading,
    refetch,
    isRefetching,

    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteMatchTeams({
    params: { id: matchId },
    options: { enabled: !!matchId },
  })

  const matchTeams = matchTeamsPages?.pages.reduce<
    MatchTeamsResponse['results']
  >((prev, acc) => [...prev, ...acc.results], [])

  const renderItem = ({
    item,
  }: ListRenderItemInfo<MatchTeamsResponse['results'][number]>) => (
    <TeamListItem
      {...item}
      onPress={() =>
        item.id && router.navigate(routing.matchUser.path(matchId, item.id))
      }
      // TODO A REVOIR
      matchRequest={{
        isLoading: false,
        onAcceptPress: () => item.id && console.log(item.id),
        onRefusePress: () => item.id && console.log(item.id),
      }}
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <VirtualizedList<MatchTeamsResponse['results'][number]>
        data={matchTeams}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        isLoading={isLoading}
        onRefresh={refetch}
        refreshing={isRefetching}
        isLoadingNext={isFetchingNextPage}
        onEndReached={() => hasNextPage && fetchNextPage()}
      />
    </VStack>
  )
})
