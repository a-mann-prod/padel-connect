import { UseInfiniteQueryProps } from '@/services/api/queryHooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { MatchesArchiveResponse } from './entities'
import { getInfiniteMatchesArchiveFn } from './functions'
import { GetInfiniteMatchesArchiveParams } from './params'

export const useInfiniteMatchesArchive = (
  {
    params,
    options,
  }: UseInfiniteQueryProps<
    MatchesArchiveResponse,
    GetInfiniteMatchesArchiveParams
  > = {
    params: {},
    options: {},
  }
) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['matches', 'archive', 'infinite', params],
    queryFn: ({ pageParam }) => getInfiniteMatchesArchiveFn(params, pageParam),
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialPageParam: 1,
  })
