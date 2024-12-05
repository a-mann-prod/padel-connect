import { useQueryCache } from '@/services/api/queryCacheHooks'
import {
  UseInfiniteQueryProps,
  UseMutationProps,
} from '@/services/api/queryHooks'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { ProfileResponse } from '../../profiles'
import { FavoriteUsersResponse } from './entities'
import {
  addFavoriteUser,
  getInfiniteFavoriteUsersFn,
  removeFavoriteUser,
} from './functions'
import {
  AddOrRemoveFavoriteUserParams,
  GetInfiniteFavoriteUsersParams,
} from './params'

export const useInfiniteFavoriteUsers = (
  {
    params,
    options,
  }: UseInfiniteQueryProps<
    FavoriteUsersResponse,
    GetInfiniteFavoriteUsersParams
  > = { params: {}, options: {} }
) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['favorite_users', params],
    queryFn: ({ pageParam }) => getInfiniteFavoriteUsersFn(params, pageParam),
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialPageParam: 1,
  })

export const useAddFavoriteUser = (
  {
    options,
  }: UseMutationProps<ProfileResponse, AddOrRemoveFavoriteUserParams> = {
    options: {},
  }
) => {
  const queryCache = useQueryCache()

  return useMutation({
    ...options,
    mutationFn: addFavoriteUser,
    onSuccess: (data, variables, context) => {
      queryCache.updateItem(['profiles', 'infinite'], { is_favorite: true })
      queryCache.updateItem(['profiles', variables.id], { is_favorite: true })
      queryCache.addItem(['favorite_users'], data)

      options?.onSuccess?.(data, variables, context)
    },
  })
}

export const useRemoveFavoriteUser = (
  { options }: UseMutationProps<void, AddOrRemoveFavoriteUserParams> = {
    options: {},
  }
) => {
  const queryCache = useQueryCache()

  return useMutation({
    ...options,
    mutationFn: removeFavoriteUser,
    onSuccess: (data, variables, context) => {
      queryCache.updateItem(['profiles', 'infinite'], { is_favorite: false })
      queryCache.updateItem(['profiles', variables.id], { is_favorite: false })
      queryCache.removeItem(['favorite_users'], variables.id)

      options?.onSuccess?.(data, variables, context)
    },
  })
}
