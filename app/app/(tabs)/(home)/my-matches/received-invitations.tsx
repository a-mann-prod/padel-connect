import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'

import { MatchListItem } from '@/components'
import { VirtualizedList } from '@/designSystem'
import {
  MatchesResponse,
  useComplexes,
  useInfiniteMatchesInvitations,
} from '@/services/api'
import { routing } from '@/services/routing'

export default () => {
  const { data: complexes, isLoading: isComplexesLoading } = useComplexes()

  const {
    data: invitationPages,
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMatchesInvitations()

  const invitations = invitationPages?.pages.reduce<MatchesResponse['results']>(
    (prev, acc) => [...prev, ...acc.results],
    []
  )

  const renderItem = ({
    item,
  }: ListRenderItemInfo<MatchesResponse['results'][number]>) => (
    <MatchListItem
      {...item}
      type="invitation"
      complexes={complexes}
      onPress={() => router.push(routing.match.path(item.id))}
      participants={[...item.team_1_users, ...item.team_2_users]}
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <VirtualizedList<MatchesResponse['results'][number]>
        data={invitations}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        isLoading={isLoading && isComplexesLoading}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={() => hasNextPage && fetchNextPage()}
        isLoadingNext={isFetchingNextPage}
      />
    </VStack>
  )
}
