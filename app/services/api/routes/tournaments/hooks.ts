import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

import { UseQueryProps } from '../../queryHooks/types'
import { TournamentResponse, TournamentsResponse } from './entities'
import { getTournamentFn, getTournamentsFn } from './functions'
import { GetTournamentParams, GetTournamentsParams } from './params'

export const useTournament = ({
  params,
  options,
}: UseQueryProps<TournamentResponse, GetTournamentParams>) =>
  useQuery<TournamentResponse>(getTournamentFn(params), options)

export const useTournaments = ({
  params,
  options,
}: UseQueryProps<TournamentsResponse, GetTournamentsParams>) =>
  useQuery<TournamentsResponse>(getTournamentsFn(params), options)
