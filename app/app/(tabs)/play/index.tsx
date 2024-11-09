import { HStack, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { DateCarouselFilter, MatchListItem } from '@/components'
import { Button, VirtualizedList } from '@/designSystem'
import { MatchesResponse, useInfiniteMatches } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const t = useTranslate('play')
  const [dateFilter, setDateFilter] = useState(date.now())

  // const { filters } = useFiltersContext()

  // const [min, max] = [filters.level_min, filters.level_max]

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
      // ...filters,
    },
  })

  const matches = matchesPages?.pages.reduce<MatchesResponse['results']>(
    (acc, curr) => [...acc, ...curr.results],
    []
  )

  const renderItem = ({
    item,
  }: ListRenderItemInfo<MatchesResponse['results'][number]>) => (
    <MatchListItem
      {...item}
      onPress={() => router.push(routing.match.path(item.id))}
    />
  )

  return (
    <VStack gap="$3" mx="$3" mb="$3" h="$full" flex={1}>
      {/* Filters */}
      <HStack gap="$3" pt="$3">
        {/* <IconButton icon="FAS-street-view" h="$full" /> */}
        <DateCarouselFilter
          isRefetching={isRefetching}
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
        isLoading={isLoading}
        onRefresh={refetch}
        refreshing={isRefetching}
        onEndReached={() => hasNextPage && fetchNextPage()}
        isLoadingNext={isFetchingNextPage}
      />
      <Button
        title={t('createNewMatch')}
        icon="FAS-plus"
        onPress={() =>
          router.navigate(
            routing.matchCreate.path({ datetime: dateFilter.toISOString() })
          )
        }
      />
    </VStack>
  )
}
