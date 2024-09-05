import { useHandleError } from './useHandleError'
import { useMe } from './useMe'

import {
  useDeleteMatchRequest,
  useInsertMatchRequests,
  useMatchRequest,
  useUpdateMatchRequest,
} from '@/services/api'

export const useManageMatchRequest = (matchId: number) => {
  const onError = useHandleError()

  const { data: me } = useMe()

  const {
    data: matchRequest,
    isLoading,
    refetch,
    isRefetching,
  } = useMatchRequest({
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

  const { mutate: updateMatchRequest } = useUpdateMatchRequest({ onError })

  return {
    isRequesting: matchRequest?.status === 'PENDING',
    isPlayer: matchRequest?.status === 'ACCEPTED' && !matchRequest?.is_owner,
    isOwner: matchRequest?.is_owner,
    isLoading,
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
    refetch,
    isRefetching,
  }
}
