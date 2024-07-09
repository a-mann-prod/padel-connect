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

  const empiledNotifications = notifications?.reduce<
    Omit<NotificationListItemProps, 'onPress'>[]
  >((acc, curr) => {
    if (curr.type !== 'NEW_MESSAGE') {
      acc.push(curr)
      return acc
    }

    const prevItem = acc[acc.length - 1]

    if (
      !prevItem ||
      prevItem.type !== 'NEW_MESSAGE' ||
      prevItem.url !== curr.url
    ) {
      acc.push(curr)
    } else {
      if (!curr.is_read) {
        if (!prevItem.unread_ids) {
          prevItem.unread_ids = []
        }
        prevItem.unread_ids.push(curr.id)
      }
    }

    return acc
  }, [])

  const invalidatePotsgrestQuery = useInvalidatePostgrestQuery()

  const readAllNotifications = async () => {
    await supabase.rpc('mark_all_notifications_as_read')
    invalidatePotsgrestQuery('notifications')
  }

  const { count: unreadNotificationsCount } = useUnreadNotifications({
    params: { user_id: me?.id as string },
  })

  useHeaderButton(
    [
      {
        icon: 'FAS-check',
        onPress: readAllNotifications,
        disabled: !unreadNotificationsCount,
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
          const ids = [item.id, ...(item?.unread_ids || [])]
          supabase
            .rpc('mark_notifications_as_read', {
              ids,
            })
            .then(() => invalidatePotsgrestQuery('notifications'))
        }
        if (item?.url) router.push(item.url)
      }}
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <VirtualizedList<NotificationListItemProps>
        data={empiledNotifications}
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
