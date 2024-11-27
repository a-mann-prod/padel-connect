import {
  UseInfiniteQueryProps,
  UseMutationProps,
} from '@/services/api/queryHooks'
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { ProfileResponse, ProfilesResponse } from '../../profiles'
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
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: addFavoriteUser,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(
        ['profiles', 'infinite'],
        (oldData: InfiniteData<ProfilesResponse, number>) => {
          if (!oldData) return
          const updatedPages = oldData.pages.map((page) => {
            const updatedResults = page.results.map((profile) => {
              if (profile.id === variables.id) {
                return {
                  ...profile,
                  is_favorite: true,
                }
              }
              return profile
            })
            return {
              ...page,
              results: updatedResults,
            }
          })

          return {
            ...oldData,
            pages: updatedPages,
          }
        }
      )
      queryClient.setQueryData(
        ['favorite_users'],
        (oldData: InfiniteData<FavoriteUsersResponse, number>) => {
          if (!oldData) return

          const newData = {
            ...oldData,
            pages: oldData.pages.map((page, index) => {
              if (index === oldData.pages.length - 1) {
                return {
                  ...page,
                  results: [...page.results, data],
                }
              }
              return page
            }),
          }

          return newData
        }
      )
      queryClient.setQueryData(
        ['profiles', variables.id],
        (oldData: ProfileResponse) => ({
          ...oldData,
          is_favorite: true,
        })
      )
      options?.onSuccess?.(data, variables, context)
    },
  })
}

export const useRemoveFavoriteUser = (
  { options }: UseMutationProps<void, AddOrRemoveFavoriteUserParams> = {
    options: {},
  }
) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: removeFavoriteUser,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(
        ['profiles', 'infinite'],
        (oldData: InfiniteData<ProfilesResponse, number>) => {
          if (!oldData) return
          const updatedPages = oldData.pages.map((page) => {
            const updatedResults = page.results.map((profile) => {
              if (profile.id === variables.id) {
                return {
                  ...profile,
                  is_favorite: false,
                }
              }
              return profile
            })
            return {
              ...page,
              results: updatedResults,
            }
          })

          return {
            ...oldData,
            pages: updatedPages,
          }
        }
      )
      queryClient.setQueryData(
        ['favorite_users'],
        (oldData: InfiniteData<FavoriteUsersResponse, number>) => {
          if (!oldData) return
          const updatedPages = oldData.pages.map((page) => {
            const updatedResults = page.results.filter(
              (profile) => profile.id !== variables.id
            )
            return {
              ...page,
              results: updatedResults,
            }
          })
          return {
            ...oldData,
            pages: updatedPages,
          }
        }
      )
      queryClient.setQueryData(
        ['profiles', variables.id],
        (oldData: ProfileResponse) =>
          oldData
            ? {
                ...oldData,
                is_favorite: false,
              }
            : oldData
      )
      options?.onSuccess?.(data, variables, context)
    },
  })
}
