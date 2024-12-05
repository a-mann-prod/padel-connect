import {
  DeleteMatchTeamInvitationParams,
  ManageMatchTeamInvitationParams,
} from './params'

import api from '@/services/api/axiosConfig'

const ENDPOINT = '/matches'

export const manageMatchTeamInvitationFn = async ({
  matchId,
  teamId,
  id,
  action,
  ...params
}: ManageMatchTeamInvitationParams) => {
  const { data } = await api.post<void>(
    `${ENDPOINT}/${matchId}/teams/${teamId}/invitations/${id}/${action}/`,
    {
      params: { ...params },
    }
  )

  return data
}

export const deleteMatchTeamInvitationFn = async ({
  matchId,
  teamId,
  id,
  ...params
}: DeleteMatchTeamInvitationParams) => {
  const { data } = await api.delete<void>(
    `${ENDPOINT}/${matchId}/teams/${teamId}/invitations/${id}/`,
    {
      params: { ...params },
    }
  )

  return data
}
