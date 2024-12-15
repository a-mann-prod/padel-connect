import { VStack } from '@gluestack-ui/themed'
import { router, useLocalSearchParams } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'

import { TeamListItem, WithAuth, WithMatch } from '@/components'
import { Loader, VirtualizedList } from '@/designSystem'
import {
  MatchInvitationsResponse,
  useInfiniteMatchInvitations,
  useManageMatchInvitation,
} from '@/services/api'
import { routing } from '@/services/routing'

export default WithAuth(
  WithMatch(() => {
    const local = useLocalSearchParams()
    const matchId = Number(local?.match)

    const {
      data: matchInvitationsPages,
      isLoading,
      refetch,
      isRefetching,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
    } = useInfiniteMatchInvitations({
      params: { matchId },
    })

    const { mutate: manageInvitation, isPending } = useManageMatchInvitation()

    if (isLoading) return <Loader />

    const matchInvitations = matchInvitationsPages?.pages.reduce<
      MatchInvitationsResponse['results']
    >((prev, acc) => [...prev, ...acc.results], [])

    const renderItem = ({
      item,
    }: ListRenderItemInfo<MatchInvitationsResponse['results'][number]>) => (
      <TeamListItem
        {...item}
        invitations={item.team.invitations}
        onPress={() =>
          item.id && router.navigate(routing.matchUser.path(matchId, item.id))
        }
        request={{
          isLoading: isPending,
          onAcceptPress: () =>
            item.id &&
            manageInvitation({ matchId, id: item.id, action: 'accept' }),
          onRefusePress: () =>
            item.id &&
            manageInvitation({ matchId, id: item.id, action: 'refuse' }),
        }}
      />
    )

    return (
      <VStack flex={1} gap="$3" m="$3">
        <VirtualizedList<MatchInvitationsResponse['results'][number]>
          data={matchInvitations}
          getItem={(data, index) => data[index]}
          getItemCount={(data) => data.length}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          isLoading={isLoading}
          onRefresh={refetch}
          refreshing={isRefetching}
          isLoadingNext={isFetchingNextPage}
          onEndReached={() => hasNextPage && fetchNextPage()}
        />
      </VStack>
    )
  })
)
