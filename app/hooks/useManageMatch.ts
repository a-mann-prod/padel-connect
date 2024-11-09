import { date } from '@/services/date'
import { useMe } from './useMe'

import { MatchResponse, useMatch } from '@/services/api'

export const useManageMatch = (matchId: number) => {
  const { data: me } = useMe()

  const {
    data: match,
    isLoading: isLoadingMatch,
    ...rest
  } = useMatch({
    params: { id: matchId },
    options: { enabled: !!matchId },
  })

  // TODO A REVOIR
  // const { data: matchRequest, isLoading: isLoadingMatchRequest } =
  //   useMatchRequest({
  //     params: { match_id: matchId, user_id: me?.id as string },
  //     options: { enabled: !!(matchId && me?.id), staleTime: 0 },
  //   })

  // const { mutate: requestMatch, isPending: isRequestMatchPending } =
  //   useInsertMatchRequests({
  //     onError,
  //   })
  // const { mutate: cancelRequestMatch, isPending: isCancelRequestMatchPending } =
  //   useDeleteMatchRequest({
  //     onError,
  //   })
  // const { mutate: updateMatchRequest, isPending: isPayMatchPending } =
  //   useUpdateMatchRequest({ onError })

  const matchRequest = {} as any
  const isLoadingMatchRequest = false
  const isRequestMatchPending = false
  const isCancelRequestMatchPending = false
  const isPayMatchPending = false

  const requestMatch = (data: any) => {}
  const cancelRequestMatch = (data: any) => {}
  const updateMatchRequest = (data: any) => {}

  return {
    match,
    isRequesting: matchRequest?.status === 'PENDING',
    isPlayer: matchRequest?.status === 'ACCEPTED' && !matchRequest?.is_owner,
    isOwner: match?.user === me?.id,
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
    ...rest,
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

export const isMatchReserved = (match: MatchResponse) => true
// TODO A REVOIR
// !!match?.match_requests?.some(
//   ({ is_owner, has_payed }) => is_owner && has_payed
// )
