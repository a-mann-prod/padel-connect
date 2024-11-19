import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useMemo } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { MatchListItem } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { MatchesResponse } from '@/services/api'
import { date } from '@/services/date'
import { routing } from '@/services/routing'

export default () => {
  const { data: me } = useMe()

  const dates = useMemo(
    () => ({
      end: date.now().toISOString(),
    }),
    []
  )

  // todo: with too much old matches, it will crash !
  // const { data: userMatches, isLoading: isLoadingMatchIds } = useUserMatches({
  //   params: { user_id: me?.id as string, dates },
  //   options: { enabled: !isNilOrEmpty(me?.id) },
  // })

  // const matchIds = userMatches?.map(({ id }) => id) || []

  // const {
  //   data: matches,
  //   isLoading,
  //   refetch,
  //   isRefetching,
  // } = useMatches({
  //   params: {
  //     match_ids: matchIds,
  //     orderBy: { datetime: false },
  //   },
  //   options: {
  //     enabled: !isNilOrEmpty(me?.id),
  //   },
  // })
  const matches = [] as any[]
  const isLoading = false
  const isRefetching = false
  const isLoadingMatchIds = false
  const refetch = () => console.log('refetch')

  const renderItem = ({
    item,
  }: ListRenderItemInfo<MatchesResponse['results'][number]>) => (
    <MatchListItem
      {...item}
      onPress={() => router.push(routing.match.path(item.id))}
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <VirtualizedList<MatchesResponse['results'][number]>
        data={matches}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        isLoading={isLoading || isLoadingMatchIds}
        onRefresh={refetch}
        refreshing={isRefetching}
      />
    </VStack>
  )
}
