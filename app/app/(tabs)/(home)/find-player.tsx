import { Box, VStack } from '@gluestack-ui/themed'
import { useState } from 'react'
import { ListRenderItemInfo, VirtualizedList } from 'react-native'

import { PlayerListItem } from '@/components'
import { Loader } from '@/designSystem'
import { SearchInput } from '@/designSystem/SearchInput/SearchInput'
import { useDebounce } from '@/hooks/useDebounce'
import { useMe } from '@/hooks/useMe'
import { ProfileWithAvatar } from '@/hooks/useProfileWithAvatar'
import { useProfilesWithAvatar } from '@/hooks/useProfilesWithAvatar'
import { ProfileResponse } from '@/services/api'

export default () => {
  const [search, setSearch] = useState<string | undefined>(undefined)
  const setSearchDebounced = useDebounce(setSearch)

  const { data: me } = useMe()

  const { data: users, isLoading } = useProfilesWithAvatar({
    params: { current_user_id: me?.id, search },
    options: { enabled: !!search },
  })

  const renderItem = ({ item }: ListRenderItemInfo<ProfileWithAvatar>) => (
    <PlayerListItem {...item} />
  )

  const ItemSeparatorComponent = () => <Box pt="$3" />

  return (
    <VStack gap="$3" m="$3">
      <SearchInput onChangeText={setSearchDebounced} />
      {isLoading ? (
        <Loader />
      ) : (
        users && (
          <VirtualizedList<ProfileResponse>
            style={{ height: '100%' }}
            data={users}
            getItem={(data, index) => data[index]}
            getItemCount={(data) => data.length}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        )
      )}
    </VStack>
  )
}
