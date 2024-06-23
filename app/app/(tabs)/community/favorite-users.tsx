import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useMemo } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { PlayerListItem } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { ProfileWithAvatar } from '@/hooks/useProfileWithAvatar'
import { ProfileResponse, useInfiniteFavoriteUsers } from '@/services/api'
import { routing } from '@/services/routing'
import { getPublicAvatarUrl } from '@/utils/avatar'

export default () => {
  const { data: me } = useMe()

  const {
    data: favUsers,
    fetchNext,
    isLoading,
    isLoadingNext,
  } = useInfiniteFavoriteUsers({
    params: { user_id: me?.id as string },
    options: { enabled: !!me?.id },
  })

  const formattedFavUsers = useMemo(
    () =>
      favUsers?.map(({ favorite_user: f }) => {
        if (!f?.avatar_url) return f
        return {
          ...f,
          avatar: getPublicAvatarUrl(f.avatar_url),
        }
      }),
    [favUsers]
  )

  const renderItem = ({ item }: ListRenderItemInfo<ProfileWithAvatar>) => (
    <PlayerListItem
      {...item}
      onPress={() =>
        item.id && router.navigate(routing.communityUser.path(item.id))
      }
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <VirtualizedList<ProfileResponse>
        data={formattedFavUsers}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        isLoading={isLoading}
        onEndReached={fetchNext}
        isLoadingNext={isLoadingNext}
      />
    </VStack>
  )
}
