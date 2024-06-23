import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'

import { NotificationListItem, NotificationListItemProps } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { useHeaderButton } from '@/hooks/useHeaderButton'
import { useInvalidatePostgrestQuery } from '@/hooks/useInvalidateQuery'
import { useMe } from '@/hooks/useMe'
import {
  useInfiniteAllNotifications,
  useUnreadNotifications,
  useUpdateNotification,
} from '@/services/api'
import { supabase } from '@/services/supabase'

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

  const { mutate } = useUpdateNotification()

  const invalidatePotsgrestQuery = useInvalidatePostgrestQuery()

  const readAllNotifications = async () => {
    await supabase.rpc('mark_all_notifications_as_read')
    invalidatePotsgrestQuery('notifications')
  }

  const { count: unreadNotificationsCount } = useUnreadNotifications({
    params: { user_id: me?.id as string },
  })

  useHeaderButton({
    icon: 'FAS-check',
    onPress: readAllNotifications,
    side: 'headerRight',
    disabled: !unreadNotificationsCount,
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
