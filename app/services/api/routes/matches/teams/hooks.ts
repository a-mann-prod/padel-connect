import { useInfiniteQuery } from '@tanstack/react-query'

import { UseInfiniteQueryProps } from '../../../queryHooks'
import { MatchTeamsResponse } from './entities'
import { getInfiniteMatchTeamsFn } from './functions'
import { GetInfiniteMatchTeamsParams } from './params'

export const useInfiniteMatchTeams = ({
  params,
  options,
}: UseInfiniteQueryProps<MatchTeamsResponse, GetInfiniteMatchTeamsParams>) => {
  const { id } = params

  return useInfiniteQuery({
    ...options,
    queryKey: ['matches', id, 'teams'],
    queryFn: ({ pageParam }) => getInfiniteMatchTeamsFn(params, pageParam),
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialPageParam: 1,
  })
}
