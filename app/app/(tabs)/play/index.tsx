import { HStack, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { DateCarouselFilter, MatchListItem } from '@/components'
import { useMatchFiltersContext } from '@/contexts'
import { Button, VirtualizedList } from '@/designSystem'
import { useHeaderButton } from '@/hooks/useHeaderButton'
import { MatchesResponse, useMatches } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'

export default () => {
  const t = useTranslate('play')
  const [dateFilter, setDateFilter] = useState(date.now())
  const { matchFilters, defaultMatchFilters } = useMatchFiltersContext()

  const {
    data: matches,
    isLoading,
    refetch,
    isRefetching,
  } = useMatches({
    params: {
      dates: {
        start: dateFilter.startOf('day').toISOString(),
        end: dateFilter.endOf('day').toISOString(),
      },
      ...matchFilters,
    },
  })

  useHeaderButton({
    side: 'headerRight',
    icon: 'FAS-sliders',
    onPress: () => router.navigate('/(tabs)/play/filters'),
    hasBadge:
      JSON.stringify(defaultMatchFilters) !== JSON.stringify(matchFilters),
  })

  const renderItem = ({
    item,
  }: ListRenderItemInfo<MatchesResponse[number]>) => (
    <MatchListItem
      {...item}
      onPress={() => router.push(`/(tabs)/play/match/${item.id}`)}
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
            `/(tabs)/play/match/create?datetime=${dateFilter.toISOString()}`
          )
        }
      />
    </VStack>
  )
}
