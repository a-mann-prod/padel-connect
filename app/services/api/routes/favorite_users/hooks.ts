import {
  useDeleteMutation,
  useInsertMutation,
  useQuery,
} from '@supabase-cache-helpers/postgrest-react-query'

import { useInfiniteQuery } from '../../queryHooks'
import {
  UseInfiniteQueryProps,
  UseMutationProps,
  UseQueryProps,
} from '../../queryHooks/types'
import {
  FavoriteUsersInfiniteResponse,
  FavoriteUsersResponse,
  favoriteUsersQueryCols,
} from './entities'
import {
  getFavoriteUserFn,
  getFavoriteUsersInfiniteFn,
  setFavoriteUserFn,
} from './functions'
import {
  GetFavoriteUserParams,
  GetFavoriteUsersParams,
  InsertFavoriteUserParams,
} from './params'

export const useFavoriteUser = ({
  params,
  options,
}: UseQueryProps<FavoriteUsersResponse, GetFavoriteUserParams>) => {
  const { data, ...rest } = useQuery<FavoriteUsersResponse>(
    getFavoriteUserFn(params),
    options
  )

  return {
    data: data?.[0],
    ...rest,
  }
}

export const useInfiniteFavoriteUsers = ({
  params,
  options,
}: UseInfiniteQueryProps<
  FavoriteUsersInfiniteResponse,
  GetFavoriteUsersParams
>) =>
  useInfiniteQuery<FavoriteUsersInfiniteResponse>(
    getFavoriteUsersInfiniteFn(params),
    options
  )

export const useInsertFavoriteUser = (
  options?: UseMutationProps<any, InsertFavoriteUserParams, any>
) =>
  useInsertMutation(
    setFavoriteUserFn(),
    ['user_id', 'favorite_user_id'],
    favoriteUsersQueryCols,
    options
  )

export const useDeleteFavoriteUser = (
  options?: UseMutationProps<any, any, any>
) =>
  useDeleteMutation(
    setFavoriteUserFn(),
    ['user_id', 'favorite_user_id'],
    favoriteUsersQueryCols,
    options
  )
