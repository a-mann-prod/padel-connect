import { useQueryCache } from '@/services/api/queryCacheHooks'
import {
  UseInfiniteQueryProps,
  UseMutationProps,
} from '@/services/api/queryHooks'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { InvitationsResponse } from './entities'
import { answerInvitationFn, getInfiniteInvitationsFn } from './functions'
import { AnwserInvitationParams } from './params'

export const useInfiniteInvitations = ({
  options,
}: UseInfiniteQueryProps<InvitationsResponse> = {}) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['invitations', 'infinite'],
    queryFn: ({ pageParam }) => getInfiniteInvitationsFn(pageParam),
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialPageParam: 1,
  })

export const useAnswerInvitation = ({
  options,
}: UseMutationProps<void, AnwserInvitationParams> = {}) => {
  const querycache = useQueryCache()

  return useMutation({
    ...options,
    mutationFn: answerInvitationFn,
    onSuccess: (data, variables, context) => {
      querycache.removeItem(['invitations', 'infinite'], variables.id)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
