import { VStack } from '@gluestack-ui/themed'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { PlayerListItem } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { SearchInput } from '@/designSystem/SearchInput/SearchInput'
import { useDebounce } from '@/hooks/useDebounce'
import { useManageMatchRequests } from '@/hooks/useManageMatchRequests'
import { ProfileWithAvatar } from '@/hooks/useProfileWithAvatar'
import { ProfileResponse, useMatchRequests } from '@/services/api'
import { getPublicAvatarUrl } from '@/utils/avatar'

export default () => {
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  const [search, setSearch] = useState<string | undefined>(undefined)
  const { isDebouncing, debouncedCallback: setSearchDebounced } =
    useDebounce(setSearch)

  const {
    data: matchRequests,
    isLoading,
    refetch,
    isRefetching,
  } = useMatchRequests({
    params: { match_id: matchId, search },
    options: { enabled: !!matchId },
  })

  const data =
    matchRequests?.map(({ player }) => {
      if (!player?.avatar_url) return player

      return { ...player, avatar: getPublicAvatarUrl(player.avatar_url) }
    }) || []

  const {
    accept,
    isLoading: isManageMatchRequestsLoading,
    refuse,
  } = useManageMatchRequests(matchId)

  const renderItem = ({ item }: ListRenderItemInfo<ProfileWithAvatar>) => (
    <PlayerListItem
      {...item}
      onPress={() =>
        router.navigate(`/(tabs)/play/match/${matchId}/user/${item.id}`)
      }
      matchRequest={{
        isLoading: isManageMatchRequestsLoading,
        onAcceptPress: () => item.id && accept(item.id),
        onRefusePress: () => item.id && refuse(item.id),
      }}
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <SearchInput onChangeText={setSearchDebounced} />

      <VirtualizedList<ProfileResponse>
        data={data}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        isLoading={isLoading || isDebouncing}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </VStack>
  )
}
