import {
  useInsertMutation,
  useQuery,
} from '@supabase-cache-helpers/postgrest-react-query'

import { UseMutationProps, UseQueryProps } from '../types'
import {
  MatchResponse,
  MatchesCountResponse,
  MatchesResponse,
} from './entities'
import {
  getMatchFn,
  getMatchesCountFn,
  getMatchesFn,
  setMatchFn,
} from './functions'
import {
  GetMatchParams,
  GetMatchesCountParams,
  GetMatchesParams,
  InsertMatchParams,
} from './params'

export const useMatch = ({
  params,
  options,
}: UseQueryProps<MatchResponse, GetMatchParams>) =>
  useQuery<MatchResponse>(getMatchFn(params), options)

export const useMatches = ({
  params,
  options,
}: UseQueryProps<MatchesResponse, GetMatchesParams>) =>
  useQuery<MatchesResponse>(getMatchesFn(params), options)

export const useMatchesCount = ({
  params,
  options,
}: UseQueryProps<MatchesCountResponse, GetMatchesCountParams>) =>
  useQuery<MatchesCountResponse>(getMatchesCountFn(params), options)

export const useInsertMatch = (
  options?: UseMutationProps<any, InsertMatchParams | InsertMatchParams[], any>
) => useInsertMutation(setMatchFn(), ['id'], undefined, options)
