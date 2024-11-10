import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { PlayerListItem } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { SearchInput } from '@/designSystem/SearchInput/SearchInput'
import { useDebounce } from '@/hooks/useDebounce'
import { ProfilesResponse, useInfiniteProfiles } from '@/services/api'
import { routing } from '@/services/routing'

export default () => {
  const [search, setSearch] = useState<string | undefined>(undefined)
  const { isDebouncing, debouncedCallback: setSearchDebounced } =
    useDebounce(setSearch)

  const enableSearch = !!search

  const {
    data: profilesPages,
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProfiles({
    params: { search },
    options: { enabled: enableSearch },
  })

  const profiles = enableSearch
    ? profilesPages?.pages.reduce<ProfilesResponse['results']>(
        (prev, acc) => [...prev, ...acc.results],
        []
      )
    : undefined

  const renderItem = ({
    item,
  }: ListRenderItemInfo<ProfilesResponse['results'][number]>) => (
    <PlayerListItem
      {...item}
      onPress={() =>
        item.id && router.navigate(routing.communityUser.path(item.id))
      }
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <SearchInput onChangeText={setSearchDebounced} />

      <VirtualizedList<ProfilesResponse['results'][number]>
        data={profiles}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        isLoading={isLoading || isDebouncing}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={() => hasNextPage && fetchNextPage()}
        isLoadingNext={isFetchingNextPage}
      />
    </VStack>
  )
}
