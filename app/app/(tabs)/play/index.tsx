import { HStack, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { DateCarouselFilter, MatchListItem } from '@/components'
import { Button, VirtualizedList } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { useMyMatchFilters } from '@/hooks/useMyMatchFilters'
import { MatchesResponse, useMatches } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { getLevelRange } from '@/utils/level'

export default () => {
  const t = useTranslate('play')
  const [dateFilter, setDateFilter] = useState(date.now())

  const { data: me } = useMe()
  const { data: matchFilters } = useMyMatchFilters()

  const [min, max] = matchFilters?.is_my_level_range
    ? getLevelRange(me?.level)
    : [undefined, undefined]

  const isToday = dateFilter.isSame(date.now(), 'day')

  const {
    data: matches,
    isLoading,
    refetch,
    isRefetching,
  } = useMatches({
    params: {
      dates: {
        start: isToday
          ? dateFilter.toISOString()
          : dateFilter.startOf('day').toISOString(),
        end: dateFilter.endOf('day').toISOString(),
      },
      level: {
        min,
        max,
      },
      ...matchFilters,
    },
  })

  const renderItem = ({
    item,
  }: ListRenderItemInfo<MatchesResponse[number]>) => (
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

      <VirtualizedList<MatchesResponse[number]>
        data={matches}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        isLoading={isLoading}
        onRefresh={refetch}
        refreshing={isRefetching}
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
