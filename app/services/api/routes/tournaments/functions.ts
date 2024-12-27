import api from '../../axiosConfig'
import { TournamentsResponse } from './entities'
import { GetInfiniteTournamentsParams, GetTournamentParams } from './params'

export const getTournamentFn = async (params: GetTournamentParams) => {
  const { data } = await api.get(`/tournaments/${params.id}/`)
  return data
}

export const getInfiniteTournamentsFn = async (
  params: GetInfiniteTournamentsParams,
  pageParam: number
) => {
  const { data } = await api.get<TournamentsResponse>('/tournaments/', {
    params: {
      ...params,
      page: pageParam,
    },
  })

  return data
}
