import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useMemo } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { PlayerListItem } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { FavoriteUsersResponse, useInfiniteFavoriteUsers } from '@/services/api'
import { routing } from '@/services/routing'

export default () => {
  const {
    data: favUsersPages,
    isLoading,
    isFetchingNextPage,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteFavoriteUsers()

  const favUsers = useMemo(
    () =>
      favUsersPages?.pages.reduce<FavoriteUsersResponse['results']>(
        (acc, curr) => [...acc, ...curr.results],
        []
      ),
    [favUsersPages?.pages]
  )

  const renderItem = ({
    item,
  }: ListRenderItemInfo<FavoriteUsersResponse['results'][number]>) => (
    <PlayerListItem
      {...item}
      displayStar={false}
      onPress={() =>
        item.id && router.navigate(routing.communityUser.path(item.id))
      }
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <VirtualizedList<FavoriteUsersResponse['results'][number]>
        data={favUsers}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        isLoading={isLoading}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={() => hasNextPage && fetchNextPage()}
        isLoadingNext={isFetchingNextPage}
      />
    </VStack>
  )
}
