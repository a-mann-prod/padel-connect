import { VStack } from '@gluestack-ui/themed'
import { router, useLocalSearchParams } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'

import { PlayerListItem, WithMatch } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { useManageMatchRequests } from '@/hooks/useManageMatchRequests'
import { ProfileWithAvatar } from '@/hooks/useProfileWithAvatar'
import { ProfileResponse, useMatchRequests } from '@/services/api'
import { routing } from '@/services/routing'
import { getPublicAvatarUrl } from '@/utils/avatar'

export default WithMatch(() => {
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  const {
    data: matchRequests,
    isLoading,
    refetch,
    isRefetching,
  } = useMatchRequests({
    params: { match_id: matchId },
    options: { enabled: !!matchId, staleTime: 0 },
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
        item.id && router.navigate(routing.matchUser.path(matchId, item.id))
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
      <VirtualizedList<ProfileResponse>
        data={data}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        isLoading={isLoading}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </VStack>
  )
})
