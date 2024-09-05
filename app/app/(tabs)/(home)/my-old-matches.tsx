import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useMemo } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { MatchListItem } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { MatchesResponse, useMatches } from '@/services/api'
import { date } from '@/services/date'
import { routing } from '@/services/routing'
import { isNilOrEmpty } from '@/utils/global'

export default () => {
  const { data: me } = useMe()

  const dates = useMemo(
    () => ({
      end: date.now().toISOString(),
    }),
    []
  )

  const {
    data: matches,
    isLoading,
    refetch,
    isRefetching,
  } = useMatches({
    params: {
      dates,
      orderBy: { datetime: false },
      user_id: me?.id,
    },
    options: {
      enabled: !isNilOrEmpty(me?.id),
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
    <VStack flex={1} gap="$3" m="$3">
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
    </VStack>
  )
}
