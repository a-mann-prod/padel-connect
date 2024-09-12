import { date } from '@/services/date'
import { useHandleError } from './useHandleError'
import { useMe } from './useMe'

import {
  MatchResponse,
  useDeleteMatchRequest,
  useInsertMatchRequests,
  useMatch,
  useMatchRequest,
  useUpdateMatchRequest,
} from '@/services/api'

export const useManageMatch = (matchId: number) => {
  const onError = useHandleError()

  const { data: me } = useMe()

  const { data: match, isLoading: isLoadingMatch } = useMatch({
    params: { id: matchId },
    options: { enabled: !!matchId, staleTime: 0 },
  })

  const { data: matchRequest, isLoading: isLoadingMatchRequest } =
    useMatchRequest({
      params: { match_id: matchId, user_id: me?.id as string },
      options: { enabled: !!(matchId && me?.id), staleTime: 0 },
    })

  const { mutate: requestMatch, isPending: isRequestMatchPending } =
    useInsertMatchRequests({
      onError,
    })
  const { mutate: cancelRequestMatch, isPending: isCancelRequestMatchPending } =
    useDeleteMatchRequest({
      onError,
    })
  const { mutate: updateMatchRequest, isPending: isPayMatchPending } =
    useUpdateMatchRequest({ onError })

  return {
    match,
    isRequesting: matchRequest?.status === 'PENDING',
    isPlayer: matchRequest?.status === 'ACCEPTED' && !matchRequest?.is_owner,
    isOwner: !!matchRequest?.is_owner,
    isLoading: isLoadingMatchRequest || isLoadingMatch,
    requestMatch: () =>
      me?.id && requestMatch([{ match_id: matchId, user_id: me.id }]),
    cancelRequestMatch: () =>
      me?.id && cancelRequestMatch({ match_id: matchId, user_id: me.id }),
    payMatch: () =>
      me?.id &&
      updateMatchRequest({
        match_id: matchId,
        user_id: me.id,
        has_payed: true,
      }),
    isRequestMatchPending,
    isCancelRequestMatchPending,
    isPayMatchPending,
  }
}

export const getMatchTimes = (match: MatchResponse) => {
  const matchStartTime = date.dayjs(match.datetime)
  const matchEndTime = matchStartTime.add(match.duration, 'm')
  const isMatchPassed = matchEndTime.isBefore(date.now())

  return {
    matchStartTime,
    matchEndTime,
    isMatchPassed,
  }
}
