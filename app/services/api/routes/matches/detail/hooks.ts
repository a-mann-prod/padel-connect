import { useHandleError } from '@/hooks/useHandleError'
import { useQueryCache } from '@/services/api/queryCacheHooks'
import { useFindMatchQueryKey } from '@/services/api/utills'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import {
  UseInfiniteQueryProps,
  UseMutationProps,
  UseQueryProps,
} from '../../../queryHooks'
import { MatchesResponse, MatchResponse } from './entities'
import {
  createMatchFn,
  deleteMatchFn,
  getInfiniteIncomingMatchesFn,
  getInfiniteMatchesFn,
  getMatchFn,
  updateMatchFn,
} from './functions'
import {
  CreateMatchParams,
  DeleteMatchParams,
  GetIncomingMatchesParams,
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

export const useInfiniteIncomingMatches = (
  {
    params,
    options,
  }: UseInfiniteQueryProps<MatchesResponse, GetIncomingMatchesParams> = {
    params: {},
    options: {},
  }
) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['matches', 'incoming', 'infinite', params],
    queryFn: ({ pageParam }) => getInfiniteIncomingMatchesFn(params, pageParam),
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialPageParam: 1,
  })

export const useCreateMatch = ({
  options,
}: UseMutationProps<MatchResponse, CreateMatchParams> = {}) => {
  const findMatchQK = useFindMatchQueryKey()
  const queryCache = useQueryCache()
  const onError = useHandleError()

  return useMutation({
    ...options,
    mutationFn: createMatchFn,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)

      if (data.is_private) return

      const querykey = findMatchQK(data.datetime)

      if (querykey) {
        queryCache.addItem(
          querykey,
          data,
          (a, b) =>
            new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
        )
      }
    },
    onError,
  })
}

export const useUpdateMatch = ({
  options,
}: UseMutationProps<MatchResponse, UpdateMatchParams>) => {
  const findMatchQK = useFindMatchQueryKey()
  const onError = useHandleError()
  const queryCache = useQueryCache()

  return useMutation({
    ...options,
    mutationFn: updateMatchFn,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
      queryCache.updateItem(['matches', variables.id], data)

      if (data.is_private) return

      const querykey = findMatchQK(data.datetime)

      if (querykey) {
        queryCache.updateItem(querykey, data)
      }
    },
    onError,
  })
}

export const useDeleteMatch = ({
  options,
}: UseMutationProps<MatchResponse, DeleteMatchParams>) => {
  const findMatchQK = useFindMatchQueryKey()
  const queryCache = useQueryCache()

  return useMutation({
    ...options,
    mutationFn: deleteMatchFn,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)

      const querykey = findMatchQK(data.datetime)

      if (querykey) {
        queryCache.removeItem(querykey, variables.id)
      }
    },
  })
}
