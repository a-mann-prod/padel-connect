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
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { useQueryCache } from '@/services/api/queryCacheHooks'
import {
  UseInfiniteQueryProps,
  UseMutationProps,
} from '@/services/api/queryHooks'
import { useFindMatchQueryKey } from '@/services/api/utills'
import { useTranslate } from '@/services/i18n'
import { MatchResponse } from '../detail'

export const useInfiniteMatchInvitations = ({
  params,
  options,
}: UseInfiniteQueryProps<
  MatchInvitationsResponse,
  GetInfiniteMatchInvitationsParams
>) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['matches', params.matchId, 'invitations', 'infinite'],
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
  const invalidateQuery = useInvalidateQuery()
  const findMatchQK = useFindMatchQueryKey()

  return useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
      queryCache.removeItem(
        ['matches', variables.matchId, 'invitations', 'infinite'],
        variables.id
      )
      queryCache.removeItem(
        ['matches', 'invitations', 'infinite'],
        variables.matchId
      )

      if (variables.action === 'accept') {
        // update matchRequest
        invalidateQuery(['matches', variables.matchId, 'teams', 'request'])

        // update current match
        invalidateQuery(['matches', variables.matchId])

        // update match listing
        const match = queryCache.getItem<MatchResponse>([
          'matches',
          variables.matchId,
        ])

        if (match) {
          const matchQueryKey = findMatchQK(match.datetime)
          matchQueryKey && invalidateQuery(matchQueryKey)
        }
      }

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
