import { VStack } from '@gluestack-ui/themed'
import { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { PlayerListItem } from '../PlayerListItem/PlayerListItem'

import { SearchInput, VirtualizedList } from '@/designSystem'
import { useDebounce } from '@/hooks/useDebounce'
import { useHeaderButton } from '@/hooks/useHeaderButton'
import { useMe } from '@/hooks/useMe'
import {
  ProfilesResponse,
  useInfiniteFavoriteUsers,
  useInfiniteProfiles,
} from '@/services/api'

export type SearchUserProps = {
  onSelectButtonPress?: (id: number) => void
  onPress?: (id: number) => void
  selectedUserIds?: number[]
  displayFavHeaderButton?: boolean
  maxSelectedUserIds?: number
  disabledUserIds?: number[]
  displaySearchBar?: boolean
}

export const SearchUser = ({
  onSelectButtonPress,
  onPress,
  selectedUserIds,
  displayFavHeaderButton = true,
  maxSelectedUserIds,
  disabledUserIds = [],
  displaySearchBar = true,
}: SearchUserProps) => {
  const { data: me } = useMe()
  const [isFavMode, setIsFavMode] = useState(false)

  const onFavPress = () => {
    setIsFavMode((prev) => !prev)
  }

  useHeaderButton(
    [
      {
        icon: isFavMode ? 'FAS-star' : 'FAR-star',
        condition: displayFavHeaderButton && !!me,
        onPress: onFavPress,
      },
    ],
    'headerRight'
  )

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
    options: { enabled: enableSearch && !isFavMode },
  })

  const {
    data: favUsersPages,
    isLoading: isLoadingFav,
    isFetchingNextPage: isFetchingNextPageFav,
    refetch: refetchFav,
    isRefetching: isRefetchingFav,
    hasNextPage: hasNextPageFav,
    fetchNextPage: fetchNextPageFav,
  } = useInfiniteFavoriteUsers({
    params: { search },
    options: { enabled: isFavMode },
  })

  const profiles = enableSearch
    ? profilesPages?.pages.reduce<ProfilesResponse['results']>(
        (prev, acc) => [...prev, ...acc.results],
        []
      )
    : undefined

  const favUsers = favUsersPages?.pages.reduce<ProfilesResponse['results']>(
    (prev, acc) => [...prev, ...acc.results],
    []
  )

  const isSelectDisabled = (currentId: number) => {
    if (maxSelectedUserIds === null || maxSelectedUserIds === undefined) {
      return false
    }

    if (selectedUserIds?.includes(currentId)) {
      return false
    }

    return (selectedUserIds?.length || 0) >= maxSelectedUserIds
  }

  const renderItem = ({
    item,
  }: ListRenderItemInfo<ProfilesResponse['results'][number]>) => (
    <PlayerListItem
      {...item}
      onSelectButtonPress={
        onSelectButtonPress ? () => onSelectButtonPress(item.id) : undefined
      }
      onPress={onPress ? () => onPress(item.id) : undefined}
      isSelected={selectedUserIds?.includes(item.id)}
      isSelectDisabled={isSelectDisabled(item.id)}
      isDisabled={disabledUserIds.includes(item.id)}
    />
  )

  return (
    <VStack gap="$3" flex={1}>
      {displaySearchBar && <SearchInput onChangeText={setSearchDebounced} />}

      <VirtualizedList<ProfilesResponse['results'][number]>
        data={isFavMode ? favUsers : profiles}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        isLoading={isFavMode ? isLoadingFav : isLoading || isDebouncing}
        refreshing={isFavMode ? isRefetchingFav : isRefetching}
        onRefresh={isFavMode ? refetchFav : refetch}
        onEndReached={() =>
          isFavMode
            ? hasNextPageFav && fetchNextPageFav()
            : hasNextPage && fetchNextPage()
        }
        isLoadingNext={isFavMode ? isFetchingNextPageFav : isFetchingNextPage}
      />
    </VStack>
  )
}
