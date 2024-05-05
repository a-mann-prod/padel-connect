import { useHandleError } from './useHandleError'
import { useInvalidatePostgrestQuery } from './useInvalidateQuery'

import { getMatchQueryCols, useUpdateMatchRequest } from '@/services/api'

export const useManageMatchRequests = (matchId: number) => {
  const invalidatePotsgrestQuery = useInvalidatePostgrestQuery()
  const onError = useHandleError()

  const { mutate: updateMatchRequest, isPending } = useUpdateMatchRequest({
    onError,
    onSuccess: (_, vars) => {
      invalidatePotsgrestQuery('matches', getMatchQueryCols, {
        id: `eq.${vars.match_id}`,
        'match_requests.status': 'eq.ACCEPTED',
      })
    },
  })

  return {
    isLoading: isPending,
    accept: (userId: string) =>
      updateMatchRequest({
        match_id: matchId,
        user_id: userId,
        status: 'ACCEPTED',
      }),

    refuse: (userId: string) =>
      updateMatchRequest({
        match_id: matchId,
        user_id: userId,
        status: 'REFUSED',
      }),
  }
}
