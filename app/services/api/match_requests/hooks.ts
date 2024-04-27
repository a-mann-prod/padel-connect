import {
  useInsertMutation,
  useQuery,
  useUpdateMutation,
} from '@supabase-cache-helpers/postgrest-react-query'

import { UseMutationProps, UseQueryProps } from '../types'
import { MatchRequestResponse, MatchRequestsResponse } from './entities'
import {
  getMatchRequestFn,
  getMatchRequestsFn,
  setMatchRequestFn,
} from './functions'
import {
  GetMatchRequestParams,
  GetMatchRequestsParams,
  InsertMatchRequestParams,
  UpdateMatchRequestParams,
} from './params'

export const useMatchRequest = ({
  params,
  options,
}: UseQueryProps<MatchRequestResponse[], GetMatchRequestParams>) => {
  const { data, ...rest } = useQuery<MatchRequestResponse[]>(
    getMatchRequestFn(params),
    options
  )

  return {
    data: data?.[0],
    ...rest,
  }
}

export const useMatchRequests = ({
  params,
  options,
}: UseQueryProps<MatchRequestsResponse, GetMatchRequestsParams>) =>
  useQuery<MatchRequestsResponse>(getMatchRequestsFn(params), options)

export const useInsertMatchRequests = (
  options?: UseMutationProps<
    any,
    InsertMatchRequestParams | InsertMatchRequestParams[],
    any
  >
) =>
  useInsertMutation(
    setMatchRequestFn(),
    ['match_id', 'user_id'],
    undefined,
    options
  )

export const useUpdateMatchRequest = (
  options?: UseMutationProps<any, UpdateMatchRequestParams, any>
) =>
  useUpdateMutation(
    setMatchRequestFn(),
    ['match_id', 'user_id'],
    undefined,
    options
  )
