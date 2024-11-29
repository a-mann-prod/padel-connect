import api from '../../../axiosConfig'

import { MatchTeamsResponse } from './entities'
import { GetInfiniteMatchTeamsParams } from './params'

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
