import { Box, SafeAreaView, VStack } from '@gluestack-ui/themed'
import * as Notifications from 'expo-notifications'
import { useLocalSearchParams, usePathname } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'
import { uniq } from 'remeda'

import { KeyboardAvoidingView, WithMatch } from '@/components'
import { Message, MessageInput, VirtualizedList } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { useProfiles } from '@/services/api'
import {
  MatchConversationMessagesResponse,
  useInfiniteMatchConversationMessages,
  useMatchConversationMessagesWebSocket,
} from '@/services/api/routes/matches'
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

  const { data: me } = useMe()

  const {
    data: messagesPages,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isLoadingMessages,
    hasNextPage,
  } = useInfiniteMatchConversationMessages({
    params: { id: matchId },
    options: { enabled: !!matchId },
  })

  const messages = messagesPages?.pages?.reduce<
    MatchConversationMessagesResponse['results']
  >((acc, curr) => [...acc, ...curr.results], [])

  const userIds = messages?.length
    ? uniq(
        messages.reduce<number[]>((acc, curr) => {
          if (!curr.user) return acc
          return [...acc, curr.user]
        }, [])
      ).sort()
    : []

  const { data: profiles, isLoading: isLoadingProfiles } = useProfiles({
    params: { ids: userIds },
    options: { enabled: !!userIds.length },
  })

  const isLoading = isLoadingMessages || isLoadingProfiles

  const { send } = useMatchConversationMessagesWebSocket(matchId)

  const renderItem = ({
    item: { id, content, user, created_at },
    index,
  }: ListRenderItemInfo<
    MatchConversationMessagesResponse['results'][number]
  >) => {
    const sender = profiles?.results.find(({ id }) => id === user)

    return (
      <Message
        key={id}
        content={content}
        isMe={user === me?.id}
        sender={sender}
        createdDate={date.dayjs(created_at)}
        prevMessage={messages?.[index + 1]}
        nextMessage={messages?.[index - 1]}
      />
    )
  }

  return (
    <SafeAreaView flex={1}>
      <KeyboardAvoidingView inModal>
        <VStack px="$3" pb="$3" gap="$3" flex={1}>
          <VirtualizedList<MatchConversationMessagesResponse['results'][number]>
            data={messages}
            getItem={(data, index) => data[index]}
            getItemCount={(data) => data.length}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            isLoading={isLoading}
            isLoadingNext={isFetchingNextPage}
            onEndReached={() => hasNextPage && fetchNextPage()}
            inverted
          />
          <Box>
            <MessageInput
              onPress={(content) => {
                send({ message: content })
              }}
            />
          </Box>
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
})
