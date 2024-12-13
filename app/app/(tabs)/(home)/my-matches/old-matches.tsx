import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'

import { MatchListItem } from '@/components'
import { VirtualizedList } from '@/designSystem'
import {
  MatchesArchiveResponse,
  useComplexes,
  useInfiniteMatchesArchive,
} from '@/services/api'
import { routing } from '@/services/routing'

export default () => {
  const { data: complexes, isLoading: isLoadingComplexes } = useComplexes()

  const {
    data: matchesArchivePages,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteMatchesArchive()

  const matchesArchive = matchesArchivePages?.pages.reduce<
    MatchesArchiveResponse['results']
  >((prev, acc) => [...prev, ...acc.results], [])

  const renderItem = ({
    item,
  }: ListRenderItemInfo<MatchesArchiveResponse['results'][number]>) => (
    <MatchListItem
      {...item}
      onPress={() => router.push(routing.match.path(item.id))}
      complexes={complexes}
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <VirtualizedList<MatchesArchiveResponse['results'][number]>
        data={matchesArchive}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        isLoading={isLoading || isLoadingComplexes}
        onRefresh={refetch}
        refreshing={isRefetching}
        onEndReached={() => hasNextPage && fetchNextPage()}
        isLoadingNext={isFetchingNextPage}
      />
    </VStack>
  )
}
