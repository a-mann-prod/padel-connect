import { MatchFiltersResponse } from './entities'
import { UpdateMatchFiltersParams } from './params'

import api from '@/services/api/axiosConfig'

const ENDPOINT = '/me/match_filter'

export const getMatchFiltersFn = async (): Promise<MatchFiltersResponse> => {
  const { data } = await api.get(`${ENDPOINT}/`)

  return data
}

export const updateMatchFilters = async (params: UpdateMatchFiltersParams) => {
  const { data } = await api.patch(`${ENDPOINT}/`, params)

  return data
}
