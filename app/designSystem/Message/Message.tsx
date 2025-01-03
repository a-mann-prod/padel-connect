import { Box, Center, HStack, Text, VStack } from '@gluestack-ui/themed'
import { Dayjs } from 'dayjs'

import { Avatar } from '../Avatar/Avatar'

import { MatchConversationMessagesResponse } from '@/services/api/routes/matches'
import { DefaultProfileResponse } from '@/services/api/types'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { when } from '@/utils/when'

export type MessageProps = {
  content: string
  sender?: DefaultProfileResponse
  createdDate: Dayjs
  isMe: boolean

  // TODO A REVOIR
  prevMessage?: MatchConversationMessagesResponse['results'][number]
  nextMessage?: MatchConversationMessagesResponse['results'][number]
}
export const Message = ({
  content,
  sender,
  isMe,
  createdDate,
  prevMessage,
  nextMessage,
}: MessageProps) => {
  const t = useTranslate()

  const isSameUser = nextMessage?.user === sender?.id

  const isSameDay = isSameDayFn(createdDate, prevMessage, nextMessage)

  return (
    <VStack gap="$3">
      {!isSameDay && (
        <Center pt="$3">
          <Text>
            {createdDate.isSame(date.now(), 'day')
              ? t('today')
              : createdDate.format('LL')}
          </Text>
        </Center>
      )}

      <HStack
        mb={when(isSameUser, '-$2.5')}
        gap="$2"
        justifyContent={isMe ? 'flex-end' : 'flex-start'}
        alignItems="flex-end"
      >
        {!isMe && !isSameUser ? (
          <Avatar
            size="xs"
            imageUrl={sender?.avatar_url}
            firstname={sender?.first_name}
            lastname={sender?.last_name}
          />
        ) : (
          <Box w="$6" />
        )}

        <VStack
          rounded="$lg"
          bgColor={isMe ? '$primary100' : '$secondary100'}
          $dark-bgColor={isMe ? '$primary500' : '$secondary700'}
          p="$2"
          maxWidth="80%"
        >
          <Text variant="subtitle">{isMe ? t('me') : sender?.full_name}</Text>
          <Text>{content}</Text>
          <Text pt="$1" variant="subtitle" alignSelf="flex-end">
            {createdDate.format('HH:mm')}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  )
}

const isSameDayFn = (
  date: Dayjs,
  // TODO A REVOIR
  prevMessage?: any,
  nextMessage?: any
) => {
  // first message
  if (!prevMessage) {
    return false
  }

  return date.isSame(prevMessage?.created_at, 'day')
}
