import api from '../../../axiosConfig'
import { MatchesResponse, MatchResponse } from './entities'
import {
  CreateMatchParams,
  DeleteMatchParams,
  GetInfiniteMatchesParams,
  GetMatchParams,
  UpdateMatchParams,
} from './params'

const ENDPOINT = '/matches'

export const getMatchFn = async (params: GetMatchParams) => {
  const { data } = await api.get<MatchResponse>(`${ENDPOINT}/${params.id}/`)

  return data
}

export const getInfiniteMatchesFn = async (
  params: GetInfiniteMatchesParams,
  pageParam: number
) => {
  const { data } = await api.get<MatchesResponse>(`${ENDPOINT}/`, {
    params: { ...params, page: pageParam },
  })

  return data
}

export const createMatchFn = async (params: CreateMatchParams) => {
  const { data } = await api.post<MatchResponse>(`${ENDPOINT}/`, params)

  return data
}

export const updateMatchFn = async (params: UpdateMatchParams) => {
  const { data } = await api.patch<MatchResponse>(
    `${ENDPOINT}/${params.id}/`,
    params
  )

  return data
}

export const deleteMatchFn = async (params: DeleteMatchParams) => {
  const { data } = await api.delete<MatchResponse>(`${ENDPOINT}/${params.id}/`)

  return data
}
