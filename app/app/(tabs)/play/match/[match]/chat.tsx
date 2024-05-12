import { Box, VStack } from '@gluestack-ui/themed'
import { useUpsertItem } from '@supabase-cache-helpers/postgrest-react-query'
import { useLocalSearchParams } from 'expo-router'
import { ListRenderItemInfo } from 'react-native'
import { uniq } from 'remeda'

import { KeyboardAvoidingView } from '@/components'
import { Message, MessageInput, VirtualizedList } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { useProfilesWithAvatar } from '@/hooks/useProfilesWithAvatar'
import {
  MessageResponse,
  useInfiniteMessages,
  useInsertMessages,
  useMessagesSubscription,
} from '@/services/api'
import { date } from '@/services/date'

export default () => {
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
    isLoading,
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
      )
    : []

  const { data: profiles } = useProfilesWithAvatar({
    params: { ids: userIds },
    options: { enabled: !!userIds.length },
  })

  useMessagesSubscription({
    options: {
      callback: async (e) => {
        if (e.eventType === 'INSERT') {
          const newMessage = e.new
          if (newMessage.sender_id !== me?.id) {
            console.log('upserting')
            upsert(newMessage)
          }
        }
      },
    },
  })

  const { mutate: addMessage } = useInsertMessages()

  if (!messages) return

  const renderItem = ({
    item: { id, content, sender_id, created_at },
    index,
  }: ListRenderItemInfo<MessageResponse>) => {
    const sender = profiles?.find(({ id }) => id === sender_id)

    return (
      <Message
        key={id}
        content={content}
        isMe={sender?.id === me?.id}
        sender={sender}
        createdDate={date.dayjs(created_at)}
        isFetchingOldMessages={isLoadingNext}
        prevMessage={messages[index - 1]}
        nextMessage={messages[index + 1]}
        isLast={index === messages.length - 1}
      />
    )
  }

  return (
    <KeyboardAvoidingView>
      <VStack px="$3" pb="$3" gap="$3" flex={1}>
        <VirtualizedList<MessageResponse>
          data={messages}
          getItem={(data, index) => data[index]}
          getItemCount={(data) => data.length}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          isLoading={!messages.length && isLoading}
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
  )
}
