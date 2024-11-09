import { MatchFiltersResponse } from './entities'
import { UpdateMatchFiltersParams } from './params'

import api from '@/services/api/axiosConfig'

export const getMatchFiltersFn = async (): Promise<MatchFiltersResponse> => {
  const { data } = await api.get('/me/match_filters/')

  return data
}

export const updateMatchFilters = async (params: UpdateMatchFiltersParams) => {
  const { data } = await api.patch('/me/match_filters/', params)

  return data
}
