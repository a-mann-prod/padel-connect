import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'

import { TournamentListItem } from '@/components'
import { useFiltersContext } from '@/contexts'
import { VirtualizedList } from '@/designSystem'
import { TournamentsResponse, useInfiniteTournaments } from '@/services/api'
import { routing } from '@/services/routing'

export default () => {
  const { tournamentsFilters } = useFiltersContext()

  const {
    data: tournamentsPages,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteTournaments({
    params: tournamentsFilters,
  })

  const renderItem = ({
    item,
  }: ListRenderItemInfo<TournamentsResponse['results'][number]>) => (
    <TournamentListItem
      {...item}
      onPress={() =>
        item.id && router.navigate(routing.homeTournamentDetail.path(item.id))
      }
    />
  )

  const data = tournamentsPages?.pages.reduce<TournamentsResponse['results']>(
    (prev, acc) => [...prev, ...acc.results],
    []
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <VirtualizedList<TournamentsResponse['results'][number]>
        data={data}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        isLoading={isLoading}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={() => hasNextPage && fetchNextPage()}
        isLoadingNext={isFetchingNextPage}
      />
    </VStack>
  )
}
