import { Badge, HStack, Text, VStack } from '@gluestack-ui/themed'

import { Icon, Pressable, PressableProps } from '@/designSystem'
import { FontAwesomeProps } from '@/designSystem/Icon/FontAwesome/FontAwesome'
import { NotificationResponse, NotificationsResponse } from '@/services/api'
import { date } from '@/services/date'

export type NotificationListItemProps =
  NotificationsResponse['results'][number] & {
    onPress: PressableProps['onPress']
    unread_ids: number[]
  }

const mapTypeToIcon: Record<
  NotificationResponse['type'],
  FontAwesomeProps['name']
> = {
  NEW_MESSAGE: 'FAS-envelope',
  NEW_MATCH: 'FAS-baseball',
  NEW_MATCH_INVITATION: 'FAS-envelope',
  MATCH_REQUEST_RESPONSE_ACCEPTED: 'FAS-circle-check',
  MATCH_REQUEST_RESPONSE_REFUSED: 'FAS-circle-xmark',
  INVITATION_RESPONSE: 'FAS-envelope-open-text',
  NEW_PLAYERS: 'FAS-users',
  MATCH_SHARE: 'FAS-share',
}

export const NotificationListItem = ({
  title,
  message,
  onPress,
  created_at,
  type,
  unread_ids = [],
}: NotificationListItemProps) => {
  const unreadCount = unread_ids.length

  const unreadStyle = unreadCount
    ? {
        fontWeight: '$semibold',
      }
    : { opacity: 0.7 }

  return (
    <Pressable onPress={onPress}>
      <HStack gap="$5" variant="colored" rounded="$lg" p="$3">
        <HStack flex={1} gap="$3">
          <Icon name={mapTypeToIcon[type]} color="$primary500" size="xl" />
          <VStack flex={1}>
            <HStack flex={1}>
              <Text flex={1} {...unreadStyle} numberOfLines={1}>
                {title}
              </Text>
              {unreadCount > 1 && (
                <Badge rounded="$full" bgColor="$primary500">
                  <Text size="sm" color="$white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Text>
                </Badge>
              )}
            </HStack>
            <Text
              py="$0.5"
              numberOfLines={1}
              variant="subtitle"
              {...unreadStyle}
            >
              {message}
            </Text>
            <Text
              alignSelf="flex-end"
              numberOfLines={1}
              variant="subtitle"
              {...unreadStyle}
            >
              {date.fromNow(created_at)}
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Pressable>
  )
}
