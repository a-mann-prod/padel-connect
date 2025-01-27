import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import { useAppState } from '@/hooks/useAppstate'
import { useMe } from '@/hooks/useMe'
import { useQueryCache } from '@/services/api/queryCacheHooks'
import { config } from '@/services/config'
import { ACCESS_TOKEN_KEY, storage } from '@/services/storage'
import { UseInfiniteQueryProps, UseQueryProps } from '../../../queryHooks'
import {
  MatchConversationMessageResponse,
  MatchConversationMessagesResponse,
  MatchConversationResponse,
} from './entities'
import {
  getInfiniteMatchConversationMessagesFn,
  getMatchConversationFn,
} from './functions'
import {
  GetInfiniteMatchConversationMessagesParams,
  GetMatchConversationParams,
  SendMatchMessage,
} from './params'

export const useMatchConversation = ({
  params,
  options,
}: UseQueryProps<MatchConversationResponse, GetMatchConversationParams>) => {
  const { id, ...restParams } = params

  return useQuery({
    ...options,
    queryKey: ['matches', id, 'conversation', restParams],
    queryFn: () => getMatchConversationFn(params),
  })
}

export const useInfiniteMatchConversationMessages = ({
  params,
  options,
}: UseInfiniteQueryProps<
  MatchConversationMessagesResponse,
  GetInfiniteMatchConversationMessagesParams
>) => {
  const { id } = params

  return useInfiniteQuery({
    ...options,
    queryKey: ['matches', id, 'conversation', 'messages'],
    queryFn: ({ pageParam }) =>
      getInfiniteMatchConversationMessagesFn(params, pageParam),
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialPageParam: 1,
  })
}

export const useMatchConversationMessagesWebSocket = (
  match: number,
  onMessageReceived?: (data: MatchConversationMessageResponse) => void
) => {
  const appstate = useAppState()
  const { data: me } = useMe()
  const { data: conversation } = useMatchConversation({ params: { id: match } })
  const socketRef = useRef<WebSocket | null>(null)
  const queryCache = useQueryCache()

  // const [optimisticIds, setOptimisticIds] = useState<string[]>([])

  useEffect(() => {
    const initializedWebSocket = async () => {
      if (socketRef.current) {
        socketRef.current.close()
      }

      if (!conversation) return

      const accessToken = await storage.getItem(ACCESS_TOKEN_KEY)
      if (!accessToken) return

      const socket = new WebSocket(
        `${config.wsUrl}/ws/chat/${conversation.id}/`,
        ['JWT', accessToken]
      )
      socketRef.current = socket

      socket.onopen = () => console.log('WebSocket connected')
      socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data) as MatchConversationMessageResponse

        if (data.user === me?.id) {
          // const optimisticid = optimisticIds[0]
          // replace
          // queryCache.updateItem(
          //   ['matches', match, 'conversation', 'messages'],
          //   data
          // )
        } else {
        }

        queryCache.addItem(['matches', match, 'conversation', 'messages'], data)

        onMessageReceived?.(data)
      }

      socket.onclose = () => console.log('WebSocket deconnected')
      socket.onerror = (error) => {
        console.log('WebSocket error', error)
        console.log(error)
      }

      return () => {
        socket.close()
        socketRef.current = null
      }
    }

    appstate === 'active' && initializedWebSocket()

    return () => {
      if (socketRef.current) {
        socketRef.current.close()
        socketRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation, match, onMessageReceived, appstate])

  return {
    send: (message: SendMatchMessage) => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        // const generatedId = uuid4()
        // const optimisicMessage: MatchConversationMessageResponse = {
        //   content: message.message,
        //   user: me?.id || -1,
        //   id: generatedId as unknown as number,
        //   created_at: date.now().toISOString(),
        //   updated_at: date.now().toISOString(),
        // }
        // setOptimisticIds((prev) => [...prev, generatedId])
        socketRef.current.send(JSON.stringify(message))
        // queryCache.addItem(
        //   ['matches', match, 'conversation', 'messages'],
        //   optimisicMessage,
        //   undefined,
        //   true
        // )
      }
    },
  }
}
