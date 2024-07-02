import {
  useQuery,
  useUpdateMutation,
} from '@supabase-cache-helpers/postgrest-react-query'

import { UseMutationProps, UseQueryProps } from '../../queryHooks/types'
import { MatchFilterResponse, matchFilterQueryCols } from './entities'
import { getMatchFilterFn, setMatchFilterFn } from './functions'
import { GetMatchFilterParams, UpdateMatchFilterParams } from './params'

export const useMatchFilter = ({
  params,
  options,
}: UseQueryProps<MatchFilterResponse, GetMatchFilterParams>) =>
  useQuery<MatchFilterResponse>(getMatchFilterFn(params), options)

export const useUpdateMatchFilter = (
  options?: UseMutationProps<any, UpdateMatchFilterParams, any>
) =>
  useUpdateMutation(
    setMatchFilterFn(),
    ['user_id'],
    matchFilterQueryCols,
    options
  )
