import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { UseInfiniteQueryProps, UseQueryProps } from '../../queryHooks/types'
import { TournamentResponse, TournamentsResponse } from './entities'
import { getInfiniteTournamentsFn, getTournamentFn } from './functions'
import { GetInfiniteTournamentsParams, GetTournamentParams } from './params'

export const useTournament = ({
  params,
  options,
}: UseQueryProps<TournamentResponse, GetTournamentParams>) =>
  useQuery<TournamentResponse>({
    queryKey: ['tournaments', params.id],
    queryFn: () => getTournamentFn(params),
    ...options,
  })

export const useInfiniteTournaments = (
  {
    params,
    options,
  }: UseInfiniteQueryProps<
    TournamentsResponse,
    GetInfiniteTournamentsParams
  > = { params: {}, options: {} }
) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['tournaments', 'infinite', params],
    queryFn: ({ pageParam }) => getInfiniteTournamentsFn(params, pageParam),
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialPageParam: 1,
  })
