import { VStack } from '@gluestack-ui/themed'
import { Href, router } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'

import { NotificationListItem, NotificationListItemProps } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { useHeaderButton } from '@/hooks/useHeaderButton'
import { useMe } from '@/hooks/useMe'
import {
  NotificationsResponse,
  useInfiniteNotifications,
  useReadAllNotifications,
  useReadNotifications,
  useUnreadNotificationsCount,
} from '@/services/api'
import { NotificationType } from '@/services/api/types'
import { useEffect, useMemo } from 'react'

export default () => {
  const { data: me } = useMe()

  const {
    data: notificationPages,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useInfiniteNotifications()

  const notifications = useMemo(
    () =>
      notificationPages?.pages.reduce<NotificationsResponse['results']>(
        (prev, acc) => [...prev, ...acc.results],
        []
      ),
    [notificationPages?.pages]
  )

  const groupedNotifications = useMemo(
    () =>
      notifications?.reduce<
        (NotificationsResponse['results'][number] & {
          unread_ids: number[]
        })[]
      >((acc, curr) => {
        const lastGroup = acc[acc.length - 1]

        if (
          curr.type === NotificationType.NEW_MESSAGE &&
          curr.associated_data?.url
        ) {
          // Si la notification est de type NEW_MESSAGE et qu'elle peut être regroupée
          if (
            lastGroup &&
            lastGroup.type === NotificationType.NEW_MESSAGE &&
            lastGroup.associated_data.url === curr.associated_data.url
          ) {
            // Ajoutez l'ID au tableau unread_ids uniquement si la notification n'a pas été lue
            if (!curr.is_read) {
              lastGroup.unread_ids = [...lastGroup.unread_ids, curr.id]
            }
          } else {
            // Sinon, créez un nouveau groupe et ajoutez l'ID si elle n'a pas été lue
            acc.push({
              ...curr,
              unread_ids: curr.is_read ? [] : [curr.id],
            })
          }
        } else {
          // Pour les autres types de notifications, ajoutez-les directement
          acc.push({
            ...curr,
            unread_ids: curr.is_read ? [] : [curr.id],
          })
        }

        return acc
      }, []),
    [notifications]
  )

  // force refetching to get mini 10 items for the 1st fetch
  useEffect(() => {
    if ((groupedNotifications?.length || 0) < 10 && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, groupedNotifications, hasNextPage])

  const { mutate: readAllNotifications } = useReadAllNotifications()

  const { mutate: readNotifications } = useReadNotifications()

  const { data: unreadNotificationsCount } = useUnreadNotificationsCount({
    options: { enabled: !!me?.id },
  })

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
        const hasUnread = !!item.unread_ids.length
        if (hasUnread) {
          readNotifications({ ids: item.unread_ids })
        }
        if (item?.associated_data?.url)
          router.push(item.associated_data.url as Href)
      }}
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <VirtualizedList<NotificationListItemProps>
        data={groupedNotifications}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data?.length}
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
