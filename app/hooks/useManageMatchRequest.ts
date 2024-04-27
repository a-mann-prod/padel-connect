import { useHandleError } from './useHandleError'
import { useMe } from './useMe'

import { useInsertMatchRequests, useMatchRequest } from '@/services/api'

export const useManageMatchRequest = (matchId: number, enabled: boolean) => {
  const onError = useHandleError()

  const { data: me } = useMe()

  const { data: matchRequest, isLoading } = useMatchRequest({
    params: { match_id: matchId, user_id: me?.id as string },
    options: { enabled: !!(matchId && me?.id) && enabled },
  })

  const { mutate: requestMatch, isPending: isRequestMatchLoading } =
    useInsertMatchRequests({
      onError,
    })

  return {
    isRequesting: matchRequest?.status === 'PENDING',
    isPlayer: matchRequest?.status === 'ACCEPTED',
    isLoading,
    requestMatch: () =>
      me?.id && requestMatch([{ match_id: matchId, user_id: me?.id }]),
    isRequestMatchLoading,
  }
}
