import { Box, Center, HStack, Text, VStack } from '@gluestack-ui/themed'
import { Dayjs } from 'dayjs'

import { Avatar } from '../Avatar/Avatar'
import { Loader } from '../Loader/Loader'

import { ProfileWithAvatar } from '@/hooks/useProfileWithAvatar'
import { MessageResponse } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { getUsername } from '@/utils/user'
import { when } from '@/utils/when'

export type MessageProps = {
  content: string
  sender?: ProfileWithAvatar
  createdDate: Dayjs
  isMe: boolean
  isLast: boolean
  isFetchingOldMessages?: boolean

  prevMessage?: MessageResponse
  nextMessage?: MessageResponse
}
export const Message = ({
  content,
  sender,
  isMe,
  isLast = false,
  createdDate,
  isFetchingOldMessages = false,

  prevMessage,
  nextMessage,
}: MessageProps) => {
  const t = useTranslate()

  const isSameUser = prevMessage?.sender_id === sender?.id

  // const isSameDay = prevMessage
  //   ? createdDate.isSame(prevMessage?.created_at, 'day')
  //   : createdDate.isSame(nextMessage?.created_at, 'day')

  const isSameDay = isSameDayFn(createdDate, prevMessage, nextMessage)

  return (
    <VStack gap="$3">
      {isLast && isFetchingOldMessages && <Loader />}
      {!isSameDay && (
        <Center>
          <Text>
            {createdDate.isSame(date.now(), 'day')
              ? t('today')
              : createdDate.format('LL')}
          </Text>
        </Center>
      )}

      <HStack
        mt={when(isSameUser, '-$2.5')}
        gap="$2"
        justifyContent={isMe ? 'flex-end' : 'flex-start'}
        alignItems="flex-end"
      >
        {!isMe && !isSameUser ? (
          <Avatar size="xs" imageUrl={sender?.avatar} />
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
          <Text variant="subtitle">
            {isMe
              ? t('me')
              : getUsername(sender?.first_name, sender?.last_name)}
          </Text>
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
  prevMessage?: MessageResponse,
  nextMessage?: MessageResponse
) => {
  // first message
  if (!prevMessage) {
    return false
  }

  return date.isSame(prevMessage?.created_at, 'day')
}
