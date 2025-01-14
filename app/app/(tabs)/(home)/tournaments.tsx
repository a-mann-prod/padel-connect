import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'

import { TournamentListItem } from '@/components'
import { useFiltersContext } from '@/contexts'
import { VirtualizedList } from '@/designSystem'
import {
  TournamentsResponse,
  useMatchFilters,
  useTournaments,
} from '@/services/api'
import { MatchType } from '@/services/api/types'
import { date } from '@/services/date'
import { routing } from '@/services/routing'
import { useEffect } from 'react'

export default () => {
  const { tournamentsFilters, setTournamentsFilters } = useFiltersContext()

  const { data: matchFilters } = useMatchFilters()

  useEffect(() => {
    if (matchFilters) {
      setTournamentsFilters({ complex: matchFilters.complex })
    }
  }, [matchFilters, setTournamentsFilters])

  const { data, isLoading, refetch, isRefetching } = useTournaments({
    params: {
      date: date.now().format('YYYY-MM-DD'),
      complex: tournamentsFilters.complex,
    },
  })

  console.log(tournamentsFilters)

  const filteredData = !tournamentsFilters.type
    ? data
    : data?.filter(({ isCompetitive }) =>
        tournamentsFilters.type === MatchType.COMPETITION
          ? isCompetitive
          : !isCompetitive
      )

  const renderItem = ({
    item,
  }: ListRenderItemInfo<TournamentsResponse[number]>) => (
    <TournamentListItem
      {...item}
      onPress={() =>
        item.id && router.navigate(routing.homeTournamentDetail.path(item.id))
      }
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <VirtualizedList<TournamentsResponse[number]>
        data={filteredData}
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
