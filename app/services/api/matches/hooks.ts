import {
  useDeleteMutation,
  useInsertMutation,
  useQuery,
  useUpdateMutation,
} from '@supabase-cache-helpers/postgrest-react-query'

import { UseMutationProps, UseQueryProps } from '../types'
import {
  MatchResponse,
  MatchesCountResponse,
  MatchesResponse,
  getMatchQueryCols,
} from './entities'
import {
  getMatchFn,
  getMatchesCountFn,
  getMatchesFn,
  setMatchFn,
} from './functions'
import {
  DeleteMatchParams,
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
  options?: UseMutationProps<any, InsertMatchParams | InsertMatchParams[], any>
) => useInsertMutation(setMatchFn(), ['id'], 'id', options)

// cant use directly supabase cache hooks because of "agggregate functions not allowed"
// export const useInsertMatch = (
//   options?: UseMutationProps<
//     DefaultMatchResponse,
//     InsertMatchParams | InsertMatchParams[],
//     any
//   >
// ) => {
//   const { onSuccess, ...rest } = options || {}
//   const upsert = useUpsertItem({
//     primaryKeys: ['id'],
//     schema: 'public',
//     table: 'matches',
//   })

//   const onSuccessDefault = (data: any, variables: any, ctx: any) => {
//     const item = data?.data?.[0]
//     if (item) {
//       upsert(item)
//     }
//     onSuccess?.(data, variables, ctx)
//   }

//   const mutationFn = async (v: InsertMatchParams) =>
//     await setMatchFn().insert(v).select('*')

//   return useMutation({ mutationFn, onSuccess: onSuccessDefault, ...rest })
// }

export const useUpdateMatch = (
  options?: UseMutationProps<any, UpdateMatchParams, any>
) =>
  useUpdateMutation(setMatchFn(), ['id'], getMatchQueryCols, {
    ...options,
    // revalidateTables: [{ table: 'matches', schema: 'public' }],
  })

export const useDeleteMatch = (
  options?: UseMutationProps<any, DeleteMatchParams, any>
) => useDeleteMutation(setMatchFn(), ['id'], undefined, options)
