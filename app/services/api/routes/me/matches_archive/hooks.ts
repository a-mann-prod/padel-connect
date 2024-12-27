import { UseInfiniteQueryProps, UseQueryProps } from '@/services/api/queryHooks'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { MatchArchiveResponse, MatchesArchiveResponse } from './entities'
import { getInfiniteMatchesArchiveFn, getMatchArchive } from './functions'
import {
  GetInfiniteMatchesArchiveParams,
  GetMatchArchiveParams,
} from './params'

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

export const useMatchArchive = ({
  params,
  options,
}: UseQueryProps<MatchArchiveResponse, GetMatchArchiveParams>) =>
  useQuery<MatchArchiveResponse>({
    ...options,
    queryKey: ['matches', 'archive', params.id],
    queryFn: () => getMatchArchive(params),
  })
