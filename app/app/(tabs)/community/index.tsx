import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { PlayerListItem } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { SearchInput } from '@/designSystem/SearchInput/SearchInput'
import { useDebounce } from '@/hooks/useDebounce'
import { useMe } from '@/hooks/useMe'
import { ProfileWithAvatar } from '@/hooks/useProfileWithAvatar'
import { useProfilesWithAvatar } from '@/hooks/useProfilesWithAvatar'
import { ProfileResponse, useFavoriteUsers } from '@/services/api'

export default () => {
  const [search, setSearch] = useState<string | undefined>(undefined)
  const { isDebouncing, debouncedCallback: setSearchDebounced } =
    useDebounce(setSearch)

  const enableSearch = !!search

  const { data: me } = useMe()

  const { data: users, isLoading } = useProfilesWithAvatar({
    params: { current_user_id: me?.id, search },
    options: { enabled: enableSearch },
  })

  const { data: favUsers } = useFavoriteUsers({
    params: { user_id: me?.id as string },
    options: { enabled: enableSearch && !!me?.id },
  })

  const renderItem = ({ item }: ListRenderItemInfo<ProfileWithAvatar>) => (
    <PlayerListItem
      {...item}
      onPress={() => router.navigate(`/community/${item.id}`)}
      isFavorite={!!favUsers?.some((u) => u.favorite_user_id === item.id)}
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <SearchInput onChangeText={setSearchDebounced} />

      <VirtualizedList<ProfileResponse>
        data={users || []}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        isLoading={isLoading || isDebouncing}
      />
    </VStack>
  )
}
