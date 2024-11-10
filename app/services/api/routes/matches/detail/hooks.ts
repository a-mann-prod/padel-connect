import { useHandleError } from '@/hooks/useHandleError'
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  UseInfiniteQueryProps,
  UseMutationProps,
  UseQueryProps,
} from '../../../queryHooks'
import { MatchesResponse, MatchResponse } from './entities'
import {
  createMatchFn,
  deleteMatchFn,
  getInfiniteMatchesFn,
  getMatchFn,
  updateMatchFn,
} from './functions'
import {
  CreateMatchParams,
  DeleteMatchParams,
  GetInfiniteMatchesParams,
  GetMatchParams,
  UpdateMatchParams,
} from './params'

export const useMatch = ({
  params,
  options,
}: UseQueryProps<MatchResponse, GetMatchParams>) =>
  useQuery<MatchResponse>({
    queryKey: ['matches', params.id],
    queryFn: () => getMatchFn(params),
    ...options,
  })

export const useInfiniteMatches = (
  {
    params,
    options,
  }: UseInfiniteQueryProps<MatchesResponse, GetInfiniteMatchesParams> = {
    params: {},
    options: {},
  }
) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['matches', 'infinite', params],
    queryFn: ({ pageParam }) => getInfiniteMatchesFn(params, pageParam),
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialPageParam: 1,
  })

export const useCreateMatch = ({
  options,
}: UseMutationProps<MatchResponse, CreateMatchParams> = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: createMatchFn,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)

      queryClient.setQueryData(
        ['matches', 'infinite'],
        (oldData: InfiniteData<MatchesResponse, number>) => {
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
    },
  })
}

export const useUpdateMatch = ({
  options,
}: UseMutationProps<MatchResponse, UpdateMatchParams>) => {
  const onError = useHandleError()
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: updateMatchFn,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(
        ['matches', 'infinite'],
        (oldData: InfiniteData<MatchesResponse, number>) => {
          if (!oldData) return
          const updatedPages = oldData.pages.map((page) => {
            const updatedResults = page.results.map((match) => {
              if (match.id === variables.id) {
                return {
                  ...match,
                  ...data,
                }
              }
              return match
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
        ['matches', variables.id],
        (oldData: MatchResponse) =>
          oldData
            ? {
                ...oldData,
                ...data,
              }
            : oldData
      )
      options?.onSuccess?.(data, variables, context)
    },
    onError,
  })
}

export const useDeleteMatch = (
  options?: UseMutationProps<MatchResponse, DeleteMatchParams>
) => useMutation({ mutationFn: deleteMatchFn, ...options })
