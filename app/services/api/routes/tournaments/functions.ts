import api from '../../axiosConfig'
import { TournamentResponse, TournamentsResponse } from './entities'
import { GetTournamentParams, GetTournamentsParams } from './params'

export const getTournamentFn = async (params: GetTournamentParams) => {
  const { data } = await api.get<TournamentResponse>(
    `/tournaments/${params.id}/`
  )
  return data
}

export const getTournamentsFn = async (params: GetTournamentsParams) => {
  const { data } = await api.get<TournamentsResponse>(`/tournaments/`, {
    params,
  })
  return data
}
