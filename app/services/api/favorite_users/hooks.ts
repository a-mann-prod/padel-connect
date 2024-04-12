import {
  useDeleteMutation,
  useInsertMutation,
  useQuery,
} from '@supabase-cache-helpers/postgrest-react-query'

import { UseMutationProps, UseQueryProps } from '../types'
import { FavoriteUsersResponse, favoriteUsersqueryCols } from './entities'
import {
  getFavoriteUserFn,
  getFavoriteUsersFn,
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

export const useFavoriteUsers = ({
  params,
  options,
}: UseQueryProps<FavoriteUsersResponse, GetFavoriteUsersParams>) =>
  useQuery<FavoriteUsersResponse>(getFavoriteUsersFn(params), options)

export const useInsertFavoriteUser = (
  options?: UseMutationProps<any, InsertFavoriteUserParams, any>
) =>
  useInsertMutation(
    setFavoriteUserFn(),
    ['user_id', 'favorite_user_id'],
    favoriteUsersqueryCols,
    options
  )

export const useDeleteFavoriteUser = (
  options?: UseMutationProps<any, any, any>
) =>
  useDeleteMutation(
    setFavoriteUserFn(),
    ['user_id', 'favorite_user_id'],
    favoriteUsersqueryCols,
    options
  )
