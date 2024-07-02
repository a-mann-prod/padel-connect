import {
  useInsertMutation,
  useQuery,
  useSubscription,
} from '@supabase-cache-helpers/postgrest-react-query'

import { supabase } from '@/services/supabase'
import { useInfiniteQuery } from '../../queryHooks'
import {
  UseInfiniteQueryProps,
  UseMutationProps,
  UseQueryProps,
  UseSubscriptionProps,
} from '../../queryHooks/types'
import { MessageResponse, MessagesResponse } from './entities'
import { getMessageFn, getMessagesFn, setMessagesFn } from './functions'
import {
  GetMessageParams,
  GetMessagesParams,
  InsertMessagesParams,
} from './params'

export const useMessagesSubscription = ({ options }: UseSubscriptionProps) =>
  useSubscription(
    supabase,
    'messages',
    {
      event: '*',
      table: 'messages',
      schema: 'public',
    },
    ['id'],
    options
  )

export const useMessages = ({
  params,
  options,
}: UseQueryProps<MessagesResponse, GetMessagesParams>) =>
  useQuery<MessagesResponse>(getMessagesFn(params), options)

export const useMessage = ({
  params,
  options,
}: UseQueryProps<MessagesResponse, GetMessageParams>) => {
  const { data, ...rest } = useQuery<MessagesResponse>(
    getMessageFn(params),
    options
  )

  return { data: data?.[0], ...rest }
}

export const useInfiniteMessages = ({
  params,
  options,
}: UseInfiniteQueryProps<MessageResponse, GetMessagesParams>) =>
  useInfiniteQuery<MessageResponse>(getMessagesFn(params), options)

export const useInsertMessages = (
  options?: UseMutationProps<
    any,
    InsertMessagesParams | InsertMessagesParams[],
    any
  >
) => useInsertMutation(setMessagesFn(), ['id'], undefined, options)
