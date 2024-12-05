import { useHandleError } from '@/hooks/useHandleError'
import { useQueryCache } from '@/services/api/queryCacheHooks'
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
  const queryCache = useQueryCache()
  const onError = useHandleError()

  return useMutation({
    ...options,
    mutationFn: createMatchFn,
    onSuccess: (data, variables, context) => {
      queryCache.addItem(['matches', 'infinite'], data)
      options?.onSuccess?.(data, variables, context)
    },
    onError,
  })
}

export const useUpdateMatch = ({
  options,
}: UseMutationProps<MatchResponse, UpdateMatchParams>) => {
  const onError = useHandleError()
  const queryCache = useQueryCache()

  return useMutation({
    ...options,
    mutationFn: updateMatchFn,
    onSuccess: (data, variables, context) => {
      queryCache.updateItem(['matches', 'infinite'], data)
      queryCache.updateItem(['matches', variables.id], data)
      options?.onSuccess?.(data, variables, context)
    },
    onError,
  })
}

export const useDeleteMatch = (
  options?: UseMutationProps<MatchResponse, DeleteMatchParams>
) => useMutation({ mutationFn: deleteMatchFn, ...options })
