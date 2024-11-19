import { VStack } from '@gluestack-ui/themed'
import { useLocalSearchParams } from 'expo-router'

import {
  MatchRequestButton,
  PlayerListItem,
  WithAuth,
  WithMatch,
} from '@/components'
import { SearchInput, VirtualizedList } from '@/designSystem'
import { useDebounce } from '@/hooks/useDebounce'
import { useManageMatch } from '@/hooks/useManageMatch'
import { ProfilesResponse, useInfiniteProfiles } from '@/services/api'
import { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'

export default WithAuth(
  WithMatch(() => {
    const local = useLocalSearchParams()
    const matchId = Number(local?.match)

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

    const {
      isRequesting,
      requestMatch,
      cancelRequestMatch,
      isRequestMatchPending,
      isCancelRequestMatchPending,
    } = useManageMatch(matchId)

    const renderItem = ({
      item,
    }: ListRenderItemInfo<ProfilesResponse['results'][number]>) => (
      <PlayerListItem
        {...item}
        onPress={() => item.id && console.log('click')}
      />
    )

    //match compet -> ajouter un partenaire
    //other match Ajouter un ou plusieurs partenaires

    return (
      <VStack flex={1} gap="$3" m="$3">
        {/* Listing des joueurs ajoutés avec possibilité de les supprimer */}
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

        <MatchRequestButton
          onPress={requestMatch}
          onCancelPress={cancelRequestMatch}
          isRequesting={isRequesting}
          isLoading={isRequestMatchPending || isCancelRequestMatchPending}
        />
      </VStack>
    )
  })
)
