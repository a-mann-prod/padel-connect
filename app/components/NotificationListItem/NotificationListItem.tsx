import { HStack, Text, VStack } from '@gluestack-ui/themed'

import { Icon, Pressable, PressableProps } from '@/designSystem'
import { FontAwesomeProps } from '@/designSystem/Icon/FontAwesome/FontAwesome'
import { NotificationResponse } from '@/services/api'
import { date } from '@/services/date'

export type NotificationType = 'MESSAGE' | 'OTHER'

export type NotificationListItemProps = NotificationResponse & {
  onPress: PressableProps['onPress']
}

const mapTypeToIcon: Record<
  NotificationResponse['type'],
  FontAwesomeProps['name']
> = {
  NEW_MESSAGE: 'FAS-envelope',
  NEW_MATCHES: 'FAS-baseball',
  NEW_MATCH_REQUEST: 'FAS-circle-question',
  MATCH_REQUEST_RESPONSE_ACCEPTED: 'FAS-circle-check',
  MATCH_REQUEST_RESPONSE_REFUSED: 'FAS-circle-xmark',
}

export const NotificationListItem = ({
  title,
  subtitle,
  onPress,
  created_at,
  is_read,
  type,
}: NotificationListItemProps) => {
  const unreadStyle = !is_read
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
            <Text flex={1} {...unreadStyle}>
              {title}
            </Text>
            <Text
              py="$0.5"
              numberOfLines={1}
              variant="subtitle"
              {...unreadStyle}
            >
              {subtitle}
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
