import { MatchInvitationsResponse } from './entities'
import {
  GetInfiniteMatchInvitationsParams,
  ManageMatchInvitationParams,
} from './params'

import api from '@/services/api/axiosConfig'

const ENDPOINT = '/matches'

export const manageMatchInvitationFn = async ({
  matchId,
  id,
  action,
  ...params
}: ManageMatchInvitationParams) => {
  const { data } = await api.post<void>(
    `${ENDPOINT}/${matchId}/invitations/${id}/${action}/`,
    {
      params: { ...params },
    }
  )

  return data
}

export const getInfiniteMatchInvitationsFn = async (
  { matchId, ...params }: GetInfiniteMatchInvitationsParams,
  pageParam: number
) => {
  const { data } = await api.get<MatchInvitationsResponse>(
    `${ENDPOINT}/${matchId}/invitations/received/`,
    {
      params: { ...params, page: pageParam },
    }
  )

  return data
}
