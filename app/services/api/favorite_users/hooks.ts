import {
  useDeleteMutation,
  useInsertMutation,
  useQuery,
} from '@supabase-cache-helpers/postgrest-react-query'

import { UseMutationProps, UseQueryProps } from '../types'
import {
  FavoriteUserResponse,
  FavoriteUsersResponse,
  favoriteUsersqueryCols,
} from './entities'
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
}: UseQueryProps<FavoriteUserResponse, GetFavoriteUserParams>) =>
  useQuery<FavoriteUserResponse>(getFavoriteUserFn(params), options)

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
    ['id'],
    favoriteUsersqueryCols,
    options
  )

export const useDeleteFavoriteUser = (
  options?: UseMutationProps<any, any, any>
) =>
  useDeleteMutation(
    setFavoriteUserFn(),
    ['id'],
    favoriteUsersqueryCols,
    options
  )
