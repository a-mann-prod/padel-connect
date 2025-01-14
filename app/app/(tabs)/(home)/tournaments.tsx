import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'

import { TournamentListItem } from '@/components'
import { useFiltersContext } from '@/contexts'
import { VirtualizedList } from '@/designSystem'
import {
  TournamentsResponse,
  useComplexes,
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
  const { data: complexes } = useComplexes()

  useEffect(() => {
    if (matchFilters && complexes) {
      setTournamentsFilters({
        complex: matchFilters.complex || complexes.results[0].id,
      })
    }
  }, [complexes, matchFilters, setTournamentsFilters])

  const { data, isLoading, refetch, isRefetching } = useTournaments({
    params: {
      date: date.now().format('YYYY-MM-DD'),
      complex: tournamentsFilters.complex,
    },
  })

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
