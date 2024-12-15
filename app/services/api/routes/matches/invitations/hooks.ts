import { useInfiniteQuery, useMutation } from '@tanstack/react-query'

import { MatchInvitationsResponse } from './entities'
import {
  getInfiniteMatchInvitationsFn,
  manageMatchInvitationFn,
} from './functions'
import {
  GetInfiniteMatchInvitationsParams,
  ManageMatchInvitationParams,
} from './params'

import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useQueryCache } from '@/services/api/queryCacheHooks'
import {
  UseInfiniteQueryProps,
  UseMutationProps,
} from '@/services/api/queryHooks'
import { useTranslate } from '@/services/i18n'

export const useInfiniteMatchInvitations = ({
  params,
  options,
}: UseInfiniteQueryProps<
  MatchInvitationsResponse,
  GetInfiniteMatchInvitationsParams
>) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['matches', params.matchId, 'invitations', 'infinite', params],
    queryFn: ({ pageParam }) =>
      getInfiniteMatchInvitationsFn(params, pageParam),
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialPageParam: 1,
  })

export const useManageMatchInvitation = (
  { options }: UseMutationProps<void, ManageMatchInvitationParams> = {
    options: {},
  }
) => {
  const t = useTranslate()
  const onSuccess = useHandleSuccess()
  const onError = useHandleError()
  const queryCache = useQueryCache()

  return useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
      queryCache.removeItem(
        ['matches', variables.matchId, 'teams'],
        variables.id
      )
      onSuccess({
        title: t(
          variables.action === 'accept' ? 'requestAccepted' : 'requestRefused'
        ),
      })
    },
    onError,
    mutationFn: manageMatchInvitationFn,
  })
}
