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
import { ProfileResponse } from '@/services/api'
import { routing } from '@/services/routing'

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
      <SearchInput onChangeText={setSearchDebounced} />

      <VirtualizedList<ProfileResponse>
        data={users}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        isLoading={isLoading || isDebouncing}
      />
    </VStack>
  )
}
