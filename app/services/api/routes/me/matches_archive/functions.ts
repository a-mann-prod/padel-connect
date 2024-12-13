import { MatchesArchiveResponse } from './entities'
import { GetInfiniteMatchesArchiveParams } from './params'

import api from '@/services/api/axiosConfig'

const ENDPOINT = '/me/matches-archive/'

export const getInfiniteMatchesArchiveFn = async (
  params: GetInfiniteMatchesArchiveParams,
  pageParam: number
) => {
  const { data } = await api.get<MatchesArchiveResponse>(`${ENDPOINT}`, {
    params: { ...params, page: pageParam },
  })

  return data
}
