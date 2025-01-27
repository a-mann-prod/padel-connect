import { MatchTeamRequestResponse } from '../detail'
import {
  CreateMatchTeamInvitationParams,
  DeleteMatchTeamInvitationParams,
} from './params'

import api from '@/services/api/axiosConfig'

const ENDPOINT = '/matches'

export const deleteMatchTeamInvitationFn = async ({
  matchId,
  teamId,
  id,
  ...params
}: DeleteMatchTeamInvitationParams) => {
  const { data } = await api.delete<void>(
    `${ENDPOINT}/${matchId}/teams/${teamId}/invitations/${id}/`,
    {
      params,
    }
  )

  return data
}

export const createMatchTeamInvitationFn = async ({
  matchId,
  teamId,
  ...params
}: CreateMatchTeamInvitationParams) => {
  const { data } = await api.post<MatchTeamRequestResponse>(
    `${ENDPOINT}/${matchId}/teams/${teamId}/invitations/`,
    params
  )

  return data
}
