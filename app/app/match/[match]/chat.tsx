import { Box, SafeAreaView, VStack } from '@gluestack-ui/themed'
import { useUpsertItem } from '@supabase-cache-helpers/postgrest-react-query'
import * as Notifications from 'expo-notifications'
import { useLocalSearchParams, usePathname } from 'expo-router'
import { useEffect, useState } from 'react'
import { ListRenderItemInfo } from 'react-native'
import { uniq } from 'remeda'

import { KeyboardAvoidingView, WithMatch } from '@/components'
import { Message, MessageInput, VirtualizedList } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import {
  ProfilesWithAvatar,
  useProfilesWithAvatar,
} from '@/hooks/useProfilesWithAvatar'
import {
  MessageResponse,
  useInfiniteMessages,
  useInsertMessages,
  useMessagesSubscription,
} from '@/services/api'
import { date } from '@/services/date'

export default WithMatch(() => {
  // that's workin, but better to set it globaly ?
  const pathName = usePathname()
  Notifications.setNotificationHandler({
    handleNotification: async (notification: Notifications.Notification) => {
      let shouldShowAlert = true
      const notifData = notification?.request.content.data

      // if notification is same location as current location
      // do not display notification alert
      if (notifData?.url === pathName) {
        shouldShowAlert = false
      }

      return {
        shouldShowAlert,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }
    },
  })

  const local = useLocalSearchParams()
  const matchId = Number(local?.match)
  const upsert = useUpsertItem({
    schema: 'public',
    table: 'messages',
    primaryKeys: ['id'],
  })

  const { data: me } = useMe()

  const {
    data: messages,
    fetchNext,
    isLoading: isLoadingMessages,
    isLoadingNext,
  } = useInfiniteMessages({
    params: { match_id: matchId },
    options: { enabled: !!matchId },
  })

  const userIds = messages?.length
    ? uniq(
        messages.reduce<string[]>((acc, curr) => {
          if (!curr.sender_id) return acc
          return [...acc, curr.sender_id]
        }, [])
      ).sort()
    : []

  const { data: profiles, isLoading: isLoadingProfiles } =
    useProfilesWithAvatar({
      params: { ids: userIds },
      options: { enabled: !!userIds.length },
    })

  // needed to avoid global isLoading when fetching messages with a new user
  const [senders, setSenders] = useState<ProfilesWithAvatar>([])
  useEffect(() => {
    if (profiles?.length) setSenders(profiles)
  }, [profiles])

  const isLoading = isLoadingMessages || (isLoadingProfiles && !senders?.length)

  useMessagesSubscription({
    options: {
      callback: async (e) => {
        // if user is not in the screen
        if (e.eventType === 'INSERT') {
          const newMessage = e.new
          if (newMessage.sender_id !== me?.id) {
            upsert(newMessage)
          }
        }
      },
    },
  })

  const { mutate: addMessage } = useInsertMessages()

  const renderItem = ({
    item: { id, content, sender_id, created_at },
    index,
  }: ListRenderItemInfo<MessageResponse>) => {
    const sender = senders.find(({ id }) => id === sender_id)

    return (
      <Message
        key={id}
        content={content}
        isMe={sender?.id === me?.id}
        sender={sender}
        createdDate={date.dayjs(created_at)}
        prevMessage={messages?.[index + 1]} // because list is reversed
        nextMessage={messages?.[index - 1]} // because list is reversed
        isLast={index === 0} // because list is reversed
      />
    )
  }

  return (
    <SafeAreaView flex={1}>
      <KeyboardAvoidingView>
        <VStack px="$3" pb="$3" gap="$3" flex={1}>
          <VirtualizedList<MessageResponse>
            data={messages}
            getItem={(data, index) => data[index]}
            getItemCount={(data) => data.length}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            isLoading={isLoading}
            isLoadingNext={isLoadingNext}
            onEndReached={fetchNext}
            inverted
          />
          <Box>
            <MessageInput
              onPress={(content) => {
                addMessage([
                  { content, sender_id: me?.id as string, match_id: matchId },
                ])
              }}
            />
          </Box>
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
})
