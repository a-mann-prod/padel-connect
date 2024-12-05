import { MatchTeamRequestResponse, MatchTeamsResponse } from './entities'
import {
  CreateMatchTeamParams,
  DeleteMatchTeamParams,
  GetInfiniteMatchTeamsParams,
  GetMatchTeamRequestParams,
  ManageMatchTeamParams,
} from './params'

import api from '@/services/api/axiosConfig'

const ENDPOINT = '/matches'

export const getInfiniteMatchTeamsFn = async (
  { id, ...params }: GetInfiniteMatchTeamsParams,
  pageParam: number
) => {
  const { data } = await api.get<MatchTeamsResponse>(
    `${ENDPOINT}/${id}/teams/`,
    {
      params: { ...params, page: pageParam },
    }
  )

  return data
}

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

export const manageMatchTeamFn = async ({
  matchId,
  id,
  action,
  ...params
}: ManageMatchTeamParams) => {
  const { data } = await api.post<void>(
    `${ENDPOINT}/${matchId}/teams/${id}/${action}/`,
    {
      params: { ...params },
    }
  )

  return data
}
