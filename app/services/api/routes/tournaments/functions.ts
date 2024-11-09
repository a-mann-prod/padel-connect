import api from '../../axiosConfig'
import { TournamentsResponse } from './entities'
import { GetInfiniteTournamentsParams, GetTournamentParams } from './params'

import { date } from '@/services/date'

export const getTournamentFn = async (params: GetTournamentParams) => {
  const { data } = await api.get(`/tournaments/${params.id}/`)
  return data
}

const today = date.now().toISOString()

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

  // let paramsToQueryParams = params

  // if (month) {
  //   const month = date.dayjs(month)
  //   const [start, end] = [month.startOf('month'), month.endOf('month')]
  //   paramsToQueryParams = {
  //     ...paramsToQueryParams,
  //     'datetime', start
  //     'datetime', start
  //   }
  //   query = query.gte('datetime', start).lte('datetime', end)
  // }

  //   let query = supabase
  //   .from('tournaments')
  //   .select(getTournamentsQueryCols)
  //   .gte('datetime', today)
  //   .order('datetime', { ascending: true })

  return data
}
