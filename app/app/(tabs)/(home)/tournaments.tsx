import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'

import { TournamentListItem } from '@/components'
import { useFiltersContext } from '@/contexts'
import { VirtualizedList } from '@/designSystem'
import { TournamentResponse, useTournaments } from '@/services/api'
import { routing } from '@/services/routing'

export default () => {
  const { tournamentsFilters } = useFiltersContext()

  const { data, isLoading, refetch, isRefetching } = useTournaments({
    params: {
      ...tournamentsFilters,
    },
  })

  const renderItem = ({ item }: ListRenderItemInfo<TournamentResponse>) => (
    <TournamentListItem
      {...item}
      onPress={() =>
        item.id && router.navigate(routing.homeTournamentDetail.path(item.id))
      }
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <VirtualizedList<TournamentResponse>
        data={data}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        isLoading={isLoading}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </VStack>
  )
}
