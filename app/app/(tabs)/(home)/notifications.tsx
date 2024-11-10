import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'

import { NotificationListItem, NotificationListItemProps } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { useHeaderButton } from '@/hooks/useHeaderButton'
import {
  NotificationsResponse,
  useInfiniteNotifications,
  useReadAllNotifications,
  useReadNotification,
  useUnreadNotificationsCount,
} from '@/services/api'

export default () => {
  const {
    data: notificationPages,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useInfiniteNotifications()

  const notifications = notificationPages?.pages.reduce<
    NotificationsResponse['results']
  >((prev, acc) => [...prev, ...acc.results], [])

  const { mutate: readAllNotifications } = useReadAllNotifications()

  const { mutate: readNotification } = useReadNotification()

  const { data: unreadNotificationsCount } = useUnreadNotificationsCount()

  useHeaderButton(
    [
      {
        icon: 'FAS-check',
        onPress: () => readAllNotifications(),
        condition: true,
        isDisabled: !unreadNotificationsCount,
      },
    ],
    'headerRight'
  )

  const renderItem = ({
    item,
  }: ListRenderItemInfo<NotificationListItemProps>) => (
    <NotificationListItem
      {...item}
      onPress={() => {
        const hasUnread = !item.is_read || !!item?.unread_ids?.length
        if (hasUnread) {
          // TODO: reflechir aux notifications imbriquées ?
          const ids = [item.id, ...(item?.unread_ids || [])]
          readNotification({ id: item.id })
        }
        if (item?.associated_data?.url) router.push(item.associated_data.url)
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
        isLoadingNext={isFetchingNextPage}
        onEndReached={() => hasNextPage && fetchNextPage()}
      />
    </VStack>
  )
}
