import {
  useQuery,
  useUpdateMutation,
} from '@supabase-cache-helpers/postgrest-react-query'

import { useMutation } from '@tanstack/react-query'
import { UseMutationProps, UseQueryProps } from '../types'
import {
  DefaultMatchResponse,
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
  UpdateMatchParams,
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
  options?: UseMutationProps<
    DefaultMatchResponse,
    InsertMatchParams | InsertMatchParams[],
    any
  >
) => {
  const mutationFn = async (v: InsertMatchParams) =>
    await setMatchFn().insert(v).select('*')

  return useMutation({ mutationFn, ...options })
}

export const useUpdateMatch = (
  options?: UseMutationProps<any, UpdateMatchParams, any>
) => useUpdateMutation(setMatchFn(), ['id'], undefined, options)
