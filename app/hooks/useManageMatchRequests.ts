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

// {
//   "match_id": 11,
//   "user_id": "5998705a-6cf5-4c42-9994-c242317d78c0",
//   "status": "REFUSED",
//   "created_at": "2024-04-22T13:38:42.953125+00:00",
//   "profiles": {
//       "id": "5998705a-6cf5-4c42-9994-c242317d78c0",
//       "last_name": "Stupaczuk",
//       "avatar_url": "a93f1a69-70c7-4b2b-a6b0-cdfd24e7b045.jpeg",
//       "first_name": "Franco",
//       "side_preference": "LEFT",
//       "manual_preference": "RIGHT_HANDED"
//   }
// }
