import { VStack } from '@gluestack-ui/themed'
import { router, useLocalSearchParams } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'

import { PlayerListItem, WithMatch } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { ProfileResponse } from '@/services/api'
import { routing } from '@/services/routing'

export default WithMatch(() => {
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  // TODO A REVOIR
  // const {
  //   data: matchRequests,
  //   isLoading,
  //   refetch,
  //   isRefetching,
  // } = useMatchRequests({
  //   params: { match_id: matchId },
  //   options: { enabled: !!matchId, staleTime: 0 },
  // })

  const data = [] as any[]

  const renderItem = ({ item }: ListRenderItemInfo<ProfileResponse>) => (
    <PlayerListItem
      {...item}
      onPress={() =>
        item.id && router.navigate(routing.matchUser.path(matchId, item.id))
      }
      // TODO A REVOIR
      matchRequest={{
        isLoading: false,
        onAcceptPress: () => item.id && console.log(item.id),
        onRefusePress: () => item.id && console.log(item.id),
      }}
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <VirtualizedList<ProfileResponse>
        data={data}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        // A Revoir
        isLoading={false}
        refreshing={false}
        onRefresh={() => console.log('a revoir')}
      />
    </VStack>
  )
})
