import { UseMutationProps, UseQueryProps } from '@/services/api/queryHooks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MatchFiltersResponse } from './entities'
import { getMatchFiltersFn, updateMatchFilters } from './functions'
import { UpdateMatchFiltersParams } from './params'

export const useMatchFilters = ({
  options,
}: UseQueryProps<MatchFiltersResponse> = {}) =>
  useQuery<MatchFiltersResponse>({
    queryKey: ['match_filter'],
    queryFn: getMatchFiltersFn,
    ...options,
  })

export const useUpdateMatchFilters = ({
  options,
}: UseMutationProps<MatchFiltersResponse, UpdateMatchFiltersParams> = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: updateMatchFilters,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(['match_filter'], data)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
