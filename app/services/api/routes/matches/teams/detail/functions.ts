import { MatchTeamRequestResponse } from './entities'
import {
  CreateMatchTeamParams,
  DeleteMatchTeamParams,
  GetMatchTeamRequestParams,
} from './params'

import api from '@/services/api/axiosConfig'

const ENDPOINT = '/matches'

export const getMatchTeamRequestFn = async ({
  id,
  ...params
}: GetMatchTeamRequestParams) => {
  const { data } = await api.get<MatchTeamRequestResponse>(
    `${ENDPOINT}/${id}/teams/request/`,
    {
      params: { ...params },
    }
  )

  return data
}

export const createMatchTeamFn = async ({
  matchId,
  ...params
}: CreateMatchTeamParams) => {
  const { data } = await api.post<MatchTeamRequestResponse>(
    `${ENDPOINT}/${matchId}/teams/`,
    params
  )

  return data
}

export const deleteMatchTeamFn = async ({
  id,
  matchId,
}: DeleteMatchTeamParams) => {
  const { data } = await api.delete<void>(`${ENDPOINT}/${matchId}/teams/${id}/`)

  return data
}
