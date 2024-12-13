import { Box, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'

import { MatchListItem, WithAuth } from '@/components'
import { VirtualizedList } from '@/designSystem'
import {
  MatchesResponse,
  useComplexes,
  useInfiniteIncomingMatches,
} from '@/services/api'
import { DefaultMinimalProfileResponse } from '@/services/api/types'
import { routing } from '@/services/routing'

export default WithAuth(() => {
  const { data: complexes, isLoading: isLoadingComplexes } = useComplexes()

  const {
    data: matchesPages,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteIncomingMatches()

  const matches = matchesPages?.pages.reduce<MatchesResponse['results']>(
    (prev, acc) => [...prev, ...acc.results],
    []
  )

  const renderItem = ({
    item,
  }: ListRenderItemInfo<MatchesResponse['results'][number]>) => (
    <MatchListItem
      {...item}
      displayRequest
      complexes={complexes}
      participants={item.teams.reduce<DefaultMinimalProfileResponse[]>(
        (acc, curr) => [...acc, ...curr.participants],
        []
      )}
      onPress={() => router.push(routing.match.path(item.id))}
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <Box flex={1}>
        <VirtualizedList<MatchesResponse['results'][number]>
          data={matches}
          getItem={(data, index) => data[index]}
          getItemCount={(data) => data.length}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          isLoading={isLoading || isLoadingComplexes}
          onRefresh={refetch}
          refreshing={isRefetching}
          onEndReached={() => hasNextPage && fetchNextPage}
          isLoadingNext={isFetchingNextPage}
        />
      </Box>
    </VStack>
  )
})
