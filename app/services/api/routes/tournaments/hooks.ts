import { useQuery } from '@tanstack/react-query'
import { UseQueryProps } from '../../queryHooks/types'
import { TournamentResponse, TournamentsResponse } from './entities'
import { getTournamentFn, getTournamentsFn } from './functions'
import { GetTournamentParams, GetTournamentsParams } from './params'

export const useTournament = ({
  params,
  options,
}: UseQueryProps<TournamentResponse, GetTournamentParams>) =>
  useQuery<TournamentResponse>({
    queryKey: ['tournaments', params.id],
    queryFn: () => getTournamentFn(params),
    ...options,
  })

export const useTournaments = ({
  params,
  options,
}: UseQueryProps<TournamentsResponse, GetTournamentsParams>) =>
  useQuery<TournamentsResponse>({
    queryKey: ['tournaments', params],
    queryFn: () => getTournamentsFn(params),
    ...options,
  })
