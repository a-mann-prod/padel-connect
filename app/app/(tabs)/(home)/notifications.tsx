import { VStack } from '@gluestack-ui/themed'
import { ListRenderItemInfo } from 'react-native'

import { NotificationListItem, NotificationListItemProps } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { useHeaderButton } from '@/hooks/useHeaderButton'
import { useMe } from '@/hooks/useMe'
import {
  useInfiniteAllNotifications,
  useUpdateNotification,
} from '@/services/api'
import { router } from 'expo-router'

export default () => {
  const { data: me } = useMe()

  const {
    data: notifications,
    isLoading,
    isLoadingNext,
    fetchNext,
    refetch,
    isRefetching,
  } = useInfiniteAllNotifications({
    params: { user_id: me?.id as string },
  })

  const { mutate } = useUpdateNotification({
    onError: (e) => console.log(e),
  })

  // how read all notifs ?

  useHeaderButton({
    icon: 'FAS-check',
    onPress: () => console.log('read all'),
    side: 'headerRight',
  })

  const renderItem = ({
    item,
  }: ListRenderItemInfo<NotificationListItemProps>) => (
    <NotificationListItem
      {...item}
      onPress={() => {
        mutate({ id: item.id, is_read: true })
        if (item?.url) router.push(item.url)
      }}
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <VirtualizedList<NotificationListItemProps>
        data={notifications}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        isLoading={isLoading}
        onRefresh={refetch}
        refreshing={isRefetching}
        isLoadingNext={isLoadingNext}
        onEndReached={fetchNext}
      />
    </VStack>
  )
}
