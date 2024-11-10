import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

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
  const { data: conversation } = useMatchConversation({ params: { id: match } })
  const socketRef = useRef<WebSocket | null>(null)
  const queryClient = useQueryClient()

  useEffect(() => {
    const initializedWebSocket = async () => {
      if (!conversation) return

      const accessToken = await storage.getItem(ACCESS_TOKEN_KEY)
      if (!accessToken) return

      const socket = new WebSocket(
        `ws://localhost:8000/ws/chat/${conversation.id}/`,
        ['JWT', accessToken]
      )
      socketRef.current = socket

      socket.onopen = () => console.log('WebSocket connected')
      socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data) as MatchConversationMessageResponse

        queryClient.setQueryData(
          ['matches', match, 'conversation', 'messages'],
          (
            oldData: InfiniteData<MatchConversationMessagesResponse, number>
          ) => {
            if (!oldData) return

            const newData = {
              ...oldData,
              pages: oldData.pages.map((page, index) => {
                if (index === oldData.pages.length - 1) {
                  return {
                    ...page,
                    results: [data, ...page.results],
                  }
                }
                return page
              }),
            }

            return newData
          }
        )
        onMessageReceived?.(data)
      }

      socket.onclose = () => console.log('WebSocket deconnected')
      socket.onerror = (error) => console.log('WebSocket error', error)

      return () => {
        socket.close()
        socketRef.current = null
      }
    }

    initializedWebSocket()
  }, [conversation, match, onMessageReceived, queryClient])

  return {
    send: (message: SendMatchMessage) => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.send(JSON.stringify(message))
      }
    },
  }
}
