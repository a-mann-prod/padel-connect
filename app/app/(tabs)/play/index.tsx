import { HStack, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { DateCarouselFilter, MatchListItem } from '@/components'
import { useFiltersContext } from '@/contexts'
import { Button, VirtualizedList } from '@/designSystem'
import {
  MatchesResponse,
  useComplexes,
  useInfiniteMatches,
} from '@/services/api'
import { DefaultMinimalProfileResponse } from '@/services/api/types'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const t = useTranslate('play')
  const [dateFilter, setDateFilter] = useState(date.now())

  const { filters } = useFiltersContext()

  const isToday = dateFilter.isSame(date.now(), 'day')

  const {
    data: matchesPages,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteMatches({
    params: {
      start_datetime: isToday
        ? dateFilter.toISOString()
        : dateFilter.startOf('day').toISOString(),
      end_datetime: dateFilter.endOf('day').toISOString(),
      ...filters,
    },
  })

  const matches = matchesPages?.pages.reduce<MatchesResponse['results']>(
    (acc, curr) => [...acc, ...curr.results],
    []
  )

  const { data: complexes, isLoading: isLoadingComplexes } = useComplexes()

  const renderItem = ({
    item,
  }: ListRenderItemInfo<MatchesResponse['results'][number]>) => (
    <MatchListItem
      {...item}
      participants={item.teams.reduce<DefaultMinimalProfileResponse[]>(
        (acc, curr) => [...acc, ...curr.participants],
        []
      )}
      complexes={complexes}
      onPress={() => router.push(routing.match.path(item.id))}
    />
  )

  return (
    <VStack gap="$3" mx="$3" mb="$3" h="$full" flex={1}>
      {/* Filters */}
      <HStack gap="$3" pt="$3">
        {/* <IconButton icon="FAS-street-view" h="$full" /> */}
        <DateCarouselFilter
          // isRefetching={isRefetching}
          onChange={setDateFilter}
          value={dateFilter}
        />
      </HStack>

      <VirtualizedList<MatchesResponse['results'][number]>
        data={matches}
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
      <Button
        title={t('createNewMatch')}
        icon="FAS-plus"
        onPress={() => {
          const currentTime = date.now()

          const datetime = dateFilter
            .set('hour', currentTime.hour()) // Met à jour l'heure
            .set('minute', currentTime.minute()) // Met à jour la minute
            .set('second', currentTime.second()) // Met à jour la seconde
            .toISOString() // Transforme en chaîne ISO

          router.navigate(routing.matchCreate.path({ datetime }))
        }}
      />
    </VStack>
  )
}
